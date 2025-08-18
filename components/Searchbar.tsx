"use client";

import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Clock3, Loader2, MapPin, Search, Star, XCircle } from "lucide-react";
import { Direct_Geo_API_Response } from "@/lib/types";
import { format } from "date-fns";
import { isStringUndefined } from "@/lib/utils";
import { useDirectGeocodeQuery } from "@/hooks/useWeather";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useFavourite } from "@/hooks/useFavourite";

type SearchbarProps = {
	className?: ClassValue;
};

export default function Searchbar({}: SearchbarProps) {
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query);

	const { favourites } = useFavourite();
	const { history, addToHistory, clearHistory } = useSearchHistory();
	const { data, isLoading } = useDirectGeocodeQuery(debouncedQuery);

	// Remove any duplicate results that may exist in data
	const uniqueData = data
		?.map((item) => {
			// Remove local_names from each item, objects will be easier to compare
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { local_names, ...rest } = item;
			return rest;
		})
		.reduce((acc, current) => {
			const result = acc.find(
				// Stringify objects to compare,
				(item) => JSON.stringify(item) == JSON.stringify(current)
			);

			// if current item not in accumulator array add it
			if (!result) return acc.concat(current);

			// else current item already in accumulator, return what we have
			return acc;
		}, [] as Direct_Geo_API_Response);

	const handleSelect = (cityData: string) => {
		setOpen((open) => !open);

		const [lat, lon, name, state, country] = cityData.split("|");

		const parsedState = isStringUndefined(state);

		addToHistory.mutate({
			country,
			name,
			lat: parseFloat(lat),
			lon: parseFloat(lon),
			state: parsedState,
			query,
		});

		router.push(
			`/?lat=${lat}&lon=${lon}&city=${name}&${
				parsedState ? `state=${state}&` : ""
			}country=${country}`
		);
	};

	return (
		<>
			<Button
				className="justify-start gap-2 py-5 text-sm text-muted-foreground max-[330px]:w-fit sm:w-42 md:w-50 lg:w-64"
				onClick={() => setOpen((open) => !open)}
				title="Press CTRL/CMD + K to Open"
				variant={"outline"}
			>
				<Search className="size-4" />
				<span className="max-[330px]:hidden">Search Cities...</span>
			</Button>

			<Command>
				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandInput
						placeholder="Search Cities..."
						onValueChange={setQuery}
						value={query}
					/>

					<CommandList>
						{query.length >= 3 &&
							!isLoading &&
							(!data || data.length === 0) && (
								<CommandEmpty className="flex justify-center py-6 text-sm">
									<div className="flex flex-col items-start">
										<p>No cities found.</p>
										<p>Try a different search.</p>
									</div>
								</CommandEmpty>
							)}

						{isLoading && (
							<div className="flex items-center justify-center px-2 py-6">
								<Loader2 className="size-6 animate-spin" />
							</div>
						)}

						{data && data.length >= 1 && (
							<>
								<CommandSeparator />
								<CommandGroup heading="Suggestions">
									{uniqueData?.map((location) => (
										<CommandItem
											className="gap-1.5"
											key={`${location.lat}${location.lon}${location.name}`}
											value={`${location.lat}|${location.lon}|${location.name}|${location.state}|${location.country}`}
											onSelect={handleSelect}
										>
											<MapPin className="size-4 text-muted-foreground" />
											<span>{location.name},</span>
											{location.state && (
												<span className="text-sm text-muted-foreground">
													{location.state},
												</span>
											)}
											<span className="text-sm text-muted-foreground">
												{location.country}
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}

						{favourites.length > 0 ? (
							<CommandGroup heading="Favourites">
								{favourites.map(({ lat, lon, name, state, country }) => (
									<CommandItem
										className="gap-1.5"
										key={`${lat}|${lon}|${name}|${
											state ? `${state}|` : ""
										}${country}`}
										value={`${lat}|${lon}|${name}|${state}|${country}`}
										onSelect={handleSelect}
									>
										<Star className="size-4 fill-amber-300" />

										<span>{name},</span>
										{state && (
											<span className="text-sm text-muted-foreground">
												{state},
											</span>
										)}
										<span className="text-sm text-muted-foreground">
											{country}
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						) : null}

						{history.length >= 1 && (
							<>
								<CommandSeparator />
								<CommandGroup className="pb-2">
									<div className="flex items-center justify-between p-2">
										<p className="text-xs text-muted-foreground">
											Recent Searches
										</p>
										<Button
											className="text-xs"
											size={"sm"}
											variant={"ghost"}
											onClick={() => clearHistory.mutate()}
										>
											<XCircle className="size-4" />
											Clear
										</Button>
									</div>
									{history.map((item) => (
										<CommandItem
											className="gap-1.5"
											key={`${item.id}-recentSearchItem`}
											value={`${item.lat}|${item.lon}|${item.name}|${item.state}|${item.country}|recentSearch`}
											onSelect={handleSelect}
										>
											<Clock3 className="size-4 text-muted-foreground" />
											<span>{item.name},</span>
											{item.state && (
												<span className="text-sm text-muted-foreground">
													{item.state},
												</span>
											)}
											<span className="text-sm text-muted-foreground">
												{item.country}
											</span>
											<span className="ml-auto text-xs text-muted-foreground">
												{format(item.searchedAt, "MMM d, h:mm a")}
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}
					</CommandList>
				</CommandDialog>
			</Command>
		</>
	);
}
