import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Star } from "lucide-react";

type FavouriteButtonProps = {
	className?: ClassValue;
	clickHandler: () => void;
	isLoading?: boolean;
};

export default function FavouriteButton({
	className,
	clickHandler,
	isLoading,
}: FavouriteButtonProps) {
	return (
		<Button
			className={cn("", className)}
			onClick={clickHandler}
			disabled={isLoading ?? false}
			size="icon"
			title="Add To Favourites"
			variant="outline"
		>
			<Star className={cn("size-4")} />
		</Button>
	);
}
