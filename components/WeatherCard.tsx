"use client";

import { getCurrentWeatherData } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export default function WeatherCard() {
	const { data, isLoading } = useQuery({
		queryKey: ["current"],
		queryFn: async () => await getCurrentWeatherData(),
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<p>{data?.name}</p>
			<p>{data?.sys.country}</p>
			<p>{data?.main.feels_like}</p>
		</div>
	);
}
