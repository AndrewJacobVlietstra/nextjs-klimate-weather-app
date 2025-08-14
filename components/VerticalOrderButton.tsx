import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DataOrder } from "@/lib/types";
import { ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";

type VerticalOrderButtonProps = {
	className?: ClassValue;
	isDefaultOrder: boolean;
	setOrder: Dispatch<SetStateAction<DataOrder>>;
};

export default function VerticalOrderButton({
	className,
	isDefaultOrder,
	setOrder,
}: VerticalOrderButtonProps) {
	return (
		<Button
			className={cn("p-5", className)}
			onClick={() =>
				setOrder((prev) => ({ ...prev, vertical: isDefaultOrder ? 2 : 1 }))
			}
			size="icon"
			title="Change Row Order"
			variant="outline"
		>
			{isDefaultOrder && <ArrowUpDown className="size-5" />}
			{!isDefaultOrder && <ArrowDownUp className="size-5" />}
		</Button>
	);
}
