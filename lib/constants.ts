import { Coordinates } from "./types";

export const WEATHER_KEYS = {
	weather: (coordinates: Coordinates) => ["weather", coordinates] as const,
	forecast: (coordinates: Coordinates) => ["forecast", coordinates] as const,
	geocode: (coordinates: Coordinates) => ["geocode", coordinates] as const,
};
