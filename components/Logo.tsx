"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
	const { theme } = useTheme();
	const isLightTheme = theme === "light";

	return (
		<Link href={"/"}>
			<Image
				className="hover:brightness-125 transition-all"
				src={isLightTheme ? "/logo2.png" : "/logo.png"}
				alt="Klimate logo"
				width={64}
				height={64}
			/>
		</Link>
	);
}
