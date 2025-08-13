"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useMount } from "@/hooks/useMount";
import { Skeleton } from "@/components/ui/skeleton";

{
	/* Because we cannot know the theme on the server, many of the values returned from
     useTheme will be undefined until mounted on the client. This means if you try to
     render UI based on the current theme before mounting on the client, you will see
     a hydration mismatch error. To fix this, make sure you only render UI that uses
     the current theme when the page is mounted on the client.
	*/
}

export default function Logo() {
	const mounted = useMount();
	const { theme } = useTheme();
	const isLightTheme = theme === "light";

	if (!mounted) return <Skeleton className="w-[64px] h-[52px] rounded-lg" />;

	return (
		<Link href={"/"}>
			<Image
				className="min-w-full hover:brightness-125 transition-all"
				src={isLightTheme ? "/logo2.png" : "/logo.png"}
				alt="Klimate logo"
				width={64}
				height={64}
			/>
		</Link>
	);
}
