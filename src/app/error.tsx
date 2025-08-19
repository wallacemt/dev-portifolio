"use client";

import Image from "next/image";

export default function WatchError({ error }: { error: Error }) {
  const isApiError = error.message === "API_ERROR";
  console.error("Error occurred:", error);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      <Image
        src={"/images/503.svg"}
        width={32}
        height={32}
        alt="Ilustração de erro 503 - Servidor em manutenção"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
        className="w-full lg:w-1/5 animate-float"
      />

      <div className="sm:mt-0 mt-6 text-center w-full flex flex-col gap-2">
        <h1 className="font-bold font-principal text-amber-500 w-[30%] h-30 mb-4 overflow-y-auto p-2 lg:mx-auto ">
          {isApiError ? (
            <>
              <h1 className="text-2xl font-bold">Erro no servidor</h1>
              <p className=" mt-2 text-sm truncate text-red-600">Não foi possível comunicar com o servidor</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">Algo deu errado</h1>
              {error.message && <p className="mt-2 text-sm  text-red-900 ">{error.message}</p>}
            </>
          )}
        </h1>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 cursor-pointer bg-amber-500/60 hover:bg-amber-600 text-white font-bold rounded transition w-fit"
      >
        Tentar novamente
      </button>
    </div>
  );
}
