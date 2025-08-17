"use client";

import { ArrowLeftRight, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DataOrder } from "@/lib/types";
import { ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";

type HorizontalOrderButtonProps = {
	className?: ClassValue;
	isDefaultOrder: boolean;
	setOrder: Dispatch<SetStateAction<DataOrder>>;
};

export default function HorizontalOrderButton({
	className,
	isDefaultOrder,
	setOrder,
}: HorizontalOrderButtonProps) {
	return (
		<Button
			className={cn("p-5", className)}
			onClick={() =>
				setOrder((prev) => ({ ...prev, horizontal: isDefaultOrder ? 2 : 1 }))
			}
			size="icon"
			title="Change Column Order"
			variant="outline"
		>
			{isDefaultOrder && <ArrowLeftRight className="size-5" />}
			{!isDefaultOrder && <ArrowRightLeft className="size-5" />}
		</Button>
	);
}
