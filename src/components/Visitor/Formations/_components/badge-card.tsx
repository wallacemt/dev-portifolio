"use client";

import { Badge as BadgeType } from "@/types/badges";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Award, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RotateImage } from "@/components/ui/rotate-image";

interface BadgeCardProps {
  badge: BadgeType;
  language?: string;
  className?: string;
}

export function BadgeCard({ badge, language = "pt", className }: BadgeCardProps) {
  const locale = language === "pt" ? ptBR : enUS;

  return (
    <Card
      className={cn(
        className,
        "group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden bg-roxo600/50",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center justify-between gap-2">
          {badge.imageUrl && <RotateImage imageUrl={badge.imageUrl} title={badge.title} />}
          <div className="flex-1 space-y-1">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {badge.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <Award className="h-4 w-4" />
              {badge.issuer}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{badge.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <time dateTime={badge.issueDate}>{format(new Date(badge.issueDate), "MMM yyyy", { locale })}</time>
          </div>

          {badge.badgeUrl && (
            <Link
              href={badge.badgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {language === "pt" ? "Ver badge" : "View badge"}
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
