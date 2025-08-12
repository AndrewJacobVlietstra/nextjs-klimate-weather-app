import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Command, CommandInput } from "@/components/ui/command";

type SearchbarProps = {
	className?: ClassValue;
};

export default function Searchbar({ className }: SearchbarProps) {
	return (
		<Command
			className={cn("rounded-lg border shadow-md md:min-w-[450px]", className)}
		>
			<CommandInput placeholder="Search cities..." />
		</Command>
	);
}
