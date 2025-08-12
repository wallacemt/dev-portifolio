import { Dashboard } from "@/components/Owner/Dashboard/Dashboard";
import { Suspense } from "react";

export default async function OwnerDashboardPage() {
  return (
    <>
      <Suspense fallback={"Carregando..."}>
        <Dashboard />
      </Suspense>
    </>
  );
}
