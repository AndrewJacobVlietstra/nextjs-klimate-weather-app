import { FavouriteCity } from "@/lib/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavourite = () => {
	const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
		"favouriteCities",
		[]
	);

	const queryClient = useQueryClient();

	const favouriteQuery = useQuery({
		queryKey: ["favouriteCities"],
		queryFn: () => favourites,
		initialData: favourites,
	});

	const addToFavourites = useMutation({
		mutationFn: async (
			favouriteCity: Omit<FavouriteCity, "id" | "addedAt">
		) => {
			const { lat, lon, name, state, country } = favouriteCity;

			// Create new favourite city item
			const newFavourite: FavouriteCity = {
				...favouriteCity,
				id: `${lat}|${lon}|${name}|${state ? `${state}|` : ""}${country}`,
				addedAt: Date.now(),
			};

			// Check if new favourite already exists in current favourites
			const favouriteExists = favourites.some(
				(favourite) => favourite.id === newFavourite.id
			);

			// If fav already exists return current favs, make no changes
			if (favouriteExists) return favourites;

			const newFavourites = [newFavourite, ...favourites];

			setFavourites([...newFavourites]);
			return newFavourites;
		},
		onSuccess: (newFavourites) => {
			queryClient.setQueryData(["favouriteCities"], newFavourites);
		},
	});

	const removeFavourite = useMutation({
		mutationFn: async (cityID: string) => {
			const newFavourites = favourites.filter(
				(favourite) => favourite.id !== cityID
			);

			setFavourites([...newFavourites]);
			return newFavourites;
		},
		onSuccess: (newFavourites) => {
			queryClient.setQueryData(["favouriteCities"], newFavourites);
		},
	});

	return {
		favourites: favouriteQuery.data ?? [],
		addToFavourites,
		removeFavourite,
		isFavourite: (cityID: string) =>
			favourites.some((favourite) => favourite.id === cityID),
	};
};
