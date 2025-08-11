import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Forecast_Weather_API_Response } from "@/lib/types";

type WeatherForecastProps = {
	data: Forecast_Weather_API_Response;
};

export default function WeatherForecast({ data }: WeatherForecastProps) {
	return (
		<Card className="flex-1/2 bg-background/50 hover:bg-background/65 transition-colors">
			<CardHeader>
				<CardTitle>5 Day Forecast</CardTitle>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
