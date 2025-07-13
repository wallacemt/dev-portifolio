"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

export default function TopLoadingBar() {
  const pathname = usePathname();
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    NProgress.start();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      NProgress.done();
    }, 500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  return null;
}
