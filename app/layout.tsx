import "./globals.css";
import { Lato } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
				className={`${lato.className} transition-colors ease-in-out duration-300 bg-gradient-to-br from-background to-muted antialiased`}
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
