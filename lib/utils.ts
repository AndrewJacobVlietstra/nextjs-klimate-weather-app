import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "@/lib/config";

const {
	openweather: { privateKey },
} = config;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sleep = async (delay = 1000) => {
	await new Promise((resolve) => setTimeout(resolve, delay));
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
