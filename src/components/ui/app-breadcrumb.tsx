"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export const AppBreadcrumb = () => {
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);

  return (
    <Breadcrumb className="w-full flex md:hidden items-center justify-center mx-auto px-4 md:px-6 py-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">watch</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map(
          (segment, index) =>
            segment !== "watch" && (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index < segments.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link href={`/${segments.slice(0, index + 1).join("/")}`}>{segment}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
