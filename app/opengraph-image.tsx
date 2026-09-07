// app/opengraph-image.tsx
// Generated at build time by Next's file convention, so the social preview can
// never 404 or drift out of sync with SITE_CONFIG the way a static PNG would.
import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/config";

export const alt = SITE_CONFIG.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#00BFFF";
const INK = "#0f0f11";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top HUD row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            color: "rgba(243,243,243,0.45)",
            textTransform: "uppercase",
          }}
        >
          <span>{SITE_CONFIG.location}</span>
          <span>{"// OPEN TO COLLABORATE"}</span>
        </div>

        {/* Identity block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 26,
              letterSpacing: 8,
              color: BRAND,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {"[ FULL STACK ENGINEER ]"}
          </span>
          <span
            style={{
              fontSize: 108,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: -3,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Sarthak Parulekar
          </span>
          <span
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "rgba(243,243,243,0.62)",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Java · Spring Boot · Go · React/Next.js · AI/LLM integrations
          </span>
        </div>

        {/* Proof row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 4, background: BRAND }} />
          <span
            style={{
              fontSize: 24,
              letterSpacing: 2,
              color: "rgba(243,243,243,0.8)",
              textTransform: "uppercase",
            }}
          >
            Two startups · shipping real production software
          </span>
        </div>
      </div>
    ),
    size,
  );
}
