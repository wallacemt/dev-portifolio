"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2 justify-end px-4 mb-4">
        <Skeleton className="h-10 w-32 bg-roxo100" />
        <Skeleton className="h-10 w-28 bg-roxo300" />
      </div>

      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="@container/card bg-gradient-to-t from-roxo100/15 to-card shadow-xs">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20 mt-2" />
                  <Skeleton className="h-6 w-16 mt-1" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="px-4 lg:px-6">
            <Card className="@container/card bg-roxo500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <div className="space-y-4">
                  <Skeleton className="h-[250px] w-full rounded-lg bg-roxo300" />
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

export const DashboardHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" /> {/* Título */}
        <Skeleton className="h-4 w-64" /> {/* Descrição */}
      </div>
    </div>
  );
};

export const FullDashboardSkeleton = () => {
  return (
    <div className="min-h-screen ">
      <DashboardHeaderSkeleton />
      <DashboardSkeleton />
    </div>
  );
};
