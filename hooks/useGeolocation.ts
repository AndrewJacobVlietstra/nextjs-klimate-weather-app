import { useEffect, useState } from "react";
import { GeolocationState } from "@/lib/types";

export const useGeolocation = () => {
	// Initialize state for location data
	const [locationData, setLocationData] = useState<GeolocationState>({
		coordinates: null,
		error: null,
		isLoading: true,
	});

	// Will check if browser supports geolocation API, sets location data accordingly..
	const getLocation = () => {
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
		getLocation();
	}, []);

	return {
		...locationData,
		getLocation,
	};
};
