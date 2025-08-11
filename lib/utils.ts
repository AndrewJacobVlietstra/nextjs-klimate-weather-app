import { clsx, type ClassValue } from "clsx";
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

export const formatTemp = (temp: number | string) => `${Math.round(+temp)} °`;

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
