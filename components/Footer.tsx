export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="text-base font-light border-t backdrop-blur py-8 supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto text-center px-4">
				<p>
					&copy; Copyright {currentYear} Klimate Weather App. All Rights
					Reserved.
				</p>
			</div>
		</footer>
	);
}
