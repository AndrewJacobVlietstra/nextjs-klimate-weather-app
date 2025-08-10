"use client";

import CurrentWeather from "@/components/CurrentWeather";
import CustomAlert from "@/components/CustomAlert";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import HourlyTemperature from "@/components/HourlyTemperature";
import RefreshButton from "@/components/RefreshButton";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
	useCurrentWeatherQuery,
	useForecastWeatherQuery,
	useReverseGeocodeQuery,
} from "@/hooks/useWeather";

export default function DashboardPage() {
	const {
		coordinates,
		error: locationError,
		isLoading: locationLoading,
		getLocation,
	} = useGeolocation();

	const weatherQuery = useCurrentWeatherQuery(coordinates);
	const forecastQuery = useForecastWeatherQuery(coordinates);
	const locationQuery = useReverseGeocodeQuery(coordinates);

	const isFetching =
		weatherQuery.isFetching ||
		forecastQuery.isFetching ||
		locationQuery.isFetching;

	const handleRefresh = async () => {
		getLocation();
		if (coordinates) {
			weatherQuery.refetch();
			forecastQuery.refetch();
			locationQuery.refetch();
		}
	};

	// While fetching user Geolocation data show loading skeleton
	if (locationLoading) return <DashboardSkeleton />;

	// If location error, show location error alert
	if (locationError)
		return (
			<CustomAlert
				alertVariant="destructive"
				alertTitle="Location Error"
				alertDescription={locationError}
				buttonIcon="MapPin"
				buttonText="Enable Location"
				buttonVariant="outline"
				clickHandler={getLocation}
			/>
		);

	// If coordinates error, show location required alert
	if (!coordinates)
		return (
			<CustomAlert
				alertVariant="destructive"
				alertTitle="Location Required"
				alertDescription="Please enable location access to see your local weather."
				buttonIcon="MapPin"
				buttonText="Enable Location"
				buttonVariant="outline"
				clickHandler={getLocation}
			/>
		);

	// If query error, show fetch failed alert
	if (weatherQuery.error || forecastQuery.error)
		return (
			<CustomAlert
				alertVariant="destructive"
				alertTitle="Fetch Error"
				alertDescription="Failed to fetch weather data. Please try again."
				buttonIcon="RefreshCw"
				buttonText="Retry"
				buttonVariant="outline"
				clickHandler={handleRefresh}
			/>
		);

	// If no data yet show loading skeleton, this avoids showing undefined/null values
	if (!weatherQuery.data || !forecastQuery.data || !locationQuery.data)
		return <DashboardSkeleton />;

	const [location] = locationQuery.data;

	return (
		<div className="space-y-4">
			{/* Favourite Cities */}
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">My Location</h1>
				<RefreshButton
					buttonClassName={"p-5"}
					iconClassName={`size-5 ${isFetching ? "animate-spin" : null}`}
					clickHandler={handleRefresh}
					isLoading={isFetching}
				/>
			</div>

			{isFetching ? (
				<DashboardSkeleton />
			) : (
				<div className="grid gap-4">
					<div className="flex flex-col lg:flex-row gap-4">
						<CurrentWeather data={weatherQuery.data} location={location} />
						<HourlyTemperature data={forecastQuery.data} />
					</div>

					<div className="">
						<WeatherDetails data={weatherQuery.data} />
						<WeatherForecast data={forecastQuery.data} />
					</div>
				</div>
			)}
		</div>
	);
}
