import { Abbout } from "@/components/Visitor/Abbout";
import { getOwner } from "@/services/ownerApi";

export const revalidate = 60;
export default async function HomePage({ params }: { params: Promise<{ language: string }> }) {
  try {
    const { language } = await params;
    const ownerRes = await getOwner(language);
    return <Abbout owner={ownerRes} language={language} />;
  } catch (e) {
    console.error(e);
    throw new Error("API_ERROR");
  }
}
