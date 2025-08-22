"use client";
import { useEffect, useRef, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { postTrackVisitorPageView } from "@/services/analytics";
import { validateTimeSpent, generateSessionId, extractVisitorDataFromClient } from "@/lib/analytics-utils";

interface UseOptimizedAnalyticsOptions {
  enabled?: boolean;
  debounceTime?: number;
  maxTimeSpent?: number;
}

export const useOptimizedAnalytics = (options: UseOptimizedAnalyticsOptions = {}) => {
  const pathname = usePathname();

  const config = useMemo(
    () => ({
      enabled: options.enabled ?? process.env.ANALYTICS_ENABLED === "true",
      debounceTime: options.debounceTime ?? 1000,
      maxTimeSpent: options.maxTimeSpent ?? 86400000,
    }),
    [options]
  );

  const sessionIdRef = useRef<string>("");
  const pageStartTimeRef = useRef<number>(0);
  const lastPageRef = useRef<string>("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTrackedInitialPageRef = useRef<boolean>(false);

  const shouldTrack = useMemo(() => {
    return config.enabled && !pathname.startsWith("/owner");
  }, [config.enabled, pathname]);

  useEffect(() => {
    if (!shouldTrack) return;

    if (!sessionIdRef.current) {
      sessionIdRef.current = Cookies.get("sessionId") || generateSessionId();
      Cookies.set("sessionId", sessionIdRef.current, { expires: 1 }); // 1 dia
    }
  }, [shouldTrack]);

  const calculateTimeSpent = useCallback((startTime: number): number => {
    if (!startTime) return 0;

    const timeSpent = Date.now() - startTime;
    return validateTimeSpent(timeSpent);
  }, []);

  const debouncedTrackPageView = useCallback(
    (page: string, timeSpent?: number) => {
      if (!shouldTrack || !sessionIdRef.current) return;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(async () => {
        try {
          const visitorData = extractVisitorDataFromClient(sessionIdRef.current);

          await postTrackVisitorPageView(
            {
              sessionId: sessionIdRef.current,
              page,
              timeSpent,
            },
            {
              sessionId: sessionIdRef.current,
              userAgent: visitorData.userAgent || "unknown",
              country: visitorData.country || "unknown",
              city: visitorData.city || "unknown",
              device: visitorData.device || "desktop",
              browser: visitorData.browser || "unknown",
              os: visitorData.os || "unknown",
              referrer: visitorData.referrer || "direct",
              landingPage: visitorData.landingPage || window?.location?.href || "unknown",
            }
          );
        } catch (error) {
           if (process.env.NODE_ENV === "development")  console.debug("Analytics error:", error);
        }
      }, config.debounceTime);
    },
    [shouldTrack, config.debounceTime]
  );

  useEffect(() => {
    if (!shouldTrack) return;

    if (lastPageRef.current && lastPageRef.current !== pathname && pageStartTimeRef.current) {
      const timeSpent = calculateTimeSpent(pageStartTimeRef.current);
      if (timeSpent > 0) {
        debouncedTrackPageView(lastPageRef.current, timeSpent);
      }
    }

    lastPageRef.current = pathname;
    pageStartTimeRef.current = Date.now();

    if (!hasTrackedInitialPageRef.current) {
      debouncedTrackPageView(pathname);
      hasTrackedInitialPageRef.current = true;
    } else {
      debouncedTrackPageView(pathname);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [pathname, shouldTrack, debouncedTrackPageView, calculateTimeSpent]);

  useEffect(() => {
    if (!shouldTrack || typeof window === "undefined") return;

    const handleBeforeUnload = () => {
      const timeSpent = calculateTimeSpent(pageStartTimeRef.current);

      if (timeSpent > 0 && sessionIdRef.current) {
        const visitorData = extractVisitorDataFromClient(sessionIdRef.current);

        const payload = JSON.stringify({
          pageView: {
            sessionId: sessionIdRef.current,
            page: pathname,
            timeSpent,
            isExit: true,
          },
          visitor: {
            sessionId: sessionIdRef.current,
            userAgent: visitorData.userAgent || "unknown",
            country: visitorData.country || "unknown",
            city: visitorData.city || "unknown",
            device: visitorData.device || "desktop",
            browser: visitorData.browser || "unknown",
            os: visitorData.os || "unknown",
            referrer: visitorData.referrer || "direct",
            landingPage: visitorData.landingPage || window?.location?.href || "unknown",
          },
        });

        const apiUrl = process.env.API_URL || "";
        const ownerId = process.env.OWNER_ID || "";

        navigator.sendBeacon(`${apiUrl}/analytics/${ownerId}/track-pageview`, payload);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleBeforeUnload();
      } else if (document.visibilityState === "visible") {
        pageStartTimeRef.current = Date.now();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldTrack, pathname, calculateTimeSpent]);

  const trackEvent = useCallback(() => {
    if (!shouldTrack) return;
  }, [shouldTrack]);

  return {
    sessionId: sessionIdRef.current,
    trackEvent,
    isTracking: shouldTrack,
  };
};

export const OptimizedAnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useOptimizedAnalytics();
  return <>{children}</>;
};
