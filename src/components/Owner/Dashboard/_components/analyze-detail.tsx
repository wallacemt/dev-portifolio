"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  Users,
  RefreshCw,
  ArrowLeft,
  Download,
  Calendar as CalendarIcon,
} from "lucide-react";
import { analyticsDashboard, analyticsUpdateDaily } from "@/services/analytics";
import { AnalyticsResponse } from "@/types/analytics";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/ui/site-header";
import { type DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { AnalyzeDetailSkeleton } from "./analyze-detail-skeleton";

export function AnalyzeDetail() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const loadAnalyticsData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!dateRange?.from || !dateRange?.to) {
        setError("Selecione um período válido para análise");
        return;
      }

      const analyticsData = await analyticsDashboard(dateRange.from, dateRange.to);
      setData(analyticsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
      console.error("Error loading analytics data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  const updateDailyAnalytics = async () => {
    try {
      setIsUpdating(true);
      const today = new Date().toISOString().split("T")[0];
      await analyticsUpdateDaily(today);
      await loadAnalyticsData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar dados diários");
      console.error("Error updating daily analytics:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num === 0) return num;
  
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
  };

  if (isLoading && !data) {
    return <AnalyzeDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Erro</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={loadAnalyticsData}>Tentar novamente</Button>
              <Link href="/owner/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-6 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center flex-col space-x-4">
            <SiteHeader title="Análise Detalhada" icon={<CalendarIcon className="w-5 h-5" />} />
            <p className="text-white pl-8 hidden md:block">Métricas completas de analytics do portfólio</p>
          </div>
          <div className="flex items-center flex-col md:flex-row gap-2 space-x-2">
            <Button onClick={updateDailyAnalytics} disabled={isUpdating} variant="outline" size="sm">
              <RefreshCw className={cn("w-4 h-4 mr-2", isUpdating && "animate-spin")} />
              {isUpdating ? "Atualizando..." : "Atualizar Dados"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-roxo500  w-fit flex justify-center mx-auto">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Período de Análise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex  flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <DateRangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    placeholder="Selecione o período para análise"
                    maxDays={365}
                    minDate={new Date(2020, 0, 1)}
                    maxDate={new Date()}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => setDateRange({ from: addDays(new Date(), -7), to: new Date() })}>
                      7 dias
                    </Button>
                    <Button onClick={() => setDateRange({ from: addDays(new Date(), -30), to: new Date() })}>
                      30 dias
                    </Button>
                    <Button onClick={() => setDateRange({ from: addDays(new Date(), -90), to: new Date() })}>
                      90 dias
                    </Button>
                  </div>
                </div>
                {dateRange?.from && dateRange?.to && (
                  <div className="text-sm text-muted-foreground">
                    Período selecionado:{" "}
                    {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} dias
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                Total de Visitantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{formatNumber(data?.overview.totalVisitors ?? 0)}</div>
              )}
            </CardContent>
          </Card>

          <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Eye className="w-4 h-4 mr-2 text-green-500" />
                Visitantes Únicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{formatNumber(data?.overview.uniqueVisitors ?? 0)}</div>
              )}
            </CardContent>
          </Card>

          <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-purple-500" />
                Visualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{formatNumber(data?.overview.pageViews ?? 0)}</div>
              )}
            </CardContent>
          </Card>

          <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                Tempo Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{formatDuration(data?.overview.avgTimeSpent ?? 0)}</div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="@container/card bg-gradient-to-b from-roxo500 to-card shadow-xs">
            <CardHeader>
              <CardTitle>Dispositivos</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : data ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-roxo100/40 rounded flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Desktop</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatNumber(data.deviceBreakdown.desktop)}</div>
                      <div className="text-sm text-muted-foreground">
                        {calculatePercentage(
                          data.deviceBreakdown.desktop,
                          data.deviceBreakdown.desktop + data.deviceBreakdown.mobile + data.deviceBreakdown.tablet
                        )}
                        %
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-roxo100/40 rounded flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Mobile</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatNumber(data.deviceBreakdown.mobile)}</div>
                      <div className="text-sm text-muted-foreground">
                        {calculatePercentage(
                          data.deviceBreakdown.mobile,
                          data.deviceBreakdown.desktop + data.deviceBreakdown.mobile + data.deviceBreakdown.tablet
                        )}
                        %
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-roxo100/10 rounded flex items-center justify-center">
                        <Tablet className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Tablet</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatNumber(data.deviceBreakdown.tablet)}</div>
                      <div className="text-sm text-muted-foreground">
                        {calculatePercentage(
                          data.deviceBreakdown.tablet,
                          data.deviceBreakdown.desktop + data.deviceBreakdown.mobile + data.deviceBreakdown.tablet
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">Nenhum dado disponível</p>
              )}
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card className="@container/card bg-gradient-to-b from-roxo500 to-card shadow-xs">
            <CardHeader>
              <CardTitle>Páginas Mais Visitadas</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              ) : data?.topPages.length ? (
                <div className="space-y-3">
                  {data.topPages.slice(0, 5).map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{page.page}</div>
                      </div>
                      <Badge variant="secondary">{formatNumber(page.views)}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">Nenhuma página encontrada</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Países
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              ) : data?.topCountries.length ? (
                <div className="space-y-3">
                  {data.topCountries.slice(0, 5).map((country, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="text-sm font-medium">{country.country}</div>
                      <Badge variant="outline">{formatNumber(country.visitors)}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">Nenhum país encontrado</p>
              )}
            </CardContent>
          </Card>

          <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader>
              <CardTitle>Navegador Principal</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ) : data?.topBrowsers ? (
                data.topBrowsers.map((browser) => (
                  <div className="flex justify-between items-center" key={browser.browser}>
                    <div className="text-lg font-medium">{browser.browser}</div>
                    <Badge variant="outline" className="text-lg">
                      {formatNumber(browser.visitors)}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">Nenhum navegador encontrado</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader>
              <CardTitle>Taxa de Rejeição</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ) : data ? (
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold flex items-center">
                    {data.overview.bounceRate.toFixed(1)}%
                    {data.overview.bounceRate < 50 ? (
                      <TrendingDown className="w-5 h-5 ml-2 text-green-500" />
                    ) : (
                      <TrendingUp className="w-5 h-5 ml-2 text-red-500" />
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    {data.overview.bounceRate < 50
                      ? "Excelente retenção de visitantes"
                      : "Taxa alta - considere melhorar a experiência"}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhum dado disponível</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
