import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type CustomAlertProps = {
	alertVariant?: "default" | "destructive";
	alertTitle?: string;
	alertDescription?: string | null;
	buttonIcon?: "MapPin" | "RefreshCw";
	buttonText?: string | null;
	buttonVariant:
		| "default"
		| "destructive"
		| "ghost"
		| "link"
		| "outline"
		| "secondary";
	clickHandler?: () => void;
};

export default function CustomAlert({
	alertVariant = "default",
	alertTitle,
	alertDescription,
	buttonIcon = "MapPin",
	buttonText,
	buttonVariant = "default",
	clickHandler,
}: CustomAlertProps) {
	return (
		<Alert variant={alertVariant}>
			<AlertTriangle className="h-4 w-4" />
			<AlertTitle className="pb-2">{alertTitle}</AlertTitle>
			<AlertDescription>
				<p className="pb-2">{alertDescription}</p>
				<Button
					className="w-fit"
					onClick={clickHandler ?? (() => true)}
					variant={buttonVariant}
				>
					{buttonIcon === "MapPin" ? (
						<MapPin className="h-4 w-4" />
					) : (
						<RefreshCw className="h-4 w-4" />
					)}
					{buttonText}
				</Button>
			</AlertDescription>
		</Alert>
	);
}
