import { ImageResponse } from "next/og";
import { person } from "@/content/site";

export const alt = `${person.name} — ${person.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "60px 80px",
          backgroundColor: "#22306B",
          color: "#FFF6EA",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "380px",
            height: "100%",
            backgroundColor: "#E7A08C",
            opacity: 0.12,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#F2B33D",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#F2B33D",
            }}
          >
            {person.domain}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              color: "#FFF6EA",
            }}
          >
            {person.name}
          </h1>
          <p
            style={{
              fontSize: "28px",
              lineHeight: 1.35,
              margin: 0,
              color: "#E7A08C",
              maxWidth: "850px",
            }}
          >
            {person.tagline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255, 246, 234, 0.2)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#FFF6EA", opacity: 0.9 }}>
            Forbes 30 Under 30 · MIT 35 Under 35 · Founder, SenseGrass
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              backgroundColor: "#F2B33D",
              color: "#22306B",
              padding: "8px 20px",
              borderRadius: "999px",
            }}
          >
            Entrepreneur · Speaker · Mentor
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
