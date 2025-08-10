import DarkVeil from "@/components/blocks/Backgrounds/DarkVeil/DarkVeil";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { PageLoader } from "@/components/ui/page-loader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { OwnerProvider } from "@/contexts/OwnerContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default async function OwnerLayout({ children }: Props) {
  return (
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
          <Toaster richColors position="top-right" expand />
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
  );
}
