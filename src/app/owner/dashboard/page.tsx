import { FullDashboardSkeleton } from "@/components/Owner/Dashboard/_components/dashboard-skeleton";
import { Dashboard } from "@/components/Owner/Dashboard/Dashboard";
import { Suspense } from "react";

export default async function OwnerDashboardPage() {
  return (
    <Suspense fallback={<FullDashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
