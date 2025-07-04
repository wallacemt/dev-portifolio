import Silk from "@/blocks/Backgrounds/Silk/Silk";
import { Header } from "@/components/Visitor/Header/Header";
interface Params {
  params: Promise<{ language: string }>;
}

export default async function HomePage({ params }: Params) {
  const { language } = await params;
  return (
    <main className="">
      <div className="fixed inset-0 z-[-1]">
        <Silk speed={6} scale={1} color="#2F0559" noiseIntensity={1.5} rotation={0} />
      </div>
      <Header />
      <p className="text-2xl text-Destaque">AA + {language}</p>
    </main>
  );
}
