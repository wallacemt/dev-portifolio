"use client";

import { useEffect, useState } from "react";
import { cookieUtils } from "@/lib/cookies";

export function useAuthDebug() {
  const [debugInfo, setDebugInfo] = useState({
    hasToken: false,
    tokenValue: null as string | null,
    context: "unknown",
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = cookieUtils.getAuthToken();
      const context = typeof window !== "undefined" ? "client" : "server";

      setDebugInfo({
        hasToken: !!token,
        tokenValue: token ? token.substring(0, 20) + "..." : null, // Apenas parte do token por segurança
        context,
        timestamp: new Date().toISOString(),
      });

      console.group("🔍 [Auth Debug]");
      console.log("Contexto:", context);
      console.log("Token existe:", !!token);
      console.log("Token (parcial):", token ? token.substring(0, 20) + "..." : "Nenhum");
      console.log("Timestamp:", new Date().toISOString());
      console.groupEnd();
    };

    checkAuth();

    // Verifica a cada 5 segundos se o token mudou
    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshAuth = () => {
    const token = cookieUtils.getAuthToken();
    setDebugInfo((prev) => ({
      ...prev,
      hasToken: !!token,
      tokenValue: token ? token.substring(0, 20) + "..." : null,
      timestamp: new Date().toISOString(),
    }));
  };

  return {
    debugInfo,
    refreshAuth,
  };
}
