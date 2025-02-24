import type { Metadata } from "next";

import Head from "next/head";
import Script from "next/script";
import { Poppins, Caveat, Raleway } from "next/font/google";

import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import LenisScroll from "@/components/LenisScroll";

import "./globals.css";
import 'remixicon/fonts/remixicon.css'

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-caveat", });
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-poppins", });
const raleway = Raleway({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-raleway", });

export const metadata: Metadata = {
  title: "Portfolio • Sarthakdev143",
  description: "Portfolio Of Sarthak Parulekar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable} ${raleway.variable}`}>
      <Head>
        <meta name="description" content={metadata.description ?? undefined} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={String(metadata.title) ?? undefined} />
        <meta property="og:description" content={metadata.description ?? undefined} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <body className="antialiased scroll-smooth">

        <Cursor />
        <Header />
        <LenisScroll>
          {children}
        </LenisScroll>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JH022B3HQH"
          strategy="afterInteractive"
        ></Script>
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JH022B3HQH');
            `,
          }}
        />
      </body>
    </html>
  );
}
