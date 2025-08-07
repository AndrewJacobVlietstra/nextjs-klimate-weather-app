"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ReactQueryProviderProps = {
	children: ReactNode;
};

// The query client will be used throughout the app, through the provider
export default function ReactQueryProvider({
	children,
}: ReactQueryProviderProps) {
	// Create a new query client
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
