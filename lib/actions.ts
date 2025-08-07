"use server";

import { generateAPIString } from "@/lib/utils";
import {
	Current_Weather_API_Response,
	Forecast_Weather_API_Response,
	Reverse_Geo_API_Response,
} from "./types";

// Get current weather data, defaults coordinates to London
export const getCurrentWeatherData = async (lat = 51.5072, lon = 0.1276) => {
	const response = await fetch(generateAPIString("current", lat, lon));
	const data: Current_Weather_API_Response = await response.json();

	return data;
};

// Get forecast weather data, defaults coordinates to London
export const getForecastWeatherData = async (lat = 51.5072, lon = 0.1276) => {
	const response = await fetch(generateAPIString("forecast", lat, lon));
	const data: Forecast_Weather_API_Response = await response.json();

	return data;
};

// Get city based on coordinates, defaults coordinates to London
export const getCityReverseGeocode = async (lat = 51.5072, lon = 0.1276) => {
	const response = await fetch(generateAPIString("reverseGeo", lat, lon));
	const data: Reverse_Geo_API_Response = await response.json();

	return data;
};
