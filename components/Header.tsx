"use client";

import { useTheme } from "next-themes";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	const { theme } = useTheme();

	return (
		<header className="py-4 px-6">
			<ul className="flex items-center justify-between">
				<li>
					<Link href={"/"}>
						<Image
							className="hover:brightness-125 transition-all"
							src={theme === "light" ? "/logo2.png" : "/logo.png"}
							alt="Klimate logo"
							width={65}
							height={65}
						/>
					</Link>
				</li>

				<li className="flex items-center gap-x-6">
					<p>Search Bar</p>
					<ModeToggle />
				</li>
			</ul>
		</header>
	);
}
