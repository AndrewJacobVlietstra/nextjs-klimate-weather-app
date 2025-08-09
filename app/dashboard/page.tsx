"use client";

import CustomAlert from "@/components/CustomAlert";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import RefreshButton from "@/components/RefreshButton";
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

	// Derived values
	const isFetching =
		weatherQuery.isFetching ||
		forecastQuery.isFetching ||
		locationQuery.isFetching;

	const [location] = locationQuery.data;
	const locationName = `${location?.name}, ${location?.state}`;

	return (
		<div className="space-y-4">
			{/* Favourite Cities */}
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">{locationName}</h1>
				<RefreshButton
					buttonClassName={"p-5"}
					clickHandler={handleRefresh}
					isLoading={isFetching}
					iconClassName={`size-5 ${isFetching ? "animate-spin" : null}`}
				/>
			</div>

			<div className="text-4xl font-bold italic">
				{Math.floor(weatherQuery.data.main.temp)} C <sup>o</sup>
			</div>
		</div>
	);
}
