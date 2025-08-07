"use client";

import { getCurrentWeatherData } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export default function WeatherCard() {
	const { data, isLoading } = useQuery({
		queryKey: ["current"],
		queryFn: async () => await getCurrentWeatherData(),
	});

	console.log(data);

	if (isLoading) return <div>Loading...</div>;

	return <div>Weather Card</div>;
}
