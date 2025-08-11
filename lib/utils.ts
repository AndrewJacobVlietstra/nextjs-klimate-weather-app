import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { config } from "@/lib/config";
import { TemperatureUnits } from "./types";

const {
	openweather: { privateKey },
} = config;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sleep = async (delay = 1000) => {
	await new Promise((resolve) => setTimeout(resolve, delay));
};

export const formatDate = (timestamp: number, formatStr: string) =>
	format(new Date(timestamp * 1000), formatStr);

export const formatTemp = (temp: number | string) => `${Math.round(+temp)} °`;

// Temperature values from API are celsius by default with current config settings
export const convertUnit = (temp: number | string, unit: TemperatureUnits) => {
	if (unit === "C") return +temp;
	if (unit === "F") return +temp * (9 / 5) + 32;

	return +temp;
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
