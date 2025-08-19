import { redirect } from "next/navigation";
import Cookies from "js-cookie";
export default function Home() {
  const lang = Cookies.get("preferredLanguage") || "pt";
  redirect(`/watch/${lang}`);
}
