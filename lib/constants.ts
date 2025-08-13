import { Coordinates } from "@/lib/types";

export const WEATHER_KEYS = {
	weather: (coordinates: Coordinates) => ["weather", coordinates] as const,
	forecast: (coordinates: Coordinates) => ["forecast", coordinates] as const,
	reverseGeocode: (coordinates: Coordinates) =>
		["reverseGeocode", coordinates] as const,
	directGeocode: (query: string) => ["directGeocode", query] as const,
};
