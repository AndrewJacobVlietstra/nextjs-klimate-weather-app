import { SearchHistoryItem } from "@/lib/types";
import { useLocalStorage } from "./useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSearchHistory = () => {
	const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
		"searchHistory",
		[]
	);

	const queryClient = useQueryClient();

	const historyQuery = useQuery({
		queryKey: ["searchHistory"],
		queryFn: () => history,
		initialData: history,
	});

	const addToHistory = useMutation({
		mutationFn: async (
			searchItem: Omit<SearchHistoryItem, "id" | "searchedAt">
		) => {
			// Create new search history item
			const newSearch: SearchHistoryItem = {
				...searchItem,
				id: `${searchItem.lat}-${searchItem.lon}-${Date.now()}`,
				searchedAt: Date.now(),
			};

			// Filter out any currently existing history items that match search item
			const filteredHistory = history.filter(
				(item) => !(item.lat === searchItem.lat && item.lon === searchItem.lon)
			);

			const newHistory = [newSearch, ...filteredHistory].slice(0, 10);

			setHistory(newHistory);

			return newHistory;
		},
		onSuccess: (newHistory) => {
			queryClient.setQueryData(["searchHistory"], newHistory);
		},
	});

	const clearHistory = useMutation({
		mutationFn: async () => {
			setHistory([]);
			return [];
		},
		onSuccess: () => {
			queryClient.setQueryData(["searchHistory"], []);
		},
	});

	return {
		history: historyQuery.data ?? [],
		addToHistory,
		clearHistory,
	};
};
