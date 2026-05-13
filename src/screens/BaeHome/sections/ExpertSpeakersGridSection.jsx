import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { client } from "../../../lib/sanity";

export const ExpertSpeakersGridSection = ({ showViewAll = true }) => {
  const scrollRef = React.useRef(null);
  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "speaker"] | order(order asc) {
      name, role, "imageSrc": image.asset->url
    }`;

    client
      .fetch(query)
      .then((data) => {
        if (data && data.length > 0) {
          setSpeakers(
            data.map((s) => ({
              ...s,
              alt: s.name,
              imageClassName: "w-full h-full object-cover",
              imageSrc: s.imageSrc
                ? s.imageSrc
                : `${import.meta.env.BASE_URL}speakers/atepa.png`,
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

  if (isLoading) {
    return (
      <section className="relative w-full bg-[#EAEDF5] py-[120px]">
        <div className="text-center text-[#36499B]">
          Chargement des intervenants...
        </div>
      </section>
    );
  }

  if (speakers.length === 0) {
    return null;
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 185;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-[#EAEDF5] py-16 md:py-[120px]">
      {/* Header Container - Constrained to 1440px */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:gap-10 px-5">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[683.8px] flex-col items-start gap-4">
            <p className="mt-[-1.00px] font-headings-h4 text-sm md:text-base font-bold text-[#00AB92]">
              LES VOIX INFLUENTES
            </p>
            <h2 className="font-headings-h2 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#36499B]">
              SOYEZ INSPIRÉ PAR LES EXPERTS.
            </h2>
          </div>
          <nav
            aria-label="Navigation des intervenants"
            className="inline-flex items-start gap-4 self-end"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => scroll("left")}
              className="h-auto rounded-lg border-[#36499B] bg-transparent p-3 text-[#36499B] hover:bg-[#36499B]/10"
              aria-label="Intervenants précédents"
            >
              <img
                className="h-6 w-6"
                alt="Icons bx left arrow"
                src="https://c.animaapp.com/mot82cj4305Sf8/img/icons---bx-left-arrow-alt.svg"
              />
            </Button>
            <Button
              type="button"
              onClick={() => scroll("right")}
              className="h-auto rounded-lg bg-[#36499B] p-3 text-white hover:bg-[#36499B]/90"
              aria-label="Intervenants suivants"
            >
              <img
                className="h-6 w-6"
                alt="Icons bx right arrow"
                src="https://c.animaapp.com/mot82cj4305Sf8/img/icons---bx-right-arrow-alt.svg"
              />
            </Button>
          </nav>
        </header>
      </div>

      {/* Carousel Container - Fixed Left at 1440px, Bleeds to the Right */}
      <div
        ref={scrollRef}
        className="mt-10 flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory ml-0 lg:ml-[max(20px,calc((100vw-1440px)/2+20px))]"
      >
        <div className="flex gap-6 pr-5 lg:pr-[max(20px,calc((100vw-1440px)/2+20px))]">
          {speakers.map((speaker, index) => (
            <Card
              key={`${speaker.name}-${index}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in-up opacity-0 min-w-[185px] max-w-[185px] snap-start overflow-hidden rounded-none border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <CardContent className="flex h-full flex-col p-0">
                <div className="h-[220px] w-full bg-[#333333] overflow-hidden">
                  <img
                    className={`${speaker.imageClassName} transition-transform duration-500 group-hover:scale-110`}
                    alt={speaker.alt}
                    src={speaker.imageSrc}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4 border-b-4 border-transparent transition-colors duration-300 group-hover:border-[#00AB92]">
                  <h3 className="font-body-bold text-[15px] font-bold text-[#1d1d1b] leading-tight min-h-[40px] flex items-center">
                    {speaker.name}
                  </h3>
                  <div className="font-caption-regular text-[12px] font-normal leading-tight text-[#1d1d1b]/100 min-h-[60px]">
                    {speaker.role
                      ?.split(/[,|—\n]|(?=\bet\s)/)
                      .map((part, i) => (
                        <span key={i} className="block">
                          {part.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showViewAll && (
        <div className="mx-auto mt-10  flex w-full max-w-[1440px] items-center justify-end px-5">
          <a className="cursor-pointer" href="/intervenants">
            <Button
              type="button"
              variant="ghost"
              className="h-auto p-0 font-button-default text-[14px] font-bold text-[#00AB92] cursor-pointer hover:bg-transparent hover:text-[#00AB92]"
            >
              VOIR TOUS LES INTERVENANTS →
            </Button>
          </a>
        </div>
      )}
    </section>
  );
};
