import { Login } from "@/components/Owner/Login/Login";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Owner Authentication",
  description: "Owner authentication page for login and verification steps.",
};
interface AuthOwnerProps {
  searchParams: Promise<{ step?: "login" | "verify" }>;
}
export default async function AuthOwner({ searchParams }: AuthOwnerProps) {
 
  const { step } = await searchParams;
  return <Login step={step} />;
}
