import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { client, urlFor } from "../../../lib/sanity";

const heroActions = [
  {
    label: "TERMES DE RÉFÉRENCE",
    className: "bg-primary-bae text-white hover:bg-primary-bae/90 focus-visible:ring-primary-bae",
  },
  {
    label: "TÉLÉCHARGER LA BROCHURE ",
    className: "bg-accent text-white hover:bg-accent/90 bg-[#00AB92] focus-visible:ring-accent",
  },
];


export const HeroBannerSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "heroSlide"] | order(order asc) {
      title1, title2, highlight, description, location,
      image,
      buttons[] {
        label, linkType, url,
        "fileUrl": file.asset->url
      }
    }`;

    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setSlides(data.map(s => ({
          ...s,
          desc: s.description,
          heroActions: s.buttons?.map(b => ({
            label: b.label,
            href: b.linkType === 'file' ? b.fileUrl : b.url,
            className: b.label.includes("TÉLÉCHARGER") ? "bg-[#00AB92] hover:bg-[#00AB92]/90" : "bg-primary-bae hover:bg-primary-bae/90"
          }))
        })));
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Sanity fetch error:", err);
      setIsLoading(false);
    });
  }, []);

  // Slide rotation logic
  useEffect(() => {
    if (slides.length <= 1) return; // Ne pas slider si 0 ou 1 slide

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 1000); // Wait for fade out before changing content
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) {
    return (
      <section className="relative flex min-h-screen h-auto w-full items-center justify-center overflow-hidden bg-black py-12 lg:py-0 lg:h-screen">
        <div className="text-white">Chargement...</div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null; // Don't render anything if there's no data in Sanity
  }

  const current = slides[currentSlide];

  return (
    <section className="relative flex min-h-screen h-auto w-full items-center justify-center overflow-hidden bg-black py-12 lg:py-0 lg:h-screen">
      {/* Background Images with Cross-fade */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
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

      <div className={`relative z-10 flex w-full flex-col items-center justify-center gap-6 px-5 pt-[160px] pb-24 text-center lg:pt-0 lg:pb-0 transition-all duration-700 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        {slides[currentSlide].location && (
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2">
              <img
                className="h-5 w-5 opacity-60"
                alt="Location icon"
                src="https://c.animaapp.com/mot82cj4305Sf8/img/icons---bx-map.svg"
              />
              <p className="font-caption-regular text-[14px] font-normal leading-tight text-white">
                {slides[currentSlide].location}
              </p>
            </div>
          </div>
        )}
        <header className="flex w-full flex-col items-center gap-4 sm:gap-6">
          <h1
            className="w-full max-w-[1200px] uppercase font-bold tracking-tight text-white text-center leading-[1.2]"
            style={{ fontSize: "clamp(1rem, 0.5rem + 2.8vw, 3rem)" }}
          >
            <span className="block w-full">{slides[currentSlide].title1}</span>
            <span className="block w-full">
              {slides[currentSlide].title2}
              {slides[currentSlide].highlight && (
                <span className="text-[#00AB92]"> {slides[currentSlide].highlight}</span>
              )}
            </span>
          </h1>
          <p className="max-w-[800px] text-center font-medium leading-relaxed text-white/90"
            style={{ fontSize: "clamp(0.85rem, 1.2vw + 0.4rem, 1.1rem)" }}>
            {slides[currentSlide].desc}
          </p>
        </header>



        <nav
          aria-label="Hero actions"
          className="flex flex-col items-center justify-center gap-[10px] sm:flex-row"
        >
          {(slides[currentSlide].heroActions || heroActions).map((action, idx) => (
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
                {action.label}
              </Button>
            </a>
          ))}
        </nav>

        {/* Slide Indicators */}
        <div className="mt-8 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsTransitioning(false);
                }, 400);
              }}
              className={`h-1.5 transition-all duration-300 rounded-full ${index === currentSlide ? "w-8 bg-[#00AB92]" : "w-2 bg-white/40"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <img
        className="absolute bottom-px left-0 z-10 h-[111px] w-full object-cover"
        alt="Color bars"
        src={`${import.meta.env.BASE_URL}hero_color_bar.png`}
      />
    </section>
  );
};
