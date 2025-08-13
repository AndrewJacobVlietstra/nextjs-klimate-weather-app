import { clsx, type ClassValue } from "clsx";
import { config } from "@/lib/config";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import {
	DailyForecast,
	Forecast_Weather_API_Response,
	TemperatureUnits,
} from "@/lib/types";

const {
	openweather: { privateKey },
} = config;

export const average = (numberArr: number[]) =>
	numberArr.reduce((acc, value) => acc + value) / numberArr.length;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const capitalizeString = (input: string) => {
	const splitValues = input.split(" ");

	const result = splitValues.map(
		(val) => `${val.slice(0, 1).toUpperCase() + val.slice(1)}`
	);

	return result.join(" ");
};

export const countryName = new Intl.DisplayNames(["en"], { type: "region" });

// Temperature values from API are celsius by default with current config settings
export const convertUnit = (temp: number | string, unit: TemperatureUnits) => {
	if (unit === "C") return +temp;
	if (unit === "F") return +temp * (9 / 5) + 32;

	return +temp;
};

export const sleep = async (delay = 1000) => {
	await new Promise((resolve) => setTimeout(resolve, delay));
};

export const formatDate = (timestamp: number, formatStr: string) =>
	format(new Date(timestamp * 1000), formatStr);

export const formatTemp = (temp: number | string) => `${Math.round(+temp)} °`;

export const formatForecastData = (data: Forecast_Weather_API_Response) => {
	const dailyForecastsObj = data.list.reduce((acc, item) => {
		const date = formatDate(item.dt, "yyyy-MM-dd");

		if (!acc[date]) {
			acc[date] = {
				date: item.dt,
				cloudiness: [item.clouds.all],
				humidity: item.main.humidity,
				rain_chance: [item.pop],
				temp_min: item.main.temp_min,
				temp_max: item.main.temp_max,
				wind: item.wind.speed,
				weather: item.weather[0],
			};
		} else {
			acc[date].cloudiness.push(item.clouds.all);
			acc[date].rain_chance.push(item.pop);
			acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
			acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
		}

		return acc;
	}, {} as Record<string, DailyForecast>);

	// Convert object of forecast objects to array of forecast objects
	const dailyForecastsArr = Object.values(dailyForecastsObj).slice(0, 5);

	return dailyForecastsArr;
};

export const isStringUndefined = (str: string) => {
	if (str === "undefined") return undefined;

	return str;
};

// Generates string used to call API based on Endpoint and params provided
export const generateAPIString = (
	endpoint: string,
	params: Record<string, string | number>
) => {
	const searchParams = new URLSearchParams({
		appid: privateKey,
		...params,
	});

	return `${endpoint}${searchParams.toString()}`;
};
