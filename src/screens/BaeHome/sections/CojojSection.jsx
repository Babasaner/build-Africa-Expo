import React, { useState, useEffect } from "react";

export const CojojSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      aria-label="COJOJ – Youth Olympic Games Dakar 2026"
      style={{
        position: "relative",
        width: "100%",
        minHeight: isMobile ? "320px" : "452px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${import.meta.env.BASE_URL}joj.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient overlay – gauche opaque → droite transparent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          /* En mobile on étend le gradient plus loin pour couvrir tout le texte */
          background: isMobile
            ? "linear-gradient(90deg, #232D5B 60%, rgba(35, 45, 91, 0.85) 100%)"
            : "linear-gradient(90deg, #232D5B 0%, rgba(35, 45, 91, 0) 100%)",
        }}
      />

      {/* Content — texte gauche / image droite (desktop uniquement) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: isMobile ? "40px 24px" : "64px 40px 0 40px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        {/* Bloc texte */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: isMobile ? "12px" : "16px",
            maxWidth: isMobile ? "100%" : "527px",
            flex: "1 1 auto",
            paddingBottom: isMobile ? "0" : "64px",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? "13px" : "16px",
              lineHeight: "20px",
              color: "#00AB92",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            YOUTH OLYMPIC GAMES · DAKAR 2026
          </p>

          {/* Titre principal */}
          <h2
            style={{
              fontFamily: "'Tomorrow', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? "22px" : "32px",
              lineHeight: isMobile ? "30px" : "40px",
              color: "#ffffff",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            L&apos;Afrique accueille.
            <br />
            Le Sénégal célèbre.
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: "24px",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Retrouvez AYO à New York et Toronto pour célébrer l’énergie, la
            jeunesse et l’esprit des Jeux Olympiques de la Jeunesse Dakar 2026.
          </p>
        </div>

        {/* Image AYO — visible uniquement en desktop (≥ 768px) */}
        {!isMobile && (
          <div
            style={{
              flex: "0 0 auto",
              alignSelf: "flex-end",
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}ayo.png`}
              alt="Mascotte AYO – Jeux Olympiques de la Jeunesse Dakar 2026"
              style={{
                height: "400px",
                width: "400px",
                objectFit: "contain",
                display: "block",
                position: "relative",
                top: "40px",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
