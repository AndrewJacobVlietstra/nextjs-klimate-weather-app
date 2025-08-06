import "./globals.css";
import { Lato } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Weather App",
	description: "Get the latest weather data.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${lato.className} bg-gradient-to-br from-background to-muted antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="min-h-[calc(100vh-5.3rem-5.56rem)]">
						<div className="container mx-auto px-4 py-8 overflow-auto">
							{children}
						</div>
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
