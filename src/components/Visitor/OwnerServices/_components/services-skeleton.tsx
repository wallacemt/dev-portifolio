"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ServiceCardSkeleton() {
  return (
    <Card className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Icon skeleton */}
        <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mx-auto mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* Technologies skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>

        {/* Bottom info skeleton */}
        <div className="mt-auto space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Connection points */}
        <div className="absolute top-1/2 -left-2 w-4 h-4">
          <Skeleton className="w-full h-full rounded-full" />
        </div>
        <div className="absolute top-1/2 -right-2 w-4 h-4">
          <Skeleton className="w-full h-full rounded-full" />
        </div>
      </div>
    </Card>
  );
}

export function ServicesSkeleton() {
  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="transform transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
