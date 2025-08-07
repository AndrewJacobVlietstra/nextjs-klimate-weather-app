import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full py-4 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<ul className="flex items-center justify-between">
				<li>
					<Logo />
				</li>

				<li className="flex items-center gap-x-6">
					<p>Search Bar</p>
					<ThemeToggle />
				</li>
			</ul>
		</header>
	);
}
