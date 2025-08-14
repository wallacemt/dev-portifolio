"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Monitor, Smartphone, Tablet, Globe, Eye, Clock, Users } from "lucide-react";

export function AnalyzeDetailSkeleton() {
  return (
    <div className="min-w-full px-12 mx-auto space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-col space-x-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      <div>
        <Card className="bg-roxo500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Período de Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-full max-w-md" />
              <Skeleton className="h-4 w-48" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, title: "Total de Visitantes" },
          { icon: Eye, title: "Visitantes Únicos" },
          { icon: CalendarIcon, title: "Visualizações" },
          { icon: Clock, title: "Tempo Médio" },
        ].map((item, index) => (
          <Card key={index} className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <item.icon className="w-4 h-4 mr-2" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devices Card Skeleton */}
        <Card className="@container/card bg-gradient-to-b from-roxo500 to-card shadow-xs">
          <CardHeader>
            <CardTitle>Dispositivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[Monitor, Smartphone, Tablet].map((Icon, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-roxo100/40 rounded flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages Card Skeleton */}
        <Card className="@container/card bg-gradient-to-b from-roxo500 to-card shadow-xs">
          <CardHeader>
            <CardTitle>Páginas Mais Visitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Países
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browser Card Skeleton */}
        <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
          <CardHeader>
            <CardTitle>Navegador Principal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="animate-in">
        <Card className="@container/card bg-gradient-to-t from-roxo100/5 to-card shadow-xs">
          <CardHeader>
            <CardTitle>Taxa de Rejeição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-64" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
