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
import { Clock3, Loader2, MapPin, Search, XCircle } from "lucide-react";
import { isStringUndefined } from "@/lib/utils";
import { format } from "date-fns";
import { useDirectGeocodeQuery } from "@/hooks/useWeather";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchHistory } from "@/hooks/useSearchHistory";

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

	const { data, isLoading } = useDirectGeocodeQuery(debouncedQuery);
	const { history, addToHistory, clearHistory } = useSearchHistory();

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

		router.push(`/?city=${name}&lat=${lat}&lon=${lon}`);
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
							<CommandGroup heading="Suggestions">
								{data.map((location) => (
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
						)}

						{history.length >= 1 && (
							<>
								<CommandSeparator />
								<CommandGroup className="pb-2">
									<div className="flex items-center justify-between p-2">
										<p className=" p-2 text-xs text-muted-foreground">
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

						{/* <CommandSeparator /> */}

						{/* <CommandGroup heading="Favourites">
						<CommandItem>Pizza</CommandItem>
					</CommandGroup> */}
					</CommandList>
				</CommandDialog>
			</Command>
		</>
	);
}
