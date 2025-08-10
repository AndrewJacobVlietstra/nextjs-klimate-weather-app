import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import {
	Current_Weather_API_Response,
	Reverse_Geo_API_Response,
} from "@/lib/types";
import CustomCard from "./CustomCard";
import Image from "next/image";

type CurrentWeatherProps = {
	data: Current_Weather_API_Response;
	location?: Reverse_Geo_API_Response[0];
};

export default function CurrentWeather({
	data,
	location,
}: CurrentWeatherProps) {
	const {
		main: { feels_like, temp, temp_min, temp_max, humidity },
		weather: [{ description, icon }],
		wind: { speed },
	} = data;

	const formatTemp = (temp: number) => `${Math.round(temp)} °`;

	return (
		<CustomCard
			cardClassName="bg-background/40 backdrop-blur-2xl"
			contentClassName="py-4 pr-0"
		>
			<div className="grid gap-6 md:grid-cols-2 justify-items-center">
				<div className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-end gap-1">
							<h2 className="text-2xl font-bold tracking-tight">
								{location?.name}
							</h2>
							{location?.state && (
								<span className="text-muted-foreground">
									, {location.state}
								</span>
							)}
						</div>

						<p className="text-sm text-muted-foreground">{location?.country}</p>
					</div>

					<div className="flex items-center gap-2">
						<p className="text-7xl font-bold tracking-tight">
							{formatTemp(temp)}
						</p>

						<div className="space-y-1">
							<p className="pl-1 text-sm font-normal text-muted-foreground">
								Feels Like {formatTemp(feels_like)}
							</p>
							<div className="flex gap-2 text-sm font-normal">
								<span className="flex items-center gap-1 text-blue-500">
									<ArrowDown className="size-3.5" />
									{formatTemp(temp_min)}
								</span>
								<span className="flex items-center gap-1 text-red-500">
									<ArrowUp className="size-3.5" />
									{formatTemp(temp_max)}
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center gap-2">
							<Droplets className="size-5 text-blue-400" />
							<div className="space-y-0.5">
								<p className="text-sm font-medium">Humidity</p>
								<p className="text-sm text-muted-foreground">{humidity}%</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Wind className="size-5 text-blue-400" />
							<div className="space-y-0.5">
								<p className="text-sm font-medium">Wind Speed</p>
								<p className="text-sm text-muted-foreground">{speed} m/s</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center">
					<div className="relative flex items-center justify-center aspect-square w-full max-w-[200px] ">
						<Image
							alt={`${description} image`}
							className="h-full w-full object-contain"
							src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
							width={200}
							height={200}
						/>
						<div className="absolute bottom-4.5 text-center">
							<p className="text-sm font-normal capitalize">{description}</p>
						</div>
					</div>
				</div>
			</div>
		</CustomCard>
	);
}
