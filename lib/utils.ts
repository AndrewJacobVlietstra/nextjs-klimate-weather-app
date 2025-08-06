import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "@/lib/config";
import {
	currentWeatherURLEndpoint,
	fiveDayForecastURLEndpoint,
} from "@/lib/constants";

type WeatherData = "current" | "forecast";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Generates string used to call API based on type of data needed, latitude, longitude
export const generateAPIString = (
	type: WeatherData,
	lat: number,
	lon: number
) =>
	`${
		type === "current" ? currentWeatherURLEndpoint : fiveDayForecastURLEndpoint
	}lat=${lat}&lon=${lon}&appid=${config.openweather.privateKey}`;
