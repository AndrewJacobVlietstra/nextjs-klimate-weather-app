import {
	Current_Weather_API_Response,
	Forecast_Weather_API_Response,
} from "@/lib/types";
import {
	Clock,
	Cloud,
	CloudRainWind,
	Compass,
	Eye,
	Gauge,
	Globe,
	MapPinned,
	Sunrise,
	Sunset,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { countryName, formatDate } from "@/lib/utils";

type WeatherDetailsProps = {
	weatherData: Current_Weather_API_Response;
	forecastData: Forecast_Weather_API_Response;
};

export default function WeatherDetails({
	weatherData,
	forecastData,
}: WeatherDetailsProps) {
	const {
		main: { pressure },
		coord: { lat, lon },
		dt,
		sys,
		wind,
		visibility,
	} = weatherData;

	const {
		list: [
			{
				clouds: { all: cloudiness },
				pop: precipitation,
			},
		],
	} = forecastData;

	const getWindDirection = (deg: number, abbreviated?: boolean) => {
		const directionsAbbr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
		const directionsExtended = [
			"North",
			"North East",
			"East",
			"South East",
			"South",
			"South West",
			"West",
			"North West",
		];

		const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;

		if (abbreviated) return directionsAbbr[index];

		return directionsExtended[index];
	};

	const details = [
		{
			color: "text-orange-400",
			title: "Sunrise",
			icon: Sunrise,
			value: formatDate(sys.sunrise, "h:mm a"),
		},
		{
			color: "text-indigo-400",
			title: "Sunset",
			icon: Sunset,
			value: formatDate(sys.sunset, "h:mm a"),
		},
		{
			color: "text-green-500",
			title: "Wind Direction",
			icon: Compass,
			value: (
				<span
					title={`${getWindDirection(wind.deg, false)} (${wind.deg}°)`}
				>{`${getWindDirection(wind.deg, true)} (${wind.deg}°)`}</span>
			),
		},
		{
			color: "text-purple-500",
			title: "Pressure",
			icon: Gauge,
			value: `${pressure} hPa`,
		},
		{
			color: "text-primary",
			title: "Cloudiness",
			icon: Cloud,
			value: `${cloudiness}%`,
		},
		{
			color: "text-primary/90",
			title: "Visibility",
			icon: Eye,
			value: `${visibility / 1000}km`,
		},
		{
			color: "text-sky-400",
			title: "Rain Chance",
			icon: CloudRainWind,
			value: `${precipitation * 100}%`,
		},
		{
			color: "text-teal-400",
			title: "Time",
			icon: Clock,
			value: formatDate(dt, "h:mm a"),
		},
		{
			color: "text-yellow-500",
			title: "Coordinates",
			icon: MapPinned,
			value: (
				<>
					<span
						className="block pt-[0.1rem]"
						title={`Latitude: ${Math.abs(lat)} ${lat > 0 ? "N" : "S"}°`}
					>
						Lat: {`${Math.abs(lat)} ${lat > 0 ? "N" : "S"}°`}
					</span>
					<span
						className="block"
						title={`Longitude: ${Math.abs(lon)} ${lon > 0 ? "E" : "W"}°`}
					>
						Lon: {`${Math.abs(lon)} ${lon > 0 ? "E" : "W"}°`}
					</span>
				</>
			),
		},
		{
			color: "text-sky-300",
			title: "Country",
			icon: Globe,
			value: countryName.of(sys.country),
		},
	];

	return (
		<Card className="flex-1/2 bg-background/50 hover:bg-background/65 transition-colors">
			<CardHeader>
				<CardTitle>Current Weather Details</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="grid max-[525px]:grid-cols-1 grid-cols-2 gap-4">
					{details.map(({ color, icon: DetailIcon, title, value }) => (
						<Card
							className="flex flex-row justify-center py-7 pr-4 bg-background/50 hover:bg-background/100 transition-colors"
							key={title}
						>
							<CardContent className="flex items-center gap-3 ">
								<DetailIcon className={`size-6 ${color}`} />
								<div>
									<p className="text-sm font-normal leading-none">{title}</p>
									<p className="text-sm font-normal text-muted-foreground">
										{value}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
