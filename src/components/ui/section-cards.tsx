import { IconTrendingDown, IconTrendingUp, IconActivity, IconRefresh } from "@tabler/icons-react";
import { Users, Eye, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsSummaryResponse, AnalyticsRealTimeResponse } from "@/types/analytics";

interface DashboardData {
  summary: AnalyticsSummaryResponse | null;
  realTime: AnalyticsRealTimeResponse | null;
  error: string | null;
}

interface SectionCardsProps {
  data: DashboardData;
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}

export function SectionCards({ data, isLoading, onRefresh }: SectionCardsProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  if (data.error) {
    return (
      <div className="px-4 lg:px-6">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Erro ao carregar dados</CardTitle>
            <CardDescription className="text-red-600">{data.error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={onRefresh} disabled={isLoading}>
              <IconRefresh className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-gradient-to-t from-roxo100/15 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Visitantes Hoje
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : formatNumber(data.summary?.today.visitors ?? 0)}
          </CardTitle>
          <CardAction>
            {isLoading ? (
              <Skeleton className="h-6 w-16" />
            ) : data.summary ? (
              <Badge variant="outline" className={getChangeColor(data.summary.today.change)}>
                {data.summary.today.change >= 0 ? (
                  <IconTrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <IconTrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(data.summary.today.change)}%
              </Badge>
            ) : null}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : data.summary && data.summary.today.change >= 0 ? (
              <>
                Crescimento hoje <IconTrendingUp className="size-4" />
              </>
            ) : (
              <>
                Queda hoje <IconTrendingDown className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">Comparado com ontem</div>
        </CardFooter>
      </Card>

      {/* Visitantes Esta Semana */}
      <Card className="@container/card bg-gradient-to-t from-roxo100/25 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Esta Semana
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : formatNumber(data.summary?.week.visitors ?? 0)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <>
                Acumulado semanal <TrendingUp className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">Total de visitantes únicos</div>
        </CardFooter>
      </Card>

      {/* Visitantes Este Mês */}
      <Card className="@container/card bg-gradient-to-t from-roxo100/35 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Este Mês
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? <Skeleton className="h-8 w-20" /> : formatNumber(data.summary?.month.visitors ?? 0)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <>
                Tendência mensal <TrendingUp className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">Crescimento consistente</div>
        </CardFooter>
      </Card>

      {/* Visitantes Ativos */}
      <Card className="@container/card bg-gradient-to-t from-roxo100/45 to-card shadow-xs">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-sm">
            <IconActivity className="w-4 h-4" />
            Ativos Agora
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-600">
            {isLoading ? <Skeleton className="h-8 w-20" /> : formatNumber(data.realTime?.activeVisitors ?? 0)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <>
                Navegando agora <IconActivity className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">Usuários online simultaneamente</div>
        </CardFooter>
      </Card>
    </div>
  );
}
