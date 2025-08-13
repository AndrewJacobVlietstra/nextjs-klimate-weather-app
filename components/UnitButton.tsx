import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Button } from "@/components/ui/button";
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
	const isCelsius = unit === "C";

	return (
		<Button
			className={cn("btn_pulse--hover", className)}
			onClick={() => (isCelsius ? setUnit("F") : setUnit("C"))}
			title={`Toggle Unit: ${isCelsius ? "Celsius" : "Fahrenheit"}`}
			size="icon"
			variant="outline"
		>
			<span className="text-2xl">{unit}</span>
		</Button>
	);
}
