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
  // Required so relative OG/Twitter image URLs resolve to the real origin.
  // Without it Next falls back to http://localhost:3000 on non-Vercel builds.
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: "/",
    siteName: SITE_CONFIG.name,
    // Images come from app/opengraph-image.tsx via the file convention.
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
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
