import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import Searchbar from "@/components/Searchbar";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<ul className="flex items-center justify-between">
					<li>
						<Logo />
					</li>

					<li className="relative flex items-center gap-x-6">
						<Searchbar className={""} />
						<ThemeToggle />
					</li>
				</ul>
			</div>
		</header>
	);
}
