import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll"; 
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sarthak Parulekar | Creative Developer",
  description: "Building High-performance web applications and fluid interactive design.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn(jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body className="antialiased bg-[#0f0f11] text-[#f3f3f3]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}