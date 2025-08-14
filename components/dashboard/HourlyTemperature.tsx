import { ClassValue } from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, convertUnit, formatDate, formatTemp } from "@/lib/utils";
import { Forecast_Weather_API_Response, TemperatureUnits } from "@/lib/types";
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type HourlyTemperatureProps = {
	className?: ClassValue;
	data: Forecast_Weather_API_Response;
	unit: TemperatureUnits;
};

export default function HourlyTemperature({
	className,
	data,
	unit,
}: HourlyTemperatureProps) {
	const chartData = data.list
		.slice(0, 8)
		.map(({ dt, main: { temp, feels_like } }) => ({
			time: formatDate(dt, "ha"),
			temp: Math.round(convertUnit(temp, unit)),
			feels_like: Math.round(convertUnit(feels_like, unit)),
		}));

	return (
		<Card
			className={cn(
				"flex-1/2 bg-background/70 hover:bg-background/85 transition-colors backdrop-blur-[10px]",
				className
			)}
		>
			<CardHeader>
				<CardTitle>Today&apos;s Temperature</CardTitle>
			</CardHeader>
			<CardContent className="pl-0 pr-6">
				<div className="h-[340px] md:h-[200px] w-full">
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<LineChart data={chartData}>
							<XAxis
								domain={["auto"]}
								dataKey={"time"}
								stroke="#888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>

							<YAxis
								domain={["auto", "auto"]}
								stroke="#888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `${value}°`}
							/>

							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										return (
											<div className="rounded-lg border bg-background p-2 shadow-sm">
												<div className="grid grid-cols-2 gap-2 justify-items-center">
													<div className="flex flex-col">
														<span className="text-[0.7rem] uppercase text-muted-foreground">
															Temperature:{" "}
														</span>
														<span className="font-bold">
															{formatTemp(payload[0].value)}
														</span>
													</div>
													<div>
														<div className="flex flex-col">
															<span className="text-[0.7rem] uppercase text-muted-foreground">
																Feels Like:{" "}
															</span>
															<span className="font-bold">
																{formatTemp(payload[1].value)}
															</span>
														</div>
													</div>
												</div>
											</div>
										);
									}

									return null;
								}}
							/>

							<Line
								type="monotone"
								dataKey="temp"
								stroke="#2563eb"
								strokeWidth={2}
								dot={false}
							/>

							<Line
								type="monotone"
								dataKey="feels_like"
								stroke="#64748b"
								strokeWidth={2}
								dot={false}
								strokeDasharray={"5 5"}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
