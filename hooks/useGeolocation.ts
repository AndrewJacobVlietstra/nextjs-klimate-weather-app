import { useEffect, useState } from "react";
import { GeolocationState } from "@/lib/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const useGeolocation = (
	searchParams: ReadonlyURLSearchParams,
	isCoordsInSearchParams: boolean
) => {
	// Initialize state for location data
	const [locationData, setLocationData] = useState<GeolocationState>({
		coordinates: null,
		error: null,
		isLoading: true,
	});

	// Will check if browser supports geolocation API, sets location data accordingly..
	const getCurrentLocation = () => {
		setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

		if (!navigator.geolocation) {
			setLocationData({
				coordinates: null,
				error: "Geolocation is not supported by your browser.",
				isLoading: false,
			});

			return;
		}

		// Successful callback
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocationData({
					coordinates: {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
					error: null,
					isLoading: false,
				});
			},

			// Error callback
			(error) => {
				let errorMessage: string;

				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage =
							"Location permission denied. Please enable location access.";
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = "Location information is unavailable.";
						break;
					case error.TIMEOUT:
						errorMessage = "Location request timed out.";
						break;
					default:
						errorMessage = "An unknown error occurred.";
						break;
				}

				setLocationData({
					coordinates: null,
					error: errorMessage,
					isLoading: false,
				});
			},
			// Additional options
			{
				enableHighAccuracy: true,
				timeout: 6000,
				maximumAge: 0,
			}
		);
	};

	useEffect(() => {
		// If no coordinates in searchParams, get current location data
		if (!isCoordsInSearchParams) {
			getCurrentLocation();
		}

		// If coordinates exist in searchParams, get that location data
		if (isCoordsInSearchParams) {
			setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

			const lat = Number(searchParams.get("lat"));
			const lon = Number(searchParams.get("lon"));

			setLocationData({
				coordinates: { lat, lon },
				error: null,
				isLoading: false,
			});
		}
	}, [searchParams, isCoordsInSearchParams]);

	return {
		...locationData,
		getCurrentLocation,
	};
};
