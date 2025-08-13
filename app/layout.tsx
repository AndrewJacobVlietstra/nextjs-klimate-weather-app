import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Lato } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Klimate Weather App",
	description:
		"Get the latest weather data in your local area. Search other cities weather data.",
	keywords: ["klimate", "weather", "city"],
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
				<ReactQueryProvider>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
						<Header />
						<main className="min-h-[calc(100vh-5.3rem-5.6rem)]">
							<div className="container mx-auto px-4 py-8 overflow-auto">
								{children}
							</div>
						</main>
						<Footer />
					</ThemeProvider>
					<ReactQueryDevtools />
				</ReactQueryProvider>
			</body>
		</html>
	);
}
