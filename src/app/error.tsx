"use client";


export default function WatchError({ error }: { error: Error; }) {
  const isApiError = error.message === "API_ERROR";

  return (
     
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <img
        src={"/images/503.svg"}
        alt="Ilustração de erro 503 - Servidor em manutenção"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
        className="w-full lg:w-1/5 animate-float"
      />

      <div className="sm:mt-0 mt-6 text-center w-full flex flex-col gap-2">
        <h1 className="font-bold font-principal text-amber-500 lg:w-[30%] lg:mx-auto ">
          {isApiError ? (
        <>
          <h1 className="text-2xl font-bold">Erro no servidor</h1>
          <p className="mt-2">Não foi possível comunicar com o servidor.</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Algo deu errado</h1>
        </>
      )}
        </h1>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-amber-500/60 hover:bg-amber-600 text-white font-bold rounded transition w-fit"
      >
        Tentar novamente
      </button>
    </div>
  );
}
