import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2 justify-end px-4">
        <Skeleton />

        <Skeleton />
      </div>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Skeleton />
          <div className="px-4 lg:px-6">
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
