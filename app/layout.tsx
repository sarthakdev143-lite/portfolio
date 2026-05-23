// app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import { cn } from "@/lib/utils";
import HUD from "@/components/HUD";
import Noise from "@/components/Noise";
// import Preloader from "@/components/Preloader";
import { SITE_CONFIG } from "@/lib/config";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: "https://sarthakdev.vercel.app", 
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.png", // add a 1200×630 image to /public
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(jetbrainsMono.variable, geist.variable, "dark")}>
      <body className="antialiased bg-[#0f0f11] text-white">
        <noscript>
          <div style={{ padding: "2rem", fontFamily: "monospace", color: "var(--color-brand)", background: "#0f0f11" }}>
            This portfolio requires JavaScript to run. Please enable it in your browser settings.
          </div>
        </noscript>
        <SmoothScroll>
          <Noise />
          <HUD />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
