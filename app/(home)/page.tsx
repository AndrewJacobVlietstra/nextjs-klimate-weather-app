import Dashboard from "@/components/dashboard/Dashboard";
import { Suspense } from "react";

export default async function HomePage() {
	return (
		<Suspense>
			<Dashboard />
		</Suspense>
	);
}
