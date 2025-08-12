import { Current_Weather_API_Response } from "@/lib/types";
import {
	Clock,
	CloudRainWind,
	Compass,
	Earth,
	Eye,
	Gauge,
	MapPinned,
	Sunrise,
	Sunset,
	Users,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { countryName, formatDate } from "@/lib/utils";

type WeatherDetailsProps = {
	data: Current_Weather_API_Response;
	precipitation: number;
	population: number;
};

export default function WeatherDetails({
	data,
	precipitation,
	population,
}: WeatherDetailsProps) {
	const {
		main: { pressure },
		coord: { lat, lon },
		dt,
		sys,
		wind,
		visibility,
	} = data;

	const getWindDirection = (deg: number) => {
		const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

		const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;

		return directions[index];
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
			value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
		},
		{
			color: "text-sky-400",
			title: "Rain Chance",
			icon: CloudRainWind,
			value: `${precipitation}%`,
		},
		{
			color: "text-primary",
			title: "Visibility",
			icon: Eye,
			value: `${visibility / 1000}km`,
		},
		{
			color: "text-purple-500",
			title: "Pressure",
			icon: Gauge,
			value: `${pressure} hPa`,
		},
		{
			color: "text-fuchsia-400",
			title: "Population",
			icon: Users,
			value: `${Math.round(population / 1000)} K`,
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
					<span className="block pt-[0.1rem]">Lat: {lat},</span>
					<span className="block">Lon: {lon}</span>
				</>
			),
		},
		{
			color: "text-sky-300",
			title: "Country",
			icon: Earth,
			value: countryName.of(sys.country),
		},
	];

	return (
		<Card className="flex-1/2 bg-background/50 hover:bg-background/65 transition-colors">
			<CardHeader>
				<CardTitle>Current Weather Details</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-2 gap-4">
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
