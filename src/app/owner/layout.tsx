import DarkVeil from "@/components/blocks/Backgrounds/DarkVeil/DarkVeil";
import { Toaster } from "@/components/ui/sonner";
import { OwnerProvider } from "@/contexts/OwnerContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default async function OwnerLayout({ children }: Props) {
  return (
    <OwnerProvider>
      <Toaster richColors position="top-right" expand />
      <div className="fixed inset-0 z-[-1]">
        <DarkVeil
          speed={1.4}
          hueShift={0}
          noiseIntensity={0.02}
          scanlineFrequency={3.2}
          scanlineIntensity={0.2}
          warpAmount={0}
        />
      </div>
      <main className="flex-1">{children}</main>
    </OwnerProvider>
  );
}
