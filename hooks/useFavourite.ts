import { FavouriteCity } from "@/lib/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavourite = () => {
	const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
		"favouriteCities",
		[]
	);

	const queryClient = useQueryClient();

	const favouritesQuery = useQuery({
		queryKey: ["favouriteCities"],
		queryFn: () => favourites,
		initialData: favourites,
		staleTime: Infinity,
	});

	const addToFavourites = useMutation({
		mutationFn: async (
			favouriteCity: Omit<FavouriteCity, "id" | "addedAt">
		) => {
			// Create new favourite city item
			const newFavourite: FavouriteCity = {
				...favouriteCity,
				id: `${favouriteCity.lat}-${favouriteCity.lon}-${Date.now()}`,
				addedAt: Date.now(),
			};

			// Check if new favourite already exists in current favourites
			const favouriteExists = favourites.some(
				(favourite) => favourite.id === newFavourite.id
			);

			// If fav already exists return current favs, make no changes
			if (favouriteExists) return favourites;

			// Else it does not exist, add it to current favourites
			const newFavourites = [newFavourite, ...favourites].slice(0, 10);

			setFavourites(newFavourites);
			return newFavourites;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["favouriteCities"],
			});
		},
	});

	const removeFavourite = useMutation({
		mutationFn: async (cityId: string) => {
			const newFavourites = favourites.filter(
				(favourite) => favourite.id !== cityId
			);

			setFavourites(newFavourites);
			return newFavourites;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["favouriteCities"],
			});
		},
	});

	return {
		favourites: favouritesQuery.data ?? [],
		addToFavourites,
		removeFavourite,
		isFavourite: (lat: number, lon: number) =>
			favourites.some(
				(favourite) => favourite.lat === lat && favourite.lon === lon
			),
	};
};
