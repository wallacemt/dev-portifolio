"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";

export function ProjectTimelineSkeleton() {
  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8w">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-60 mx-auto mb-4" />
        <Skeleton className="h-6 w-70 mx-auto" />
      </div>
      <div className="flex md:flex-row flex-col max-w-xl mx-auto gap-4 mb-6">
        <Skeleton className="w-full md:w-[150px] h-8 rounded-md" />
        <Skeleton className="w-full md:w-[150px] h-8 rounded-md" />
      </div>
      <ol className="flex flex-col items-start" style={{ listStyle: "none" }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <li className="mx-auto " key={i}>
            <div className="mb-16 max-w-full md:ms-2 relative mx-auto ">
              <div className="flex flex-col  gap-2 md:max-w-[90%] mx-auto">
                <div className="flex gap-2 ">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="text-sm w-24 h-4 rounded-md" />
                </div>

                <div className="flex md:flex-row flex-col mx-auto">
                  <Skeleton className="md:w-[350px] h-[13.5rem] max-w-[85%] rounded-tl-md rounded-bl-md bg-roxo500 relative">
                    <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16" />
                  </Skeleton>
                  <div className="flex flex-col justify-between border-neutral-800 rounded-lg p-6 bg-roxo600 shadow-md transition-all hover:shadow-[0_0_5px_rgba(0,229,255,0.2)] max-w-[85%]">
                    <Skeleton className="text-xl font-semibold w-48 h-6 bg-roxo200 rounded-md" />
                    <Skeleton className="text-sm mt-2 mb-4 w-full h-4 bg-gray-200 rounded-md" />
                    <div className="flex overflow-x-auto snap-x mb-4">
                      <div className="overflow-hidden w-full">
                        <div className="flex space-x-4">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="w-14 h-14 rounded-full" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Skeleton className="w-28 h-8 rounded-md bg-[#0f0526]" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ProjectCardSkeleton() {
  return (
    <ol className="flex flex-col items-start" style={{ listStyle: "none" }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <li className="mx-auto " key={i}>
          <div className="mb-16 max-w-full md:ms-2 relative mx-auto ">
            <div className="flex flex-col  gap-2 md:max-w-[90%] mx-auto">
              <div className="flex gap-2 ">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="text-sm w-24 h-4 rounded-md" />
              </div>

              <div className="flex md:flex-row flex-col mx-auto">
                <Skeleton className="md:w-[350px] h-[13.5rem] max-w-[85%] rounded-tl-md rounded-bl-md bg-roxo500 relative">
                  <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16" />
                </Skeleton>
                <div className="flex flex-col justify-between border-neutral-800 rounded-lg p-6 bg-roxo600 shadow-md transition-all hover:shadow-[0_0_5px_rgba(0,229,255,0.2)] max-w-[85%]">
                  <Skeleton className="text-xl font-semibold w-48 h-6 bg-roxo200 rounded-md" />
                  <Skeleton className="text-sm mt-2 mb-4 w-full h-4 bg-gray-200 rounded-md" />
                  <div className="flex overflow-x-auto snap-x mb-4">
                    <div className="overflow-hidden w-full">
                      <div className="flex space-x-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Skeleton key={i} className="w-14 h-14 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Skeleton className="w-28 h-8 rounded-md bg-[#0f0526]" />
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
