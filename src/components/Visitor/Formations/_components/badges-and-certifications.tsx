"use client";

import { Badge, Certification } from "@/types/formations";
import { BadgeCard } from "./badge-card";
import { CertificationCard } from "./certification-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Medal } from "lucide-react";

interface BadgesAndCertificationsProps {
  badges?: Badge[];
  certifications?: Certification[];
  language?: string;
}

export function BadgesAndCertifications({
  badges = [],
  certifications = [],
  language = "pt",
}: BadgesAndCertificationsProps) {
  if (badges.length === 0 && certifications.length === 0) {
    return null;
  }

  const badgeLabel = language === "pt" ? "Badges" : "Badges";
  const certificationLabel = language === "pt" ? "Certificações" : "Certifications";

  return (
    <div className="mt-8 space-y-4">
      <Tabs defaultValue={badges.length > 0 ? "badges" : "certifications"} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          {badges.length > 0 && (
            <TabsTrigger value="badges" className="gap-2">
              <Medal className="h-4 w-4" />
              {badgeLabel}
              <span className="ml-1 text-xs bg-primary/10 px-1.5 py-0.5 rounded-full">{badges.length}</span>
            </TabsTrigger>
          )}
          {certifications.length > 0 && (
            <TabsTrigger value="certifications" className="gap-2">
              <Award className="h-4 w-4" />
              {certificationLabel}
              <span className="ml-1 text-xs bg-primary/10 px-1.5 py-0.5 rounded-full">{certifications.length}</span>
            </TabsTrigger>
          )}
        </TabsList>

        {badges.length > 0 && (
          <TabsContent value="badges" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} language={language} />
              ))}
            </div>
          </TabsContent>
        )}

        {certifications.length > 0 && (
          <TabsContent value="certifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((certification) => (
                <CertificationCard key={certification.id} certification={certification} language={language} />
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
