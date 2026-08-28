"use client";
import { useState } from "react";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { SectionCards } from "@/components/ui/section-cards";
import { SiteHeader } from "@/components/ui/site-header";
import { LiveBadge } from "@/components/ui/live-badge";
import { AnalyticsSummaryResponse, AnalyticsRealTimeResponse } from "@/types/analytics";
import { analyticsSummary } from "@/services/analytics";
import { useAnalyticsStream } from "@/hooks/useAnalyticsStream";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight, RefreshCcw } from "lucide-react";

interface DashboardData {
  summary: AnalyticsSummaryResponse | null;
  realTime: AnalyticsRealTimeResponse | null;
  error: string | null;
}

interface DashboardContentProps {
  initialData: DashboardData;
}

export const DashboardContent = ({ initialData }: DashboardContentProps) => {
  const [summary, setSummary] = useState<AnalyticsSummaryResponse | null>(initialData.summary);
  const [error, setError] = useState<string | null>(initialData.error);
  const [isLoading, setIsLoading] = useState(false);
  const { data: streamData, status, refresh } = useAnalyticsStream();

  const realTime: AnalyticsRealTimeResponse | null = streamData ?? initialData.realTime;

  const refreshData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([analyticsSummary().then(setSummary), refresh()]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar dados");
    } finally {
      setIsLoading(false);
    }
  };

  const data = { summary, realTime, error };

  return (
    <>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-4 justify-end px-4">
          <LiveBadge status={status} />

          {status !== "live" && (
            <Button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center hover:bg-roxo500 text-white gap-2 bg-roxo300"
            >
              {isLoading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
              {isLoading ? "Atualizando..." : "Atualizar Dados"}
            </Button>
          )}

          <Link
            href="/owner/dashboard/analyze"
            className="flex items-center gap-2 text-sm font-medium bg-roxo100 p-2 rounded-lg text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 hover:bg-roxo300"
          >
            Ver Detalhes <MoveRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards data={data} isLoading={isLoading} onRefresh={refreshData} streamStatus={status} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive data={data} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
