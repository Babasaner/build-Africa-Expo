import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { client, urlFor } from "../../../lib/sanity";
import { T } from "../../../lib/AutoTranslate";

const heroActions = [
  {
    label: "TERMES DE RÉFÉRENCE",
    className:
      "bg-primary-bae text-white transition-colors cursor-pointer duration-300 hover:bg-[#00AB92] focus-visible:ring-primary-bae cursor-pointer",
  },
  {
    label: "TÉLÉCHARGER LA BROCHURE ",
    className:
      "bg-[#00AB92] text-white transition-colors cursor-pointer duration-300 hover:bg-[#36499B] focus-visible:ring-accent cursor-pointer",
  },
];

export const HeroBannerSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const query = `*[_type == "heroSlide"] | order(order asc) {
      title1, title2, highlight, description, location,
      image,
      buttons[] {
        label, linkType, url,
        "fileUrl": file.asset->url
      }
    }`;

    client
      .fetch(query)
      .then((data) => {
        if (data && data.length > 0) {
          setSlides(
            data.map((s) => ({
              ...s,
              desc: s.description,
              heroActions: s.buttons?.map((b) => {
                const isRegistration = b.label
                  .toUpperCase()
                  .includes("INSCRIRE");
                return {
                  label: b.label,
                  href: isRegistration
                    ? "https://tickets.buildafricaexpo.com/fr/"
                    : b.linkType === "file"
                      ? b.fileUrl
                      : b.url,
                  target:
                    isRegistration ||
                    b.linkType === "file" ||
                    (b.url && b.url.startsWith("http"))
                      ? "_blank"
                      : "_self",
                  className: b.label.includes("TÉLÉCHARGER")
                    ? "bg-[#00AB92] transition-colors duration-300 hover:bg-[#36499B] cursor-pointer"
                    : "bg-primary-bae transition-colors duration-300 hover:bg-[#00AB92] cursor-pointer",
                };
              }),
            })),
          );
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  // Slide rotation logic
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return; // Ne pas slider si 0 ou 1 slide, ou si en pause

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 1000); // Wait for fade out before changing content
    }, 15000); // Increased duration to give more time to read

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (isLoading) {
    return (
      <section
        className="relative flex w-full items-center justify-center overflow-hidden bg-black"
        style={{ height: "100vh" }}
      >
        <div className="text-white">Chargement...</div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null; // Don't render anything if there's no data in Sanity
  }

  const current = slides[currentSlide];

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section
      className="relative flex w-full items-center justify-center overflow-hidden bg-black min-h-[600px] h-[100dvh] md:h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Cross-fade */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${slide.image?.asset ? urlFor(slide.image).url() : slide.image}')`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.50)_100%)]"
        aria-hidden="true"
      />

      {/* {slides.length > 1 && (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "1440px",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <button
        onClick={goToPrev}
        aria-label="Slide précédente"
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          opacity: 1,
          transition: "opacity 0.2s, transform 0.2s",
          pointerEvents: "all",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.85";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <img
          src="icon/button_previous.svg"
          alt="Précédent"
          style={{ width: "48px", height: "48px", display: "block" }}
        />
      </button>

      <button
        onClick={goToNext}
        aria-label="Slide suivante"
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          opacity: 1,
          transition: "opacity 0.2s, transform 0.2s",
          pointerEvents: "all",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.85";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <img
          src="icon/button_next.svg"
          alt="Suivant"
          style={{ width: "48px", height: "48px", display: "block" }}
        />
      </button>
    </div>
  )} 
*/}
      {/* Content */}
      <div
        className={`relative z-10 flex w-full flex-col items-center justify-center gap-6 px-5 text-center transition-all duration-700 ${
          isTransitioning
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        } pt-[120px] md:pt-[180px]`}
      >
        {slides[currentSlide].location && (
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2">
              <img
                className="h-5 w-5 opacity-60"
                alt="Location icon"
                src="https://c.animaapp.com/mot82cj4305Sf8/img/icons---bx-map.svg"
              />
              <p className="font-caption-regular text-[14px] font-normal leading-tight text-white">
                <T>{slides[currentSlide].location}</T>
              </p>
            </div>
          </div>
        )}

        <header className="flex w-full flex-col items-center gap-4 sm:gap-6">
          <h1
            className="w-full max-w-[1200px] uppercase font-bold tracking-tight text-white text-center leading-[1.2]"
            style={{ fontSize: "clamp(1rem, 0.5rem + 2.8vw, 3rem)" }}
          >
            <span className="block w-full"><T>{slides[currentSlide].title1}</T></span>
            <span className="block w-full">
              <T>{slides[currentSlide].title2}</T>
              {slides[currentSlide].highlight && (
                <span className="text-[#00AB92]">
                  {" "}
                  <T>{slides[currentSlide].highlight}</T>
                </span>
              )}
            </span>
          </h1>
          <p
            className="max-w-[800px] text-center font-medium leading-relaxed text-white/90"
            style={{ fontSize: "clamp(0.85rem, 1.2vw + 0.4rem, 1.1rem)" }}
          >
            <T>{slides[currentSlide].desc}</T>
          </p>
        </header>

        <nav
          aria-label="Hero actions"
          className="flex flex-col items-center justify-center gap-[10px] sm:flex-row"
        >
          {(slides[currentSlide].heroActions || heroActions).map(
            (action, idx) => (
              <a
                key={idx}
                href={action.href || "#"}
                target={action.href?.endsWith(".pdf") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="w-full max-w-[253px]"
              >
                <Button
                  type="button"
                  className={`h-[48px] w-full rounded-lg px-[32px] py-[16px] font-button-default text-[length:var(--button-default-font-size)] font-bold tracking-wider ${action.className}`}
                >
                  <T>{action.label}</T>
                </Button>
              </a>
            ),
          )}
        </nav>

        {/* Slide Indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsTransitioning(false);
                }, 400);
              }}
              className={`transition-all duration-300 rounded-none ${
                index === currentSlide
                  ? "w-[24px] h-[8px] bg-[#00AB92]"
                  : "w-[8px] h-[8px] bg-white/100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
