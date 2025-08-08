"use client";
import { useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import { AnalyticsConfig, TrackVisitorPage, TrackVisitorRequest } from "@/types/analytics";
import { postTrackVisitor, postTrackVisitorPageView } from "@/services/analytics";
import { baseURL, ownerId } from "@/lib/axios";
import { usePathname } from "next/navigation";

export const usePortfolioAnalytics = () => {
  const pathName = usePathname();
  const config: AnalyticsConfig = {
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  };
  const sessionIdRef = useRef<string>("");
  const pageStartTimeRef = useRef<number>(0);
  const lastPageRef = useRef<string>("");
  const generateSessionId = useCallback(() => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    Cookies.set("sessionId", sessionId);
    return sessionId;
  }, []);

  const getDeviceType = useCallback((): "desktop" | "mobile" | "tablet" => {
    if (typeof window === "undefined") return "desktop";

    const userAgent = navigator.userAgent;
    if (/iPad/i.test(userAgent)) return "tablet";
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) return "mobile";
    return "desktop";
  }, []);

  const getBorrowserInfo = useCallback((): string => {
    if (typeof window === "undefined") return "unknown";
    const userAgent = navigator.userAgent;
    let browser = "unknown";
    if (userAgent.includes("Chrome")) {
      browser = "Chrome";
    } else if (userAgent.includes("Firefox")) {
      browser = "Firefox";
    } else if (userAgent.includes("Safari")) {
      browser = "Safari";
    }
    return browser;
  }, []);

  const getGeoLocation = useCallback(async () => {
    if (typeof window === "undefined") return { country: "unknown", city: "unknown" };
    try {
      const response = await fetch("https://ipapi.co/json");
      const data = await response.json();
      return { country: data.country_name || "unknown", city: data.city || "unknown" };
    } catch (error) {
      console.error("❌ Error fetching geolocation:", error);
      return { country: "unknown", city: "unknown" };
    }
  }, []);

  const trackVisitor = useCallback(async () => {
    if (!config.enabled || typeof window === "undefined") return;
    try {
      //@ts-expect-error navigator.userAgentData
      const platform = navigator.userAgentData ? navigator.userAgentData.platform : "unknown";
      const { country, city } = await getGeoLocation();
      const browser = getBorrowserInfo();
      const device = getDeviceType();
      const trackingData: TrackVisitorRequest = {
        sessionId: sessionIdRef.current!,
        userAgent: navigator.userAgent,
        device,
        referrer: document.referrer || "direct",
        landingPage: window.location.href,
        os: platform,
        city,
        country,
        browser,
      };
      await postTrackVisitor(trackingData);
    } catch (error) {
      console.error("❌ Error tracking visitor:", error);
    }
  }, [config, getDeviceType]);

  const trackPageView = useCallback(
    async (page?: string) => {
      if (!config.enabled || typeof window === "undefined") return;
      const currentPage = page || pathName;
      const timeSpent = pageStartTimeRef.current ? Date.now() - pageStartTimeRef.current : 0;

      try {
        const pageViewData: TrackVisitorPage = {
          sessionId: sessionIdRef.current!,
          page: currentPage,
          timeSpent: lastPageRef.current === currentPage ? undefined : timeSpent,
        };

        await postTrackVisitorPageView(pageViewData);
      } catch (error) {
        console.error("❌ Error tracking page view:", error);
      }
    },
    [config, pathName]
  );
  useEffect(() => {
    if (!config.enabled) return;
    if (!sessionIdRef.current) {
      sessionIdRef.current = Cookies.get("sessionId") || generateSessionId();
      pageStartTimeRef.current = Date.now();
      trackVisitor();
    }
    trackPageView();
  }, [config.enabled, trackVisitor, trackPageView]);

  useEffect(() => {
    if (!config.enabled || typeof window === "undefined") return;

    const handleBeforeUnload = () => {
      const timeSpent = pageStartTimeRef.current ? Date.now() - pageStartTimeRef.current : 0;

      navigator.sendBeacon(
        `${baseURL}/analytics/${ownerId}/track-pageview`,
        JSON.stringify({
          sessionId: sessionIdRef.current,
          page: pathName,
          timeSpent,
          isExit: true,
        })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [config, pathName]);

  return {
    trackVisitor,
    trackPageView,
    sessionId: sessionIdRef.current,
  };
};

export const AnalyticsProvider = ({ children }: { children: React.ReactNode; }) => {
  usePortfolioAnalytics();
  return <>{children}</>;
};
