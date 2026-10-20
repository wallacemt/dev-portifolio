"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { analyticsRealTime } from "@/services/analytics";
import { AnalyticsStreamEvent } from "@/types/analytics";

export type StreamStatus = "connecting" | "live" | "offline";

const POLL_INTERVAL_MS = 15000;

export const useAnalyticsStream = () => {
  const [data, setData] = useState<AnalyticsStreamEvent | null>(null);
  const [status, setStatus] = useState<StreamStatus>("connecting");
  const pollInFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (pollInFlight.current) return;

    pollInFlight.current = true;
    try {
      setData(await analyticsRealTime());
      setStatus("live");
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.debug("Error refreshing real-time analytics:", error);
      setStatus("offline");
    } finally {
      pollInFlight.current = false;
    }
  }, []);

  useEffect(() => {
    let pollTimer: ReturnType<typeof setInterval> | undefined;

    const stopPolling = () => {
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = undefined;
    };

    const startPolling = () => {
      if (document.visibilityState !== "visible") return;
      void refresh();
      pollTimer = setInterval(() => void refresh(), POLL_INTERVAL_MS);
    };

    const handleVisibilityChange = () => {
      stopPolling();
      if (document.visibilityState === "visible") startPolling();
    };

    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refresh]);

  return { data, status, refresh };
};
