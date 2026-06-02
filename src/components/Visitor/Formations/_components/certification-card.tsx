"use client";

import { Certification as CertificationType } from "@/types/badges";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, ExternalLink, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { format, isAfter } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { RotateImage } from "@/components/ui/rotate-image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CertificationCardProps {
  certification: CertificationType;
  language?: string;
}

export function CertificationCard({ certification, language = "pt" }: CertificationCardProps) {
  const locale = language === "pt" ? ptBR : enUS;
  const isValid = certification.expirationDate
    ? isAfter(new Date(certification.expirationDate), new Date())
    : true;

  return (
    <Card className="group relative hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden bg-roxo500/50">
      {/* Accent line — diferencia visualmente do badge card */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />

      <CardHeader className="pb-3">
        <div className="flex flex-col items-center justify-between gap-2">
          <RotateImage imageUrl={certification.badgeImageUrl ?? ""} title={certification.title} />
          <ScrollArea className="h-[112px] w-full p-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-start gap-2 flex-wrap">
                <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                  {certification.title}
                </CardTitle>
                <Badge
                  variant={isValid ? "default" : "destructive"}
                  className="shrink-0 text-[10px] gap-1 px-1.5 py-0"
                >
                  {isValid ? <CheckCircle2 className="h-2.5 w-2.5" /> : <AlertCircle className="h-2.5 w-2.5" />}
                  {isValid
                    ? language === "pt" ? "Válida" : "Valid"
                    : language === "pt" ? "Expirada" : "Expired"}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Award className="h-3 w-3 shrink-0" />
                {certification.issuer}
              </CardDescription>
            </div>
          </ScrollArea>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <ScrollArea className="h-[80px] w-full px-1">
          <p className="text-sm text-muted-foreground leading-relaxed">{certification.description}</p>
        </ScrollArea>

        {certification.credentialId && (
          <div className="flex items-center gap-2 rounded-md bg-muted/40 px-2.5 py-1.5 border border-border/40">
            <span className="text-[10px] font-mono text-muted-foreground truncate">{certification.credentialId}</span>
          </div>
        )}

        <div className="flex flex-col gap-2.5 pt-2 border-t border-border/50">
          {/* Datas */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 shrink-0" />
              {format(new Date(certification.issueDate), "MMM yyyy", { locale })}
            </span>
            {certification.expirationDate && (
              <span className={!isValid ? "text-destructive font-medium" : ""}>
                {language === "pt" ? "até" : "until"}{" "}
                {format(new Date(certification.expirationDate), "MMM yyyy", { locale })}
              </span>
            )}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {certification.credentialUrl && (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground active:scale-95 min-h-[36px]"
              >
                {language === "pt" ? "Ver credencial" : "View credential"}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            )}
            {certification.certificateFile && (
              <a
                href={certification.certificateFile}
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label={language === "pt" ? "Baixar certificado PDF" : "Download PDF certificate"}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground active:scale-95 min-h-[36px]"
              >
                <Download className="h-3.5 w-3.5 shrink-0" />
                PDF
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
