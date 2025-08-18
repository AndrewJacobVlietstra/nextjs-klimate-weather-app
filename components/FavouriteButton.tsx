"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Star } from "lucide-react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useFavourite } from "@/hooks/useFavourite";
import { FavouriteCity } from "@/lib/types";

type FavouriteButtonProps = {
	className?: ClassValue;
	searchParams: ReadonlyURLSearchParams;
};

export default function FavouriteButton({
	className,
	searchParams,
}: FavouriteButtonProps) {
	const { addToFavourites, removeFavourite, isFavourite } = useFavourite();

	const { lat, lon, city, state, country } = Object.fromEntries(searchParams);

	const locationID = `${lat}|${lon}|${city}|${
		state ? `${state}|` : ""
	}${country}`;

	const newFavourite: Omit<FavouriteCity, "id" | "addedAt"> = {
		lat: Number(lat),
		lon: Number(lon),
		name: city,
		state,
		country,
	};

	return (
		<Button
			className={cn("p-5 group", className)}
			onClick={() => {
				const isLocationFavourite = isFavourite(locationID);

				if (isLocationFavourite) {
					removeFavourite.mutate(locationID);
				}

				if (!isLocationFavourite) {
					addToFavourites.mutate(newFavourite);
				}
			}}
			size="icon"
			title={`${
				isFavourite(locationID) ? "Remove Favourite" : "Add To Favourites"
			}`}
			variant="outline"
		>
			<Star
				className={`size-5 group-active:animate-ping ${
					isFavourite(locationID) ? "fill-amber-300" : ""
				}`}
			/>
		</Button>
	);
}
