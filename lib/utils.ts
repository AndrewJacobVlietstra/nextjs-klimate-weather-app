import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "@/lib/config";
import { WeatherData } from "./types";
import {
	currentWeatherURLEndpoint,
	fiveDayForecastURLEndpoint,
	reverseGeocodeURLEndpoint,
} from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sleep = async (delay = 1000) => {
	await new Promise((resolve) => setTimeout(resolve, delay));
};

// Generates string used to call API based on type of data needed, latitude, longitude
export const generateAPIString = (
	type: WeatherData,
	lat: number,
	lon: number
) =>
	`${
		type === "current"
			? currentWeatherURLEndpoint
			: type === "forecast"
			? fiveDayForecastURLEndpoint
			: reverseGeocodeURLEndpoint
	}lat=${lat}&lon=${lon}&appid=${config.openweather.privateKey}`;
