import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll"; 
import "./globals.css";
import { cn } from "@/lib/utils";
import HUD from "@/components/HUD";
import Noise from "@/components/Noise";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sarthak Parulekar • Creative Software Engine",
  description: "Crafting high-performance web applications and fluid interactive physics interfaces.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body className="antialiased bg-[#0f0f11] text-[#f3f3f3]">
        <HUD />
        <Noise />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}