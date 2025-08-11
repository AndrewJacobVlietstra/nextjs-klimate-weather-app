import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { TemperatureUnits } from "@/lib/types";

type UnitButtonProps = {
	className?: ClassValue;
	setUnit: Dispatch<SetStateAction<TemperatureUnits>>;
	unit: TemperatureUnits;
};

export default function UnitButton({
	className,
	setUnit,
	unit,
}: UnitButtonProps) {
	return (
		<Button
			className={cn("btn_pulse--active", className)}
			onClick={() => (unit === "C" ? setUnit("F") : setUnit("C"))}
			size="icon"
			title={`Toggle Unit: ${unit === "C" ? "Celsius" : "Fahrenheit"}`}
			variant="outline"
		>
			<span className="text-2xl">{unit}</span>
		</Button>
	);
}
