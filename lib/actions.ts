"use server";

import { config } from "@/lib/config";
import {
	Coordinates,
	Current_Weather_API_Response,
	Direct_Geo_API_Response,
	Forecast_Weather_API_Response,
	Reverse_Geo_API_Response,
} from "@/lib/types";
import { generateAPIString } from "@/lib/utils";

const {
	openweather: {
		currentWeatherEndpoint,
		forecastWeatherEndpoint,
		directGeocodeEndpoint,
		reverseGeocodeEndpoint,
		units,
	},
} = config;

// Get current weather data
export const getCurrentWeatherData = async (coordinates: Coordinates) => {
	const { lat, lon } = coordinates;

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

// Get forecast weather data
export const getForecastWeatherData = async (coordinates: Coordinates) => {
	const { lat, lon } = coordinates;

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

// Get a location's coordinates based on query, ex. "cityName, state, countryCode"
export const getCoordsDirectGeocode = async (query: string) => {
	const response = await fetch(
		generateAPIString(directGeocodeEndpoint, {
			q: query,
			limit: 5,
		})
	);

	if (!response.ok) {
		throw new Error(`Direct Geocode API Error: ${response.statusText}`);
	}

	const data: Direct_Geo_API_Response = await response.json();

	return data;
};

// Get city based on coordinates
export const getCityReverseGeocode = async (coordinates: Coordinates) => {
	const { lat, lon } = coordinates;

	const response = await fetch(
		generateAPIString(reverseGeocodeEndpoint, { lat, lon, limit: 1 })
	);

	if (!response.ok) {
		throw new Error(`Reverse Geocode API Error: ${response.statusText}`);
	}

	const data: Reverse_Geo_API_Response = await response.json();

	return data;
};
