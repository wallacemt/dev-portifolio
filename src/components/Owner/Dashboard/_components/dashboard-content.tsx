"use client";
import { useState, useEffect } from "react";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { SectionCards } from "@/components/ui/section-cards";
import { SiteHeader } from "@/components/ui/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsSummaryResponse, AnalyticsRealTimeResponse } from "@/types/analytics";
import { analyticsSummary, analyticsRealTime } from "@/services/analytics";
import { useAuthDebug } from "@/hooks/use-auth-debug";

interface DashboardData {
  summary: AnalyticsSummaryResponse | null;
  realTime: AnalyticsRealTimeResponse | null;
  error: string | null;
}

interface DashboardContentProps {
  initialData: DashboardData;
}

export const DashboardContent = ({ initialData }: DashboardContentProps) => {
  const [data, setData] = useState<DashboardData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
 
  const refreshData = async () => {
    try {
      setIsLoading(true);
      const [summaryData, realTimeData] = await Promise.all([analyticsSummary(), analyticsRealTime()]);

      setData({
        summary: summaryData,
        realTime: realTimeData,
        error: null,
      });
    } catch (error) {
      setData((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Erro ao atualizar dados",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards data={data} isLoading={isLoading} onRefresh={refreshData} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive data={data} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
