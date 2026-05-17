import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ExpertSpeakersGridSection } from "../BaeHome/sections/ExpertSpeakersGridSection";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { client } from "../../lib/sanity";

export const Intervenants = () => {
  useScrollReveal();
  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const query = `*[_type == "speaker" && category == "featured"] | order(featuredOrder asc) {
      name, role, tag, featuredOrder, "imageSrc": image.asset->url
    }`;

    client
      .fetch(query)
      .then((data) => {
        console.log("Featured speakers fetched:", data);
        setSpeakers(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (speakers.length <= 2 || isLoading) return;

    const interval = setInterval(() => {
      const maxIndex = Math.ceil(speakers.length / 2) - 1;
      const nextIndex = activeIndex >= maxIndex ? 0 : activeIndex + 1;
      scrollToPage(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [speakers, activeIndex, isLoading]);

  const scrollToPage = (index) => {
    if (scrollRef.current) {
      const scrollAmount = 1000 + 24; // Width of 2 cards (488*2 + 24 gap)
      scrollRef.current.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // Sync activeIndex on manual scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollAmount = 1000 + 24;
      const newIndex = Math.round(scrollRef.current.scrollLeft / scrollAmount);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white overflow-hidden">
      <Helmet>
        <title>Intervenants — Build Africa Expo 2026</title>
        <meta
          name="description"
          content="Découvrez le salon Build Africa Expo 2026, une plateforme durable de dialogue et de structuration de projets pour l'avenir des territoires africains."
        />
        <meta
          name="keywords"
          content="Salon Build Africa, investissement, transformation Afrique, plateforme stratégique, forum Afrique"
        />
        <meta property="og:title" content="Le Salon — Build Africa Expo 2026" />
        <meta
          property="og:description"
          content="Plateforme durable de dialogue et de structuration de projets."
        />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full min-h-[40vh] md:min-h-[50vh] animate-fade-in animate-delay-200 animate-duration-1000 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(92.26deg, #36499B 0.24%, #00AB92 100%)",
        }}
      >
        {/* Subtle Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[16px] md:gap-[24px] min-h-[300px] md:min-h-[356px] mt-[100px] md:mt-[90px] px-[20px]">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[28px] sm:text-[32px] md:text-[48px] leading-[36px] md:leading-[56px] max-w-[900px] animate-fade-up uppercase">
            DES VOIX QUI FAÇONNENT L'AFRIQUE DE DEMAIN
          </h1>
          <p className="text-white/90 font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[20px] max-w-[700px] animate-fade-up [--animation-delay:200ms]">
            Build Africa Expo réunit dirigeants, investisseurs, experts,
            institutions et acteurs internationaux autour des grands enjeux de
            transformation du continent africain.
          </p>
        </div>
      </section>

      {/* Intervenants à l'honneur - Carousel Dynamique */}
      <section
        className="reveal w-full h-auto mx-auto flex flex-col items-center justify-center px-[20px] py-16 md:py-[120px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.sanity.io/images/d4jrc26i/production/95fcbd3ef2146319f8128e61e579ec3b90834f95-1440x944.png')",
        }}
      >
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-center items-center mb-10 gap-4">
          <h1 className="text-[#fff] text-[32px] md:text-[64px] font-['Tomorrow'] uppercase leading-[42px] md:leading-[72px] font-bold">
            Intervenants à l'honneur
          </h1>
        </div>

        {!isLoading && speakers.length === 0 && (
          <div className="text-white/60 text-center mt-10">
            Aucun intervenant à l'honneur trouvé. <br />
            Veuillez définir la catégorie sur "Featured" dans votre Studio
            Sanity.
          </div>
        )}

        {!isLoading && speakers.length > 0 && (
          <>
            <div className="max-w-[1000px] w-full overflow-hidden">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-[24px] overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              >
                {speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="flex-none w-full md:w-[488px] snap-start"
                  >
                    <Card className="animate-fade-in-up opacity-0 h-full overflow-hidden rounded-none border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="h-[300px] md:h-[488px] w-full md:w-[488px] bg-[#333333] overflow-hidden">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={
                              speaker.imageSrc ||
                              "https://cdn.sanity.io/images/d4jrc26i/production/a796d6b5eec49ab24b2d9ec4759f177e25bcb0cf-4897x4000.jpg"
                            }
                            alt={speaker.name}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-[8px] p-[16px] border-b-4 border-transparent transition-colors duration-300 group-hover:border-[#00AB92]">
                          <div className="w-fit bg-[#00AB92] py-[4px] px-[8px] flex items-center rounded-[4px]">
                            <span className="text-[#fff] font-['inter'] uppercase font-bold text-[10px]">
                              {speaker.tag || "Expert"}
                            </span>
                          </div>
                          <h3 className="font-bold font-['tomorrow'] text-[24px] uppercase leading-[32px] text-[#1d1d1b]/100">
                            {speaker.name}
                          </h3>
                          <div className="font-['Inter'] text-[16px] leading-[20px] text-[#1D1D1B] min-h-[40px] flex flex-col justify-start">
                            {(() => {
                              const parts = speaker.role?.split("·") || [];
                              return parts.length > 1 ? (
                                <p className="block">
                                  <span className="font-bold">
                                    {parts[0].trim()}
                                  </span>
                                  <span className="font-normal">
                                    {" "}
                                    · {parts.slice(1).join("·").trim()}
                                  </span>
                                </p>
                              ) : (
                                <p className="font-normal">
                                  {speaker.role?.trim()}
                                </p>
                              );
                            })()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            {speakers.length > 2 && (
              <div className="flex gap-2 mt-8">
                {Array.from({ length: Math.ceil(speakers.length / 2) }).map(
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToPage(i)}
                      className={`h-2 transition-all duration-300 rounded-none ${
                        activeIndex === i
                          ? "w-8 bg-[#00AB92]"
                          : "w-2 bg-white/100 hover:bg-white/100"
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ),
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Intervenants */}
      <div id="intervenants" className="reveal w-full">
        <ExpertSpeakersGridSection showViewAll={false} />
      </div>

      {/* CTA TEXT */}

      <section className="relative w-full bg-[#fff] py-16 md:py-[120px]">
        {/* Header Container - Constrained to 1440px */}
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:gap-10 px-5">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-[683.8px] flex-col items-start gap-4">
              <p className="mt-[-1.00px] font-headings-h4 text-sm md:text-base font-bold text-[#00AB92]">
                VISION GLOBALE
              </p>
              <h2 className="font-headings-h2 text-2xl uppercase md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#1D1D1B]">
                Des thématiques au cœur des transformations du continent
              </h2>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[120px] gap-y-[40px] mt-16">
            {[
              {
                title: "Sport, industries créatives & influence culturelle",
                text: "Infrastructures sportives, grands événements internationaux, économie du sport, médias, audiovisuel, musique, mode, contenus digitaux et influence culturelle comme leviers d’attractivité et de rayonnement international.",
              },
              {
                title: "Infrastructure & Connectivité",
                text: "Ports, aéroports, routes, VRD, logistique et infrastructures stratégiques.",
              },
              {
                title: "Finance & Investissement",
                text: "Diaspora, capitaux internationaux, investissements prioritaires et structuration du capital.",
              },
              {
                title: "Innovation & Technologie", // I'll use the French title from the image: INNOVATION & TECHNOLOGY

                text: "Smart cities, mobilité intelligente, énergie, data et innovation appliquée au développement.",
              },
              {
                title: "Capital Humain & Gouvernance",
                text: "Formation, normes, gouvernance, compétences et structuration des écosystèmes.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 pl-6 border-l-4 border-[#36499B] bg-white"
              >
                <h3 className="font-['Tomorrow'] font-bold text-[20px] leading-[24px] text-[#1D1D1B] uppercase">
                  {item.title_fr || item.title}
                </h3>
                <p className="font-['Inter'] font-normal text-[16px] leading-[20px] text-[#343432]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION EXPERIENCE EXECUTIVE */}

      <section className="reveal w-full w-full animate-fade-in  animate-delay-200  animate-duration-1000  py-16  md:py-24 bg-[#36499B]">
        <div className="max-w-[1440px] mx-auto  flex flex-col lg:flex-row items-center gap-12 lg:gap-24 px-[20px]">
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex gap-[24px]">
              <h2 className="text-[#00AB92] flex flex-col uppercase text-[20px] gap-[8px]  font-bold leading-[24px]">
                EXECUTIVE EXPERIENCES
              </h2>
            </div>

            <div className="flex max-w-[530px] gap-[24px]">
              <h3 className="text-[#fff] uppercase flex flex-col uppercase text-[32px] gap-[8px]  font-bold leading-[40px]">
                Des formats conçus pour créer des connexions à forte valeur
              </h3>
            </div>

            <div className="text-[#fff]/70 font-['Inter'] font-normal text-[16px] md:text-[16px] leading-[20px] max-w-[530px] animate-fade-up [--animation-delay:200ms]">
              Au-delà des panels et des conférences, Build Africa Expo développe
              des espaces d'échanges et de networking pensés pour favoriser les
              rencontres stratégiques entre décideurs, investisseurs,
              institutions, entreprises et diaspora.
              <p className="text-[#fff]/70 font-['Inter'] mt-4 font-normal text-[16px] md:text-[16px] leading-[20px] max-w-[530px] animate-fade-up [--animation-delay:200ms]">
                Dîners de travail, rencontres exécutives, cocktails networking,
                sessions privées et discussions sectorielles participent à créer
                une expérience premium orientée vers les connexions, les
                opportunités et les collaborations durables.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="w-full h-auto  animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300  overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[40px] bg-contain bg-no-repeat bg-center">
              <img
                src="https://cdn.sanity.io/images/d4jrc26i/production/23dc96901c98ac9c63a82dfe6887a55004c947e3-528x384.png"
                alt="Frame Build Africa Expo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="reveal w-full h-[470px] md:h-[560px] flex items-center justify-center  px-[20px] py-16 md:py-[120px] bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage:
            "url('https://cdn.sanity.io/images/d4jrc26i/production/f633ca61f3426788a52d64ec61d7d40cf2728977-1440x560.png')",
        }}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 gap-[24px]">
          <div className="grid grid-cols-1 gap-[40px]">
            <div className="text-center">
              <h2 className="text-[#fff] text-[32px] md:text-[64px] font-['Tomorrow'] uppercase  leading-[42px] md:leading-[72px] font-bold ">
                Rejoignez le réseau qui bâtit l'Afrique de demain.
              </h2>
            </div>

            <div className="mx-auto grid grid-cols-1 animate-fade-in  animate-delay-200  animate-duration-1000  md:grid-cols-2 gap-[24px]">
              <Button className="w-full md:w-auto   h-[48px] bg-[#36499B] font-bold px-[32px] rounded-[8px] py-[16px] text-white hover:bg-[#202C5D]/100 focus-visible:ring-[#202C5D]">
                DEVENIR PARTENAIRE DU FORUM
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                >
                  <path
                    d="M5.02273 8.95588L4.07173 8.01412L6.9201 5.16575H0V3.79004H6.9201L4.07173 0.946289L5.02273 -8.89897e-05L9.50071 4.47789L5.02273 8.95588Z"
                    fill="#fff"
                  />
                </svg>
              </Button>

              <a
                href="https://tickets.buildafricaexpo.com/fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full md:w-auto cursor-pointer h-[48px] bg-[#00AB92] font-bold text-white rounded-[8px] hover:bg-[#202C5D]/100 focus-visible:ring-[#202C5D]">
                  S'INSCRIRE COMME VISITEUR
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                  >
                    <path
                      d="M5.02273 8.95588L4.07173 8.01412L6.9201 5.16575H0V3.79004H6.9201L4.07173 0.946289L5.02273 -8.89897e-05L9.50071 4.47789L5.02273 8.95588Z"
                      fill="#fff"
                    />
                  </svg>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};
