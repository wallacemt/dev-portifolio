"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { AnalyticsResponse } from "@/types/analytics";

interface AnalyticsTrendChartProps {
  dayliStats: AnalyticsResponse["dayliStats"] | undefined;
  isLoading: boolean;
}

const chartConfig = {
  totalVisitors: {
    label: "Visitantes",
    color: "hsl(var(--primary))",
  },
  pageViews: {
    label: "Visualizações",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AnalyticsTrendChart({ dayliStats, isLoading }: AnalyticsTrendChartProps) {
  if (isLoading) {
    return (
      <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
        <CardHeader>
          <CardTitle>Tendência do Período</CardTitle>
          <CardDescription>Visitantes e visualizações por dia</CardDescription>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!dayliStats?.length) {
    return (
      <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
        <CardHeader>
          <CardTitle>Tendência do Período</CardTitle>
          <CardDescription>Visitantes e visualizações por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">Nenhum dado disponível para o gráfico</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
      <CardHeader>
        <CardTitle>Tendência do Período</CardTitle>
        <CardDescription>Visitantes e visualizações por dia</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={dayliStats}>
            <defs>
              <linearGradient id="fillTotalVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-totalVisitors)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-totalVisitors)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-pageViews)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-pageViews)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("pt-BR", { month: "short", day: "numeric" })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("pt-BR", { month: "long", day: "numeric", year: "numeric" })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="totalVisitors"
              type="natural"
              fill="url(#fillTotalVisitors)"
              stroke="var(--color-totalVisitors)"
              stackId="a"
            />
            <Area
              dataKey="pageViews"
              type="natural"
              fill="url(#fillPageViews)"
              stroke="var(--color-pageViews)"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
