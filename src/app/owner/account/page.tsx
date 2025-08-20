import { AccountOwner } from "@/components/Owner/Account/Account";
import { Suspense } from "react";


export default async function AccountPage() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountOwner  />
    </Suspense>
  );
}
