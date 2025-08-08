"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardPage() {
	const { coordinates, error, isLoading, getLocation } = useGeolocation();

	const handleRefresh = () => {
		getLocation();
		if (coordinates) {
			// Reload weather data
		}
	};

	if (isLoading) return <DashboardSkeleton />;

	if (error)
		return (
			<Alert variant="destructive">
				<AlertTriangle className="h-4 w-4" />
				<AlertTitle className="pb-2">Location Error</AlertTitle>
				<AlertDescription>
					<p className="pb-2">{error}</p>
					<Button className="w-fit" onClick={getLocation} variant="outline">
						<MapPin className="h-4 w-4" />
						Enable Location
					</Button>
				</AlertDescription>
			</Alert>
		);

	if (!coordinates)
		return (
			<Alert variant="destructive">
				<AlertTitle className="pb-2">Location Required</AlertTitle>
				<AlertDescription>
					<p className="pb-2">
						Please enable location access to see your local weather.
					</p>
					<Button className="w-fit" onClick={getLocation} variant="outline">
						<MapPin className="h-4 w-4" />
						Enable Location
					</Button>
				</AlertDescription>
			</Alert>
		);

	return (
		<div className="space-y-4">
			{/* Favourite Cities */}
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">My Location</h1>
				<Button
					onClick={handleRefresh}
					disabled={isLoading}
					size="icon"
					variant="outline"
				>
					<RefreshCw className="h-4 w-4" />
				</Button>
			</div>

			{/* Current and hourly weather */}
		</div>
	);
}
