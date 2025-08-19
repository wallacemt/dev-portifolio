import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OwnerHome() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (token) {
    redirect("/owner/dashboard");
  } else {
    redirect("/owner/auth");
  }
}
