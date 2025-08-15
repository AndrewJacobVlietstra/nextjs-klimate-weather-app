import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

type RefreshButtonProps = {
	buttonClassName?: ClassValue;
	iconClassName?: ClassValue;
	clickHandler: () => void;
	isLoading: boolean;
};

export default function RefreshButton({
	buttonClassName,
	iconClassName,
	clickHandler,
	isLoading,
}: RefreshButtonProps) {
	return (
		<Button
			className={cn("", buttonClassName)}
			onClick={clickHandler}
			disabled={isLoading}
			size="icon"
			title="Refresh Data"
			variant="outline"
		>
			<RefreshCw className={cn("", iconClassName)} />
		</Button>
	);
}
