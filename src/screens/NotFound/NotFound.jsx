import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count <= 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1433 0%, #161D3E 50%, #0a2a25 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "inherit",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background circles */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: "clamp(200px, 40vw, 500px)", height: "clamp(200px, 40vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(54,73,155,0.25) 0%, transparent 70%)",
          animation: "pulse 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: "clamp(150px, 35vw, 450px)", height: "clamp(150px, 35vw, 450px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,171,146,0.2) 0%, transparent 70%)",
          animation: "pulse 8s ease-in-out infinite reverse",
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes floatUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .notfound-card { animation: floatUp 0.7s ease forwards; }
        .notfound-card > * { animation: floatUp 0.7s ease forwards; }
        .notfound-card > *:nth-child(2) { animation-delay: 0.1s; opacity: 0; }
        .notfound-card > *:nth-child(3) { animation-delay: 0.2s; opacity: 0; }
        .notfound-card > *:nth-child(4) { animation-delay: 0.3s; opacity: 0; }
        .notfound-card > *:nth-child(5) { animation-delay: 0.4s; opacity: 0; }
        .btn-home:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(54,73,155,0.5); }
        .btn-home { transition: all 0.25s ease; }
      `}</style>

      <div
        className="notfound-card"
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "1.5rem", textAlign: "center", maxWidth: "600px", width: "100%",
        }}
      >
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Build Africa Expo"
          style={{ height: "clamp(36px, 6vw, 56px)", width: "auto", objectFit: "contain", opacity: 0.9 }}
        />

        {/* 404 big number */}
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: "clamp(6rem, 20vw, 12rem)",
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(135deg, #36499B 0%, #00AB92 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            404
          </p>
          {/* spinning ring around 404 */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: "-8px",
              border: "2px solid transparent",
              borderTopColor: "#00AB92",
              borderRightColor: "rgba(0,171,146,0.3)",
              borderRadius: "50%",
              animation: "spin 3s linear infinite",
            }}
          />
        </div>

        {/* Message */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h1
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Page introuvable
          </h1>
          <p style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>
            Cette page n&apos;existe pas ou a été déplacée.<br />
            Vous serez redirigé vers l&apos;accueil dans{" "}
            <span style={{ color: "#00AB92", fontWeight: 700 }}>{count}</span> seconde{count > 1 ? "s" : ""}.
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%", maxWidth: "320px",
            height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #36499B, #00AB92)",
              borderRadius: "2px",
              width: `${(count / 10) * 100}%`,
              transition: "width 1s linear",
            }}
          />
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          <button
            className="btn-home"
            onClick={() => navigate("/")}
            style={{
              padding: "0.75rem 2rem",
              background: "#36499B",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            ← RETOUR À L&apos;ACCUEIL
          </button>
          <button
            className="btn-home"
            onClick={() => window.history.back()}
            style={{
              padding: "0.75rem 2rem",
              background: "transparent",
              color: "#00AB92",
              border: "2px solid #00AB92",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            PAGE PRÉCÉDENTE
          </button>
        </div>
      </div>
    </main>
  );
};
