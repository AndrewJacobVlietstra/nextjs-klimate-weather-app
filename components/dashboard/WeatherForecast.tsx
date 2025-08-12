import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Forecast_Weather_API_Response, TemperatureUnits } from "@/lib/types";
import {
	capitalizeString,
	convertUnit,
	formatDate,
	formatTemp,
} from "@/lib/utils";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import Image from "next/image";

type WeatherForecastProps = {
	data: Forecast_Weather_API_Response;
	unit: TemperatureUnits;
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

export default function WeatherForecast({ data, unit }: WeatherForecastProps) {
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
						<div
							key={forecast.date}
							className="grid grid-cols-[1.62fr_1.3fr_1.1fr] gap-4 items-center rounded-lg border p-4 bg-background/50 hover:bg-background/100 transition-colors"
						>
							<div className="flex items-center justify-around">
								<div className="flex-1">
									<p className="font-normal">
										{formatDate(forecast.date, "EEE, MMM d")}
									</p>
									<p className="text-sm text-muted-foreground capitalize">
										{forecast.weather.description}
									</p>
								</div>
								<div className="flex-1 aspect-square max-w-[60px] max-[480px]:hidden">
									<Image
										alt={`${forecast.weather.description} image`}
										className="h-full w-full object-contain"
										src={`https://openweathermap.org/img/wn/${forecast.weather.icon}@4x.png`}
										width={60}
										height={60}
										title={`${capitalizeString(forecast.weather.description)}`}
									/>
								</div>
							</div>

							<div className="flex max-[30rem]:flex-col-reverse gap-3 justify-center text-sm">
								<span
									className="flex flex-row items-center text-blue-500"
									title="Min Temp."
								>
									<ArrowDown className="size-3.5" />
									{formatTemp(convertUnit(forecast.temp_min, unit))}
								</span>
								<span
									className="flex flex-row items-center text-orange-500"
									title="Max Temp."
								>
									<ArrowUp className="size-3.5" />
									{formatTemp(convertUnit(forecast.temp_max, unit))}
								</span>
							</div>

							<div className="flex max-[540px]:flex-col gap-4 justify-end">
								<span
									className="flex max-[433px]:flex-col max-[433px]:items-center max-[540px]:flex-row flex-col items-center text-sm text-muted-foreground"
									title={`Humidity: ${forecast.humidity}%`}
								>
									<Droplets className="size-4.5 text-blue-400" />
									<span className="max-[540px]:pl-1">{forecast.humidity}%</span>
								</span>

								<span
									className="flex max-[433px]:flex-col max-[433px]:items-center max-[540px]:flex-row flex-col items-center text-sm text-muted-foreground"
									title={`Wind Speed: ${forecast.wind} m/s`}
								>
									<Wind className="size-4.5 text-blue-400" />
									<span className="max-[433px]:pl-0 max-[540px]:pl-1">
										{forecast.wind} m/s
									</span>
								</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
