import DarkVeil from "@/components/blocks/Backgrounds/DarkVeil/DarkVeilLazy";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { PageLoader } from "@/components/ui/page-loader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { OwnerProvider } from "@/contexts/OwnerContext";
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { getSiteURL } from "@/lib/axios";
import { fontClasses, SharedProviders } from "@/components/shared-head";

export const viewport: Viewport = { themeColor: "#2F0559", width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true, colorScheme: "dark light" };
export const metadata: Metadata = { metadataBase: new URL(getSiteURL()), title: { default: "Portfolio Profissional | Desenvolvedor FullStack", template: "%s | Portfolio Profissional" }, description: "Portfolio profissional de desenvolvedor FullStack especializado em Next.js, React, Node.js e tecnologias modernas.", icons: { icon: "https://res.cloudinary.com/dg9hqvlas/image/upload/v1755800847/favicon_ih9jni.ico" }, manifest: "/manifest.json", verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } };

interface Props {
  children: ReactNode;
}
export default async function OwnerLayout({ children }: Props) {
  return (
    <html lang="pt-BR" className={fontClasses}><body className="antialiased" suppressHydrationWarning><SharedProviders>
    <OwnerProvider>
      <PageLoader>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <Toaster richColors position="top-right" expand closeButton />
          <div className="fixed inset-0 z-[-1]">
            <DarkVeil speed={1.4} hueShift={0} noiseIntensity={0.02} warpAmount={0} />
          </div>
          <AppSidebar variant="floating" />
          <main className="flex-1">
            <SidebarInset>{children}</SidebarInset>
          </main>
        </SidebarProvider>
      </PageLoader>
    </OwnerProvider>
    </SharedProviders></body></html>
  );
}
