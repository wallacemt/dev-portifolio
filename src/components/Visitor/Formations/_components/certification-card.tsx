"use client";

import { Certification as CertificationType } from "@/types/badges";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import { format, isAfter } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

interface CertificationCardProps {
  certification: CertificationType;
  language?: string;
}

export function CertificationCard({ certification, language = "pt" }: CertificationCardProps) {
  const locale = language === "pt" ? ptBR : enUS;
  const isValid = certification.expirationDate ? isAfter(new Date(certification.expirationDate), new Date()) : true;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {certification.title}
              </CardTitle>
              {isValid && (
                <Badge variant="default" className="text-xs gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {language === "pt" ? "Válida" : "Valid"}
                </Badge>
              )}
            </div>
            <CardDescription className="flex items-center gap-1 text-xs">
              <Award className="h-3 w-3" />
              {certification.issuer}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{certification.description}</p>

        {certification.credentialId && (
          <div className="flex items-center gap-2 text-xs bg-muted/50 rounded-md p-2">
            <FileText className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-muted-foreground">{certification.credentialId}</span>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>{language === "pt" ? "Emissão:" : "Issued:"}</span>
              <time dateTime={certification.issueDate}>
                {format(new Date(certification.issueDate), "MMM yyyy", { locale })}
              </time>
            </div>

            {certification.expirationDate && (
              <div className="flex items-center gap-1.5">
                <span>{language === "pt" ? "Expira:" : "Expires:"}</span>
                <time
                  dateTime={certification.expirationDate}
                  className={!isValid ? "text-destructive font-medium" : ""}
                >
                  {format(new Date(certification.expirationDate), "MMM yyyy", { locale })}
                </time>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {certification.credentialUrl && (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {language === "pt" ? "Ver credencial" : "View credential"}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {certification.certificateFile && (
              <a
                href={certification.certificateFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {language === "pt" ? "Baixar PDF" : "Download PDF"}
                <FileText className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
