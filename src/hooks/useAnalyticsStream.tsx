"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { cookieUtils } from "@/lib/cookies";
import { getBaseURL } from "@/lib/axios";
import { analyticsRealTime } from "@/services/analytics";
import { AnalyticsStreamEvent } from "@/types/analytics";

export type StreamStatus = "connecting" | "live" | "offline";

const FALLBACK_POLL_INTERVAL_MS = 15000;

export const useAnalyticsStream = () => {
  const [data, setData] = useState<AnalyticsStreamEvent | null>(null);
  const [status, setStatus] = useState<StreamStatus>("connecting");
  const statusRef = useRef<StreamStatus>("connecting");

  const setStatusSynced = useCallback((next: StreamStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const realTime = await analyticsRealTime();
      setData((prev) => ({
        online: prev?.online ?? 0,
        ...realTime,
      }));
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.debug("Error refreshing real-time analytics:", error);
    }
  }, []);

  useEffect(() => {
    const token = cookieUtils.getAuthToken();
    if (!token) {
      setStatusSynced("offline");
      return;
    }

    setStatusSynced("connecting");

    const url = `${getBaseURL()}/analytics/stream?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);

    es.onopen = () => setStatusSynced("live");

    es.addEventListener("analytics", (event: MessageEvent<string>) => {
      setData(JSON.parse(event.data));
    });

    es.onerror = () => {
      setStatusSynced(es.readyState === EventSource.CLOSED ? "offline" : "connecting");
    };

    const pollTimer = setInterval(() => {
      if (statusRef.current !== "live") refresh();
    }, FALLBACK_POLL_INTERVAL_MS);

    return () => {
      es.close();
      clearInterval(pollTimer);
    };
  }, [refresh, setStatusSynced]);

  return { data, status, refresh };
};
