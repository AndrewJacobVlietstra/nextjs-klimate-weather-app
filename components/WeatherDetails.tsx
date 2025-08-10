import { format } from "date-fns";
import { Current_Weather_API_Response } from "@/lib/types";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

type WeatherDetailsProps = {
	data: Current_Weather_API_Response;
};

export default function WeatherDetails({ data }: WeatherDetailsProps) {
	const {
		main: { pressure },
		sys,
		wind,
	} = data;

	const formatTime = (timestamp: number) =>
		format(new Date(timestamp * 1000), "h:mm a");

	const getWindDirection = (deg: number) => {
		const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

		const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;

		return directions[index];
	};

	const details = [
		{
			color: "text-orange-500",
			icon: Sunrise,
			title: "Sunrise",
			value: formatTime(sys.sunrise),
		},
		{
			color: "text-blue-500",
			icon: Sunset,
			title: "Sunset",
			value: formatTime(sys.sunset),
		},
		{
			color: "text-green-500",
			icon: Compass,
			title: "Wind Direction",
			value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
		},
		{
			color: "text-purple-500",
			icon: Gauge,
			title: "Pressure",
			value: `${pressure} hPa`,
		},
	];

	return (
		<Card className="bg-background/50">
			<CardHeader>
				<CardTitle>Weather Details</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{details.map(({ color, icon: DetailIcon, title, value }) => (
						<Card className="bg-background/50" key={title}>
							<CardContent className="flex items-center gap-3">
								<DetailIcon className={`size-6 ${color}`} />
								<div>
									<p className="text-sm font-normal leading-none">{title}</p>
									<p className="text-sm text-muted-foreground">{value}</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
