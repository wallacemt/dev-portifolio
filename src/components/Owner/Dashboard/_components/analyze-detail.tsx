"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function AnalyzeDetail() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 dias atrás
    to: new Date(),
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const analyticsData = await analyticsDashboard(dateRange.to, dateRange.from);
      setData(analyticsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
      console.error("Error loading analytics data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDailyAnalytics = async () => {
    try {
      setIsUpdating(true);
      const today = new Date().toISOString().split("T")[0];
      await analyticsUpdateDaily(today);
      await loadAnalyticsData(); // Recarregar dados após atualização
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar dados diários");
      console.error("Error updating daily analytics:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [dateRange]);

  const formatNumber = (num: number) => {
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

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (type: "from" | "to", value: string) => {
    const newDate = new Date(value);
    setDateRange((prev) => ({
      ...prev,
      [type]: newDate,
    }));
  };

  const setQuickDateRange = (days: number) => {
    setDateRange({
      from: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      to: new Date(),
    });
  };

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
          <div className="flex items-center space-x-4">
            <div>
              <SiteHeader title="Análise Detalhada" icon={<CalendarIcon className="w-5 h-5" />} />
              <p className="text-muted-foreground">Métricas completas de analytics do portfólio</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
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
          <Card className="bg-roxo300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Período de Análise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-4 items-end">
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="date-from">Data inicial</Label>
                    <Input
                      id="date-from"
                      type="date"
                      value={formatDateForInput(dateRange.from)}
                      onChange={(e) => handleDateChange("from", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-to">Data final</Label>
                    <Input
                      id="date-to"
                      type="date"
                      value={formatDateForInput(dateRange.to)}
                      onChange={(e) => handleDateChange("to", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setQuickDateRange(7)}>
                    7 dias
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setQuickDateRange(30)}>
                    30 dias
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setQuickDateRange(90)}>
                    90 dias
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
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

        {/* Device Breakdown & Top Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Device Breakdown */}
          <Card>
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
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Desktop</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatNumber(data.deviceBreakdown.dasktop)}</div>
                      <div className="text-sm text-muted-foreground">
                        {calculatePercentage(
                          data.deviceBreakdown.dasktop,
                          data.deviceBreakdown.dasktop + data.deviceBreakdown.mobile + data.deviceBreakdown.tablet
                        )}
                        %
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Mobile</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatNumber(data.deviceBreakdown.mobile)}</div>
                      <div className="text-sm text-muted-foreground">
                        {calculatePercentage(
                          data.deviceBreakdown.mobile,
                          data.deviceBreakdown.dasktop + data.deviceBreakdown.mobile + data.deviceBreakdown.tablet
                        )}
                        %
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                        <Tablet className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Tablet</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatNumber(data.deviceBreakdown.tablet)}</div>
                      <div className="text-sm text-muted-foreground">
                        {calculatePercentage(
                          data.deviceBreakdown.tablet,
                          data.deviceBreakdown.dasktop + data.deviceBreakdown.mobile + data.deviceBreakdown.tablet
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
          <Card>
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

        {/* Countries & Browsers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Top Countries */}
          <Card>
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

          {/* Top Browser */}
          <Card>
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
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">{data.topBrowsers.browser}</div>
                  <Badge variant="outline" className="text-lg">
                    {formatNumber(data.topBrowsers.visitors)}
                  </Badge>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">Nenhum navegador encontrado</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Bounce Rate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
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
