import { DashboardContent } from "./_components/dashboard-content";
import { analyticsSummary, analyticsRealTime } from "@/services/analytics";
import { AnalyticsSummaryResponse, AnalyticsRealTimeResponse } from "@/types/analytics";
import { simulateDelay } from "@/utilis/simulate-dalay";

interface DashboardData {
  summary: AnalyticsSummaryResponse | null;
  realTime: AnalyticsRealTimeResponse | null;
  error: string | null;
}

export async function Dashboard() {
  let data: DashboardData = {
    summary: null,
    realTime: null,
    error: null,
  };
  await simulateDelay(40000);
  try {
    const [summaryData, realTimeData] = await Promise.all([analyticsSummary(), analyticsRealTime()]);

    data = {
      summary: summaryData,
      realTime: realTimeData,
      error: null,
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    data.error = error instanceof Error ? error.message : "Erro ao carregar dados";
  }

  return (
    <>
      <DashboardContent initialData={data} />
    </>
  );
}
