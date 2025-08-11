import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Forecast_Weather_API_Response } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type WeatherForecastProps = {
	data: Forecast_Weather_API_Response;
};

type DailyForecast = {
	date: number;
	humidity: number;
	temp_min: number;
	temp_max: number;
	wind: number;
	weather: {
		description: string;
		icon: string;
		id: number;
		main: string;
	};
};

export default function WeatherForecast({ data }: WeatherForecastProps) {
	const dailyForecastsObj = data.list.reduce((acc, item) => {
		const date = formatDate(item.dt, "yyyy-MM-dd");

		if (!acc[date]) {
			acc[date] = {
				date: item.dt,
				humidity: item.main.humidity,
				temp_min: item.main.temp_min,
				temp_max: item.main.temp_max,
				wind: item.wind.speed,
				weather: item.weather[0],
			};
		} else {
			acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
			acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
		}

		return acc;
	}, {} as Record<string, DailyForecast>);

	// Convert object of forecast objects to array of forecast objects
	const dailyForecastsArr = Object.values(dailyForecastsObj).slice(0, 5);

	return (
		<Card className="flex-1/2 bg-background/50 hover:bg-background/65 transition-colors">
			<CardHeader>
				<CardTitle>5-Day Forecast</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{dailyForecastsArr.map((forecast) => (
						<div key={forecast.date}>
							<div>
								<p>{formatDate(forecast.date, "EEE, MMM d")}</p>
							</div>
							<div></div>
							<div></div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
