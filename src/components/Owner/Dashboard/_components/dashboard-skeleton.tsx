"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header com botões skeleton */}
      <div className="flex items-center gap-2 justify-end px-4 mb-4">
        <Skeleton className="h-10 w-32" /> {/* Botão Atualizar */}
        <Skeleton className="h-10 w-28" /> {/* Link Ver Detalhes */}
      </div>

      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Section Cards Skeleton */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" /> {/* Ícone */}
                    <Skeleton className="h-4 w-24" /> {/* Título */}
                  </div>
                  <Skeleton className="h-8 w-20 mt-2" /> {/* Valor principal */}
                  <Skeleton className="h-6 w-16 mt-1" /> {/* Badge */}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" /> {/* Texto do footer */}
                    <Skeleton className="h-3 w-28" /> {/* Descrição */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Area Skeleton */}
          <div className="px-4 lg:px-6">
            <Card className="@container/card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" /> {/* Título */}
                    <Skeleton className="h-4 w-48" /> {/* Descrição */}
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" /> {/* Toggle 1 */}
                    <Skeleton className="h-8 w-24" /> {/* Toggle 2 */}
                    <Skeleton className="h-8 w-24" /> {/* Toggle 3 */}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {/* Gráfico skeleton */}
                <div className="space-y-4">
                  {/* Área do gráfico */}
                  <Skeleton className="h-[250px] w-full rounded-lg" />

                  {/* Legenda do gráfico */}
                  <div className="flex justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton para o header do site também
export const DashboardHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" /> {/* Título */}
        <Skeleton className="h-4 w-64" /> {/* Descrição */}
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-9 w-24" /> {/* Botão */}
        <Skeleton className="h-9 w-20" /> {/* Botão */}
      </div>
    </div>
  );
};

// Skeleton composto para o dashboard completo
export const FullDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeaderSkeleton />
      <DashboardSkeleton />
    </div>
  );
};
