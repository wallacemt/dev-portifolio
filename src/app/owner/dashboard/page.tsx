import { Dashboard } from "@/components/Owner/Dashboard/Dashboard";
import { cookies } from "next/headers";
import { Suspense } from "react";

//aqui fica  a logica do suspence o skeleton do dashboard
export default async function OwnerDashboardPage() {
  return (
    <>
      <Suspense fallback={"Carregando..."}>
        <Dashboard />
      </Suspense>
    </>
  );
}
