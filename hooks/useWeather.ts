import {
	getCityReverseGeocode,
	getCoordsDirectGeocode,
	getCurrentWeatherData,
	getForecastWeatherData,
} from "@/lib/actions";
import { Coordinates } from "@/lib/types";
import { WEATHER_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export const useCurrentWeatherQuery = (coordinates?: Coordinates | null) => {
	return useQuery({
		queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: async () =>
			coordinates ? await getCurrentWeatherData(coordinates) : null,
		enabled: !!coordinates,
	});
};

export const useForecastWeatherQuery = (coordinates?: Coordinates | null) => {
	return useQuery({
		queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: async () =>
			coordinates ? await getForecastWeatherData(coordinates) : null,
		enabled: !!coordinates,
	});
};

export const useDirectGeocodeQuery = (query?: string | null) => {
	return useQuery({
		queryKey: WEATHER_KEYS.directGeocode(query || "N/A"),
		queryFn: async () => (query ? await getCoordsDirectGeocode(query) : null),
		enabled: query ? query.length >= 1 : false,
	});
};

export const useReverseGeocodeQuery = (coordinates?: Coordinates | null) => {
	return useQuery({
		queryKey: WEATHER_KEYS.reverseGeocode(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: async () =>
			coordinates ? await getCityReverseGeocode(coordinates) : null,
		enabled: !!coordinates,
	});
};
