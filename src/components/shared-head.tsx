import { Aclonica, Lato, Share_Tech_Mono } from "next/font/google";
import { MotionConfigProvider } from "@/components/motion-config-provider";
import TopLoadingBar from "@/components/ui/top-loading-bar";

const aclonica = Aclonica({ subsets: ["latin"], variable: "--font-title", weight: "400", display: "swap", preload: true });
const lato = Lato({ subsets: ["latin"], variable: "--font-textBody", weight: ["400", "700"], style: ["normal", "italic"], display: "swap", preload: true });
const monoT = Share_Tech_Mono({ subsets: ["latin"], variable: "--font-monoT", weight: "400", display: "swap", preload: false });

export const fontClasses = `${aclonica.variable} ${lato.variable} ${monoT.variable}`;

export function SharedProviders({ children }: { children: React.ReactNode }) {
  return <MotionConfigProvider><TopLoadingBar />{children}</MotionConfigProvider>;
}
