"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const isLightTheme = theme === "light";

	return (
		<Button
			className="p-5"
			onClick={() => setTheme(isLightTheme ? "dark" : "light")}
			title="Toggle Theme"
			size="icon"
			variant="outline"
		>
			<Sun className="text-yellow-400 size-5 scale-100 rotate-0 dark:scale-0 dark:-rotate-90 transition-all duration-300" />
			<Moon className="text-blue-100 absolute size-5 scale-0 rotate-90 dark:scale-100 dark:rotate-0 transition-all duration-300" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
