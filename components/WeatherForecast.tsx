import { Forecast_Weather_API_Response } from "@/lib/types";

type WeatherForecastProps = {
	data: Forecast_Weather_API_Response;
};

export default function WeatherForecast({ data }: WeatherForecastProps) {
	return <div>WeatherForecast</div>;
}
