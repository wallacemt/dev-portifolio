import { Skeleton } from "@/components/ui/skeleton";

function SectionHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div className="max-w-xl w-full">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>
      <Skeleton className="h-5 w-24 shrink-0" />
    </div>
  );
}

function FeaturedProjectsSkeleton() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-12 py-16">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full aspect-[4/3] rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

function SkillsHighlightsSkeleton() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-12 py-16">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className={`h-16 rounded-xl ${i % 3 === 0 ? "sm:col-span-2" : ""}`} />
        ))}
      </div>
    </section>
  );
}

function StatsStripSkeleton() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-12 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </section>
  );
}

function CtaSkeleton() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 md:px-12 py-16 text-center flex flex-col items-center">
      <Skeleton className="h-6 w-80 max-w-full mb-6" />
      <Skeleton className="h-12 w-48 rounded-full" />
    </section>
  );
}

export function LandingExtrasSkeleton() {
  return (
    <div aria-hidden="true">
      <FeaturedProjectsSkeleton />
      <SkillsHighlightsSkeleton />
      <StatsStripSkeleton />
      <CtaSkeleton />
    </div>
  );
}
