"use client";

import CurrentWeather from "@/components/dashboard/CurrentWeather";
import CustomAlert from "@/components/CustomAlert";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import HourlyTemperature from "@/components/dashboard/HourlyTemperature";
import RefreshButton from "@/components/RefreshButton";
import WeatherDetails from "@/components/dashboard/WeatherDetails";
import WeatherForecast from "@/components/dashboard/WeatherForecast";
import UnitButton from "@/components/UnitButton";
import { TemperatureUnits } from "@/lib/types";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
	useCurrentWeatherQuery,
	useForecastWeatherQuery,
	useReverseGeocodeQuery,
} from "@/hooks/useWeather";

export default function DashboardPage() {
	const [unit, setUnit] = useLocalStorage<TemperatureUnits>("unit", "C");

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
	if (weatherQuery.error || forecastQuery.error || locationQuery.error)
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
				<div className="flex items-center gap-4">
					<UnitButton className="p-5" setUnit={setUnit} unit={unit} />
					<RefreshButton
						buttonClassName={"p-5"}
						iconClassName={`size-5 ${isFetching ? "animate-spin" : null}`}
						clickHandler={handleRefresh}
						isLoading={isFetching}
					/>
				</div>
			</div>

			{isFetching ? (
				<DashboardSkeleton />
			) : (
				<div className="grid gap-4">
					<div className="flex flex-col lg:flex-row gap-4">
						<CurrentWeather
							data={weatherQuery.data}
							location={location}
							unit={unit}
						/>
						<HourlyTemperature data={forecastQuery.data} unit={unit} />
					</div>

					<div className="flex flex-col lg:flex-row gap-4">
						<WeatherDetails
							data={weatherQuery.data}
							precipitation={forecastQuery.data.list[0].pop}
							population={forecastQuery.data.city.population}
						/>
						<WeatherForecast data={forecastQuery.data} unit={unit} />
					</div>
				</div>
			)}
		</div>
	);
}
