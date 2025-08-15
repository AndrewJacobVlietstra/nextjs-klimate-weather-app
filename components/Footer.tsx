export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="text-base font-light border-t bg-background/95 backdrop-blur py-8 supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto text-center px-4">
				<p className="flex max-[500px]:flex-col justify-center gap-1">
					<span>&copy; Copyright {currentYear} Klimate Weather App.</span>
					<span>All Rights Reserved.</span>
				</p>
			</div>
		</footer>
	);
}
