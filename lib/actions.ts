"use server";

import {
	Current_Weather_API_Response,
	Forecast_Weather_API_Response,
	Reverse_Geo_API_Response,
} from "@/lib/types";
import { generateAPIString } from "./utils";
import { config } from "@/lib/config";

const {
	openweather: {
		currentWeatherEndpoint,
		forecastWeatherEndpoint,
		reverseGeocodeEndpoint,
		units,
	},
} = config;

// Get current weather data, defaults coordinates to London
export const getCurrentWeatherData = async (lat = 51.5072, lon = 0.1276) => {
	const response = await fetch(
		generateAPIString(currentWeatherEndpoint, {
			lat,
			lon,
			units,
		})
	);

	if (!response.ok) {
		throw new Error(`Current Weather API Error: ${response.statusText}`);
	}

	const data: Current_Weather_API_Response = await response.json();

	return data;
};

// Get forecast weather data, defaults coordinates to London
export const getForecastWeatherData = async (lat = 51.5072, lon = 0.1276) => {
	const response = await fetch(
		generateAPIString(forecastWeatherEndpoint, {
			lat,
			lon,
			units,
		})
	);

	if (!response.ok) {
		throw new Error(`Forecast Weather API Error: ${response.statusText}`);
	}

	const data: Forecast_Weather_API_Response = await response.json();

	return data;
};

// Get city based on coordinates, defaults coordinates to London
export const getCityReverseGeocode = async (lat = 51.5072, lon = 0.1276) => {
	const response = await fetch(
		generateAPIString(reverseGeocodeEndpoint, { lat, lon, limit: 1 })
	);

	if (!response.ok) {
		throw new Error(`Reverse Geocode API Error: ${response.statusText}`);
	}

	const data: Reverse_Geo_API_Response = await response.json();

	return data;
};
