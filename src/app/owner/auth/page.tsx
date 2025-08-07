import { Login } from "@/components/Owner/Login/Login";

interface AuthOwnerProps {
  searchParams: Promise<{ step?: "login" | "verify" }>;
}
export default async function AuthOwner({ searchParams }: AuthOwnerProps) {
  const { step } = await searchParams;
  return <Login step={step} />;
}
