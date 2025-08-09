import { ClassValue } from "clsx";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

type CustomCardProps = {
	children?: React.ReactNode;
	cardClassName?: ClassValue;
	contentClassName?: ClassValue;
};

export default function CustomCard({
	children,
	cardClassName,
	contentClassName,
}: CustomCardProps) {
	return (
		<Card className={cn("overflow-hidden", cardClassName)}>
			<CardContent className={cn("p-6", contentClassName)}>
				{children}
			</CardContent>
		</Card>
	);
}
