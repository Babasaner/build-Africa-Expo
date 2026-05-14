import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { client } from "../../lib/sanity";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { PartnersShowcaseSection } from "../BaeHome/sections/PartnersShowcaseSection";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  Building2,
  MapPin,
  Truck,
  ShieldCheck,
  Globe,
  Users,
  ArrowRight,
  Eye,
  UserCheck,
  Target,
  Briefcase,
} from "lucide-react";

export const Partenaires = () => {
  useScrollReveal();

  const [partners, setPartners] = useState([]);
  const [stratPartners, setStratPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch partners to show in the carousel
    const queryPriv = `*[_type == "partenairePrivilegie"] | order(order asc) {
      name, category, "imageSrc": logo.asset->url
    }`;

    client
      .fetch(queryPriv)
      .then((data) => {
        setPartners(data || []);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
      });

    // Fetch strategic partners
    const queryStrat = `*[_type == "partner" && category == "strategique"] | order(order asc) {
      name, category, "imageSrc": logo.asset->url
    }`;

    client
      .fetch(queryStrat)
      .then((data) => {
        setStratPartners(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error strat:", err);
        setIsLoading(false);
      });
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (partners.length <= 2 || isLoading) return;

    const interval = setInterval(() => {
      const maxIndex = Math.ceil(partners.length / 2) - 1;
      const nextIndex = activeIndex >= maxIndex ? 0 : activeIndex + 1;
      scrollToPage(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [partners, activeIndex, isLoading]);

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

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollAmount = 1000 + 24;
      const newIndex = Math.round(scrollRef.current.scrollLeft / scrollAmount);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  const ecosystems = [
    {
      title: "Sport, Industries Créatives & Influence Culturelle",
      text: "Mobiliser l'influence pour le rayonnement des territoires et des projets.",
    },
    {
      title: "Développement Urbain & Cadre de Vie",
      text: "Aménagement des territoires et création de cadres de vie durables.",
    },
    {
      title: "Infrastructure & Connectivity",
      text: "Ports, aéroports, routes et infrastructures stratégiques.",
    },
    {
      title: "Finance & Investment",
      text: "Diaspora, capitaux internationaux et structuration du capital.",
    },
    {
      title: "Innovation & Technology",
      text: "Smart cities, énergie et innovation appliquée au développement.",
    },
    {
      title: "Capital Humain & Gouvernance",
      text: "Formation, normes, gouvernance et structuration des compétences.",
    },
  ];

  const benefits = [
    {
      icon: <Globe className="w-8 h-8 text-[#00AB92]" />,
      title: "VISIBILITÉ INTERNATIONALE",
      text: "Un rayonnement auprès des acteurs clés du développement africain.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-[#00AB92]" />,
      title: "ACCÈS AUX DÉCIDEURS",
      text: "Des opportunités uniques de rencontres avec les décideurs publics et privés.",
    },
    {
      icon: <Target className="w-8 h-8 text-[#00AB92]" />,
      title: "POSITIONNEMENT PREMIUM",
      text: "Associer votre image à une plateforme d'excellence et d'influence.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#00AB92]" />,
      title: "OPPORTUNITÉS BUSINESS",
      text: "Favoriser les partenariats stratégiques et les collaborations durables.",
    },
  ];

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white overflow-hidden">
      <Helmet>
        <title>Partenaires — Build Africa Expo 2026</title>
        <meta
          name="description"
          content="Découvrez l'écosystème de partenaires engagés de Build Africa Expo 2026."
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
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[16px] md:gap-[24px] min-h-[300px] md:min-h-[356px] mt-[100px] md:mt-[90px] px-[20px]">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[28px] sm:text-[32px] md:text-[48px] leading-[36px] md:leading-[56px] max-w-[900px] animate-fade-up uppercase">
            UN ÉCOSYSTÈME DE PARTENAIRES ENGAGÉS
          </h1>
          <p className="text-white/90 font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[20px] max-w-[700px] animate-fade-up [--animation-delay:200ms]">
            Build Africa Expo rassemble des acteurs institutionnels, financiers
            et techniques engagés dans la transformation durable des
            infrastructures et des territoires du continent.
          </p>
        </div>
      </section>

      {/* Partenaires Privilégiés - Carousel Dynamique */}
      <section className="reveal w-full h-auto mx-auto flex flex-col items-center justify-center px-[20px] py-16 md:py-[120px] bg-[#161D3E]">
        <div className="w-full max-w-[1000px] mx-auto flex flex-col md:flex-col justify-center items-center mb-10 gap-4">
          <h1 className="text-[#fff] text-[32px] mx-auto md:text-[64px] font-['Tomorrow'] uppercase leading-[42px] md:leading-[72px] font-bold">
            Partenaires Premium
          </h1>
        </div>

        {!isLoading && partners.length === 0 && (
          <div className="text-white/60 text-center mt-10">
            Aucun partenaire trouvé. <br />
            Veuillez ajouter des partenaires dans votre Studio Sanity.
          </div>
        )}

        {!isLoading && partners.length > 0 && (
          <>
            <div className="max-w-[1000px] w-full overflow-hidden">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-[24px] overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              >
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex-none w-full md:w-[488px] snap-start"
                  >
                    <Card className="animate-fade-in-up opacity-0 h-full overflow-hidden rounded-none border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="h-[250px] md:h-[300px] w-full bg-white flex items-center justify-center p-8 overflow-hidden">
                          <img
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                            src={
                              partner.imageSrc ||
                              "https://via.placeholder.com/400x400?text=Logo"
                            }
                            alt={partner.name}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-[8px] p-[16px] border-b-4 border-transparent transition-colors duration-300 group-hover:border-[#00AB92] border-t-4 border-t-[#00AB92]">
                          <div className="w-fit bg-[#00AB92] py-[4px] px-[8px] flex items-center rounded-[4px]">
                            <span className="text-[#fff] font-['inter'] uppercase font-bold text-[10px]">
                              {partner.category || "Partenaire"}
                            </span>
                          </div>
                          <h3 className="font-bold font-['tomorrow'] text-[24px] leading-[32px] text-[#1d1d1b]/100">
                            {partner.name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            {partners.length > 2 && (
              <div className="flex gap-2 mt-8">
                {Array.from({ length: Math.ceil(partners.length / 2) }).map(
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

      {/* Partenaires Stratégiques */}
      <section className="reveal w-full px-[20px] md:py-[120px] bg-[#D7DBEB]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h4 className="text-[#00A99D] font-['Tomorrow'] font-bold text-[20px] leading-[24px] mb-2 uppercase">
              ACTEURS CLÉS
            </h4>
            <h2 className="text-[#1D1D1B] text-[24px] md:text-[32px] font-['Tomorrow'] uppercase font-bold">
              PARTENAIRES STRATÉGIQUES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stratPartners.map((item, index) => (
              <Card
                key={index}
                className="rounded-none border-0 bg-white p-[16px] md:p-[24px] transition-all duration-300 hover:shadow-lg flex flex-col gap-[16px] md:gap-[24px]"
              >
                <div className="flex items-center gap-2 h-12">
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="h-full w-auto object-contain"
                    />
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-[#00AB92] bg-transparent"></div>
                      <h4 className="text-[#1D1D1B] font-bold text-sm uppercase">
                        {item.name}
                      </h4>
                    </>
                  )}
                </div>
                <div className="w-fit bg-[#D2D2D1] px-[8px] rounded-[4px] py-[4px]">
                  <p className="text-[#343432] font-bold text-[10px] tracking-wider uppercase">
                    {item.category || "STRATÉGIQUE"}
                  </p>
                </div>
                {item.description && (
                  <p className="text-[#4B5570] w-fit md:max-w-[293px] text-[14px] font-medium  font-['Inter'] leading-[20px]">
                    {item.description}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Écosystème */}
      <section className="reveal w-full hidden  py-16 md:py-[120px] bg-white">
        <div className="max-w-[1440px] mx-auto px-[20px]">
          <div className="max-w-[800px] mb-16">
            <h4 className="text-[#00A99D] font-['Tomorrow'] font-bold text-[20px] leading-[24px] mb-2 uppercase">
              Écosystème
            </h4>
            <h2 className="text-[#1D1D1B] text-[28px] md:text-[40px] font-['Tomorrow'] uppercase font-bold leading-tight mb-8">
              UN RÉSEAU AU CROISEMENT DES INVESTISSEMENTS ET DES TERRITOIRES
            </h2>
            <p className="text-[#343432] font-['Inter'] leading-relaxed">
              Build Africa Expo est conçu pour devenir une plateforme durable de
              dialogue, d’influence, de rencontres et de développement autour
              des grands enjeux de transformation du continent africain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24">
            {ecosystems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 pl-6 border-l-4 border-[#36499B]"
              >
                <h3 className="font-['Tomorrow'] font-bold text-[18px] text-[#1D1D1B] uppercase">
                  {item.title}
                </h3>
                <p className="font-['Inter'] font-normal text-sm text-[#343432]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dimension Internationale */}
      <section className="reveal w-full bg-[#36499B] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-[300px] md:h-auto">
            <img
              src="https://cdn.sanity.io/images/d4jrc26i/production/2698bd3e3aa44f2d67f0e311851800fc2d8a8498-1080x720.jpg"
              alt="World Map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-12 md:p-24 mx-auto flex flex-col justify-center items-center">
            <div className=" md:w-[486px]">
              <p className="text-[#00A99D] font-['Tomorrow'] font-bold text-[20px] leading-[24px] mb-4 uppercase">
                DIMENSION INTERNATIONALE
              </p>
              <h2 className="text-white md:w-[486px] text-[28px] md:text-[32px] font-['Tomorrow'] uppercase font-bold leading-[40px] mb-8">
                Connecter les partenaires aux dynamiques africaines
              </h2>
              <p className="text-white md:w-[486px] font-['Inter'] text-[16px] leading-[20px]">
                Build Africa Expo permet d'identifier des partenaires
                stratégiques, de faciliter les échanges entre les acteurs
                internationaux et les projets africains à fort impact, créant
                ainsi une dynamique vertueuse pour le développement du
                continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi Devenir Partenaire */}
      <section className="reveal w-full px-[20px] md:py-[120px] bg-[#00AB92]">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#36499B] text-[28px] md:text-[32px] leading-[40px] font-['Tomorrow'] uppercase font-bold">
              POURQUOI DEVENIR PARTENAIRE ?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-[#CCEEE9] rounded-full flex items-center justify-center mb-6 shadow-lg">
                  {benefit.icon}
                </div>
                <h4 className="text-white text-[20px] leading-[24px] font-['Tomorrow'] font-bold mb-4 uppercase">
                  {benefit.title}
                </h4>
                <p className="text-white/70 text-[16px] leading-[20px] font-['Inter']">
                  {benefit.text}
                </p>
              </div>
            ))}
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

            <div className="mx-auto flex justify-center items-center  animate-fade-in  animate-delay-200  animate-duration-1000 2 gap-[24px]">
              <Button className="w-full md:w-auto mx-auto   h-[48px] bg-[#36499B] font-bold px-[32px] rounded-[8px] py-[16px] text-white hover:bg-[#202C5D]/100 focus-visible:ring-[#202C5D]">
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
