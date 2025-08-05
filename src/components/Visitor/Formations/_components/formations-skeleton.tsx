"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function FormationCardSkeleton() {
  return (
    <div className="relative flex items-center gap-6 mb-8">
      <div className="flex flex-col items-center">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="w-0.5 h-24 mt-2" />
      </div>
      <Card className="flex-1 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex-shrink-0">
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}
export const FormationsSkeleton = () => {
  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10" />
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <FormationCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
