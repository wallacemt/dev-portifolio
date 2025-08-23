import { Skeleton } from "@/components/ui/skeleton";

export function SkillsContentSkeleton() {
  return (
    <section className="w-full  md:min-w-screen mx-auto px-4 md:px-12 p-2">
      <div className="text-center mb-16 ">
        <Skeleton className="h-12 w-60 mx-auto mb-4" />
        <Skeleton className="h-6 w-70 mx-auto" />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4 mb-6">
        <div className="hidden md:flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>
        <div className="md:hidden w-full">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto max-w-6xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center max-w-4xl p-4 rounded-lg bg-background animate-pulse">
            <div className="w-full h-24 bg-roxo300/40 rounded-lg mb-4"></div>
            <div className="w-3/4 h-4 bg-roxo300/40 rounded mb-2"></div>
            <div className="w-1/2 h-3 bg-roxo300/40 rounded mb-4"></div>
            <div className="flex flex-wrap gap-2 w-full">
              <div className="w-1/3 h-6 bg-roxo300/40 rounded"></div>
              <div className="w-1/4 h-6 bg-roxo300/40 rounded"></div>
              <div className="w-1/2 h-6 bg-roxo300/40 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
