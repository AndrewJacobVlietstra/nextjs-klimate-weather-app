"use client";

import CustomAlert from "@/components/CustomAlert";
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import HorizontalOrderButton from "@/components/HorizontalOrderButton";
import HourlyTemperature from "@/components/dashboard/HourlyTemperature";
import RefreshButton from "@/components/RefreshButton";
import WeatherDetails from "@/components/dashboard/WeatherDetails";
import WeatherForecast from "@/components/dashboard/WeatherForecast";
import UnitButton from "@/components/UnitButton";
import VerticalOrderButton from "@/components/VerticalOrderButton";
import { formatForecastData } from "@/lib/utils";
import { DataOrder, TemperatureUnits } from "@/lib/types";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSearchParams } from "next/navigation";
import {
	useCurrentWeatherQuery,
	useForecastWeatherQuery,
	useReverseGeocodeQuery,
} from "@/hooks/useWeather";

export default function HomePage() {
	const [unit, setUnit] = useLocalStorage<TemperatureUnits>("unit", "C");
	const [order, setOrder] = useLocalStorage<DataOrder>("order", {
		horizontal: 1,
		vertical: 1,
	});

	const isHorizontalDefault = order.horizontal === 1;
	const isVerticalDefault = order.vertical === 1;

	const searchParams = useSearchParams();
	const searchParamsObj = Object.fromEntries(searchParams);
	const searchParamsKeys = Object.keys(searchParamsObj);
	const isCoordsInSearchParams =
		searchParamsKeys.includes("lat") && searchParamsKeys.includes("lon");

	const {
		coordinates,
		error: locationError,
		isLoading: locationLoading,
		getCurrentLocation,
	} = useGeolocation(searchParams, isCoordsInSearchParams);

	const weatherQuery = useCurrentWeatherQuery(coordinates);
	const forecastQuery = useForecastWeatherQuery(coordinates);
	const locationQuery = useReverseGeocodeQuery(coordinates);

	const isFetching =
		weatherQuery.isFetching ||
		forecastQuery.isFetching ||
		locationQuery.isFetching;

	const handleRefresh = async () => {
		if (!isCoordsInSearchParams) getCurrentLocation();

		if (coordinates) {
			weatherQuery.refetch();
			forecastQuery.refetch();
			locationQuery.refetch();
		}
	};

	// If getting user current GeoLocation show loading skeleton
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
				clickHandler={getCurrentLocation}
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
				clickHandler={getCurrentLocation}
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

	return (
		<div className="space-y-4">
			{/* Favourite Cities */}
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">
					{isCoordsInSearchParams ? "" : "My Location"}
				</h1>
				<div className="flex max-[420px]:flex-col items-center gap-4">
					<div className="flex gap-4">
						<HorizontalOrderButton
							isDefaultOrder={isHorizontalDefault}
							setOrder={setOrder}
						/>
						<VerticalOrderButton
							isDefaultOrder={isVerticalDefault}
							setOrder={setOrder}
						/>
					</div>
					<div className="flex gap-4">
						<UnitButton className="p-5" setUnit={setUnit} unit={unit} />
						<RefreshButton
							buttonClassName={"p-5"}
							iconClassName={`size-5 ${isFetching ? "animate-spin" : null}`}
							clickHandler={handleRefresh}
							isLoading={isFetching}
						/>
					</div>
				</div>
			</div>

			{/* If no data yet show loading skeleton, 
			this avoids showing undefined/null values */}
			{isFetching ||
			!weatherQuery.data ||
			!forecastQuery.data ||
			!locationQuery.data ? (
				<DashboardSkeleton />
			) : (
				<div className="grid gap-4">
					<div
						className={`${
							isVerticalDefault ? "order-1" : "order-2"
						} flex flex-col lg:flex-row gap-4`}
					>
						<CurrentWeather
							className={`${isHorizontalDefault ? "order-1" : "order-2"}`}
							data={weatherQuery.data}
							location={locationQuery.data[0]}
							unit={unit}
						/>
						<HourlyTemperature
							className={`${isHorizontalDefault ? "order-2" : "order-1"}`}
							data={forecastQuery.data}
							unit={unit}
						/>
					</div>

					<div
						className={`${
							isVerticalDefault ? "order-2" : "order-1"
						} flex flex-col lg:flex-row gap-4`}
					>
						<WeatherForecast
							className={`${isHorizontalDefault ? "order-1" : "order-2"}`}
							data={formatForecastData(forecastQuery.data)}
							unit={unit}
						/>
						<WeatherDetails
							className={`${isHorizontalDefault ? "order-2" : "order-1"}`}
							weatherData={weatherQuery.data}
							forecastData={formatForecastData(forecastQuery.data)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
