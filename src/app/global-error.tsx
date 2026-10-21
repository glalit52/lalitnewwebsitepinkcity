"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root error captured by global error boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "48px 24px",
          background: "#FFF6EA",
          color: "#2A1D24",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#E7A08C",
            color: "#8E3B2C",
            padding: "6px 16px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "0.2em",
            marginBottom: "16px",
          }}
        >
          CRITICAL ERROR
        </span>
        <h1
          style={{
            color: "#22306B",
            fontSize: "36px",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            maxWidth: "480px",
            margin: "0 auto 28px",
            fontSize: "18px",
            lineHeight: 1.5,
            color: "#4A3540",
          }}
        >
          An unexpected application error occurred. Please try reloading the page.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            background: "#22306B",
            color: "#FFF6EA",
            border: "none",
            borderRadius: "999px",
            padding: "14px 32px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(34, 48, 107, 0.2)",
          }}
        >
          Reload application
        </button>
      </body>
    </html>
  );
}
