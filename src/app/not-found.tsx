import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get("referer");
  const url = referer ? new URL(referer).pathname : "URL not available";
  return (
    <div className={`h-screen bg-no-repeat bg-background flex flex-col items-center justify-center lg:mx-auto`}>
      <Image
        src={"/images/404.svg"}
        alt="404 Ilustration"
        width={32}
        height={32}
        className="w-full lg:w-1/4 animate-float"
      />

      <div className="sm:mt-0 mt-6 text-center w-full flex flex-col gap-2">
        <h1 className="font-bold font-principal text-amber-500 lg:w-[30%] lg:mx-auto " style={{ fontSize: "1.7rem" }}>
          404 - Pagina não encontrada!
        </h1>
        <p className="text-lg font-secundaria font-semibold text-white mt-4">
          A pagina <span className="bg-black text-white font-bold rounded-lg p-1">{url}</span> não foi encontrada.
        </p>
        <Link
          href={url.startsWith("/owner") ? "/owner" : "/"}
          className="bg-Destaque/80 hover:bg-Destaque font-bold py-2 px-4 rounded-md mt-8 w-80 mx-auto"
          style={{ color: "white" }}
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
