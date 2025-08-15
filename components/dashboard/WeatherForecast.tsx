import Image from "next/image";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { ClassValue } from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Forecast_Weather_API_Response, TemperatureUnits } from "@/lib/types";
import {
	capitalizeString,
	cn,
	convertUnit,
	formatDate,
	formatForecastData,
	formatIcon,
	formatTemp,
} from "@/lib/utils";

type WeatherForecastProps = {
	className?: ClassValue;
	data: Forecast_Weather_API_Response;
	unit: TemperatureUnits;
};

export default function WeatherForecast({
	className,
	data,
	unit,
}: WeatherForecastProps) {
	const dailyForecasts = formatForecastData(data);

	return (
		<Card
			className={cn(
				"flex-1/2 bg-background/75 hover:bg-background/80 transition-colors",
				className
			)}
		>
			<CardHeader>
				<CardTitle>5-Day Forecast</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4.5">
					{dailyForecasts.map((forecast) => (
						<Card
							key={forecast.date}
							className="grid grid-cols-[1.62fr_1.3fr_1.1fr] gap-4 items-center rounded-lg border p-4 bg-background/85 hover:bg-background/100 transition-colors"
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
										className="h-full w-full object-contain drop-shadow"
										src={`https://openweathermap.org/img/wn/${formatIcon(
											forecast.weather.icon
										)}@4x.png`}
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
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
