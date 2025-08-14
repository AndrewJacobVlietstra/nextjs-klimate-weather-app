import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
	return (
		<div className="space-y-6">
			<div className="grid gap-6">
				<Skeleton className="bg-accent-custom h-[300px] w-full rounded-lg" />
				<Skeleton className="bg-accent-custom h-[300px] w-full rounded-lg" />
				<div className="grid gap-6 md:grid-cols-2">
					<Skeleton className="bg-accent-custom h-[300px] w-full rounded-lg" />
					<Skeleton className="bg-accent-custom h-[300px] w-full rounded-lg" />
				</div>
			</div>
		</div>
	);
}
