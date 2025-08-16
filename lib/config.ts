export const config = {
	openweather: {
		currentWeatherEndpoint: "https://api.openweathermap.org/data/2.5/weather?",
		forecastWeatherEndpoint:
			"https://api.openweathermap.org/data/2.5/forecast?",
		directGeocodeEndpoint: "https://api.openweathermap.org/geo/1.0/direct?",
		reverseGeocodeEndpoint: "https://api.openweathermap.org/geo/1.0/reverse?",
		privateKey: process.env.OPENWEATHERMAP_API_PRIVATE_KEY!,
		lang: "en",
		units: "metric",
	},
};
