import { Skeleton } from "@/components/ui/skeleton";

export function SkillsContentSkeleton() {
  return (
    <section className="w-full  md:min-w-screen mx-auto px-4 md:px-12 p-2">
      <div className="text-center mb-16 ">
        <Skeleton className="h-12 w-60 mx-auto mb-4" />
        <Skeleton className="h-6 w-70 mx-auto" />
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="hidden md:flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>
        <div className="md:hidden w-full">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center p-4 rounded-lg bg-card">
            <Skeleton className="w-12 h-12 rounded mb-2" />
            <Skeleton className="h-4 w-16 mb-2" />
            <div className="flex gap-1">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
