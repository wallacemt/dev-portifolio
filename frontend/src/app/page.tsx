import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4 flex-col">
      <h1 className="text-2xl font-bold"> Portifolio Rodando 🚀</h1>
      <Link href={"https://github.com/shadcn/ui"} target="_blank">
        <Button>Shadcn</Button>
      </Link>
    </main>
  );
}
