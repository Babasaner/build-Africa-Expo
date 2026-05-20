import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { client } from "../../lib/sanity";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { PartnersShowcaseSection } from "../BaeHome/sections/PartnersShowcaseSection";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { T } from "../../lib/AutoTranslate";
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
  Check,
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
      title: "Institutions & Secteur Public",
      text: "Agences publiques, gouvernements, collectivités, organisations internationales et acteurs institutionnels accompagnant les transformations du continent.",
      image:
        "https://cdn.sanity.io/images/d4jrc26i/production/3ab28a771f53c64e1056010b42772a579595536a-1264x705.png",
    },
    {
      title: "Sport, Industries Créatives & Attractivité",
      text: "Sport, grands événements internationaux, médias, audiovisuel, musique, mode, contenus digitaux et industries culturelles comme leviers d'influence.",
      image:
        "https://cdn.sanity.io/images/d4jrc26i/production/35a0f34241921d36e650c9c38188551965e8892e-672x378.jpg",
    },
    {
      title: "Infrastructures & Développement Urbain",
      text: "Construction, mobilité, énergie, VRD, urbanisme, assainissement, logement et infrastructures stratégiques.",
      image:
        "https://cdn.sanity.io/images/d4jrc26i/production/8857c459e6cb26217702a2b3bb01cbec8c96ad82-672x448.jpg",
    },
    {
      title: "Innovation & Technologie",
      text: "Smart cities, mobilité intelligente, data, plateformes digitales et technologies appliquées au développement africain.",
      image:
        "https://cdn.sanity.io/images/d4jrc26i/production/cf9f90e9bee395fd5cfe8b9d361e09d663ac3d5e-672x448.jpg",
    },
    {
      title: "Finance & Investissements",
      text: "Banques, fonds d'investissement et partenaires du financement africain.",
      image:
        "https://cdn.sanity.io/images/d4jrc26i/production/bd56213318b622e22bcbfd1f05b08e25692c982f-672x448.jpg",
    },
    {
      title: "Médias & Influence",
      text: "Presse, plateformes médias, communication, production de contenus et acteurs de visibilité internationale.",
      image:
        "https://cdn.sanity.io/images/d4jrc26i/production/1fbb9e8cab3d2be0ee2e1f8e11ef369dcdfc92e7-671x448.jpg",
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
            <T>UN ÉCOSYSTÈME DE PARTENAIRES ENGAGÉS</T>
          </h1>
          <p className="text-white/90 font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[20px] max-w-[700px] animate-fade-up [--animation-delay:200ms]">
            <T>Build Africa Expo rassemble des acteurs institutionnels, financiers et techniques engagés dans la transformation durable des infrastructures et des territoires du continent.</T>
          </p>
        </div>
      </section>

      {/* Partenaires Privilégiés - Carousel Dynamique */}
      <section className="reveal w-full h-auto mx-auto flex flex-col items-center justify-center px-[20px] py-16 md:py-[120px] bg-[#161D3E]">
        <div className="w-full max-w-[1000px] mx-auto flex flex-col md:flex-col justify-center items-center mb-10 gap-4">
          <h1 className="text-[#fff] text-[32px] mx-auto md:text-[64px] font-['Tomorrow'] uppercase leading-[42px] md:leading-[72px] font-bold">
            <T>PARTENAIRES PREMIUM</T>
          </h1>
        </div>

        {!isLoading && partners.length === 0 && (
          <div className="text-white/60 text-center mt-10">
            Aucun partenaire trouvé. <br />
          </div>
        )}

        {!isLoading && partners.length > 0 && (
          <>
            <div className="max-w-[1000px] w-full overflow-hidden">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-[24px] overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-[10px]"
              >
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex-none w-full md:w-[488px] snap-start"
                  >
                    <Card className="animate-fade-in-up opacity-0 h-full overflow-hidden rounded-[16px] border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="h-[250px] md:h-[300px] w-full bg-white flex items-center justify-center p-[40px] md:p-[60px] overflow-hidden">
                          <img
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                            src={
                              partner.imageSrc ||
                              "https://via.placeholder.com/400x400?text=Logo"
                            }
                            alt={partner.name}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {partners.length > 2 && (
              <div className="flex gap-[16px] mt-8">
                <button
                  onClick={() =>
                    scrollToPage(
                      activeIndex > 0
                        ? activeIndex - 1
                        : Math.ceil(partners.length / 2) - 1,
                    )
                  }
                  className="w-[32px] h-[32px] rounded-[8px] bg-[#36499B] flex items-center justify-center text-white hover:bg-[#2A3A80] transition-colors"
                  aria-label="Previous"
                >
                  <span className="text-[16px]">
                    {
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.86131 4.19531L5.05664 7.99998L8.86131 11.8046L9.80397 10.862L6.94197 7.99998L9.80397 5.13798L8.86131 4.19531Z"
                          fill="#D7DBEB"
                        />
                      </svg>
                    }
                  </span>
                </button>
                <button
                  onClick={() =>
                    scrollToPage(
                      activeIndex < Math.ceil(partners.length / 2) - 1
                        ? activeIndex + 1
                        : 0,
                    )
                  }
                  className="w-[32px] h-[32px] rounded-[8px] bg-[#36499B] flex items-center justify-center text-white hover:bg-[#2A3A80] transition-colors"
                  aria-label="Next"
                >
                  <span className="text-[16px]">
                    {
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.05664 4.19531L8.86131 7.99998L5.05664 11.8046L4.11397 10.862L6.97597 7.99998L4.11397 5.13798L5.05664 4.19531Z"
                          fill="#D7DBEB"
                        />
                      </svg>
                    }
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Text Resau part*/}

      <section className="relative w-full px-[20px] py-[120px] animate-fade-in animate-delay-200 animate-duration-1000 flex items-center justify-center  bg-white overflow-hidden">
        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[16px] md:gap-[24px] ">
          <h2 className="text-[#1D1D1B] font-['Tomorrow'] font-bold text-[28px] sm:text-[32px] md:text-[48px] leading-[36px] md:leading-[56px] w-fit md:w-[75%] animate-fade-up uppercase">
            <T>Un réseau au croisement des investissements et des territoires</T>
          </h2>
          <p className="text-[#1D1D1B] font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[20px] w-fit md:w-[75%] animate-fade-up [--animation-delay:200ms]">
            <T>Build Africa Expo développe un écosystème de partenaires issus des secteurs de la finance, des infrastructures, de la mobilité, de l'énergie, de l'innovation, du sport, des industries créatives et du développement territorial afin de favoriser les connexions à forte valeur autour du continent africain.</T>
          </p>
        </div>
      </section>

      {/*  Six écosystèmes au service de la transformation africaine*/}
      <section className="relative w-full px-[20px] py-[120px] bg-[#D7DBEB] animate-fade-in animate-delay-200 animate-duration-1000 flex items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[40px] md:gap-[60px]">
          <h2 className="text-[#1D1D1B] font-['Tomorrow'] font-bold text-[28px] sm:text-[32px] md:text-[48px] leading-[36px] md:leading-[56px] w-fit md:w-[75%] animate-fade-up uppercase">
            <T>Six écosystèmes au service de la transformation africaine</T>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {ecosystems.map((item, index) => (
              <Card
                key={index}
                className="rounded-none border-0 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow p-[24px] duration-300 gap-[16px] flex flex-col"
              >
                <div className="w-full h-[220px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-[16px]">
                  <h3 className="font-['Inter'] font-bold text-[16px] leading-[20px] text-[#1D1D1B]">
                    <T>{item.title}</T>
                  </h3>
                  <p className="font-['Inter'] text-[16px] font-medium leading-[20px] text-[#343432]">
                    <T>{item.text}</T>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Des projets structurants au cœur des transformations africaines */}

      <section className="reveal w-full w-full animate-fade-in  animate-delay-200  animate-duration-1000  py-[120px] px-[20px]  md:py-24 bg-[#fff]">
        <div className="max-w-[1440px] mx-auto  flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ">
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex max-w-[450px] gap-[24px]">
              <h3 className="text-[#1D1D1B] uppercase flex flex-col uppercase text-[32px] gap-[8px]  font-bold leading-[40px]">
                <T>Des projets structurants au cœur des transformations africaines</T>
              </h3>
            </div>

            <div className="text-[#343432] font-['Inter'] font-normal text-[16px] md:text-[16px] leading-[20px] max-w-[530px] animate-fade-up [--animation-delay:200ms]">
              <T>Build Africa Expo met également en lumière des projets d'envergure participant à la transformation économique, urbaine et infrastructurelle du continent africain.</T>
              <p className="text-[#343432] font-['Inter'] mt-4 font-normal text-[16px] md:text-[16px] leading-[20px] max-w-[530px] animate-fade-up [--animation-delay:200ms]">
                <T>Programmes immobiliers d'exception, smart cities, grands projets d'infrastructures, hubs logistiques, mobilité, tourisme, énergie, urbanisation et équipements stratégiques illustrent les nouvelles dynamiques d'attractivité et de développement portées par l'Afrique.</T>
              </p>
              <p className="text-[#343432] font-['Inter'] mt-4 font-normal text-[16px] md:text-[16px] leading-[20px] max-w-[530px] animate-fade-up [--animation-delay:200ms]">
                <T>La plateforme ambitionne de favoriser les connexions entre investisseurs, institutions, diaspora et porteurs de projets autour d'opportunités à fort impact économique et territorial.</T>
              </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="w-full h-auto  animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300  overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[40px] bg-contain bg-no-repeat bg-center">
              <img
                src="https://cdn.sanity.io/images/d4jrc26i/production/e27ce23a4552ec579a9e4b512320934ab2166eba-588x528.png"
                alt="Frame Build Africa Expo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOUVERAINETÉ ÉCONOMIQUE */}
      <section className="reveal w-full py-[120px] px-[20px] bg-[#EEF2FF]">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[120px]">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-[24px]">
            <h4 className="text-[#00A99D] font-['Tomorrow'] font-bold text-[18px] md:text-[20px] leading-[24px] uppercase">
              <T>SOUVERAINETÉ ÉCONOMIQUE</T>
            </h4>
            <h2 className="text-[#1D1D1B] text-[28px] md:text-[32px] font-['Tomorrow'] uppercase font-bold leading-[36px] md:leading-[40px]">
              <T>INDUSTRIALISATION, SOUVERAINETÉ ÉCONOMIQUE ET PROJETS STRATÉGIQUES</T>
            </h2>
            <div className="text-[#343432] font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[22px] flex flex-col gap-[16px]">
              <p><T>Build Africa Expo s'intéresse également aux grands projets industriels, énergétiques et stratégiques qui participent au repositionnement économique du continent africain.</T></p>
              <p><T>La plateforme souhaite mettre en avant les dynamiques liées à l'industrialisation, à la transformation locale, au développement des PME/PMI, aux investissements de la diaspora ainsi qu'aux grands projets structurants capables d'accompagner la souveraineté économique et énergétique des États africains.</T></p>
              <p><T>Des initiatives majeures dans les secteurs de l'énergie, des ressources naturelles, des infrastructures aéroportuaires, portuaires, logistiques et industrielles illustrent les nouvelles ambitions du continent en matière de transformation endogène, de création de valeur locale et de compétitivité internationale.</T></p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[450px] flex flex-col gap-[16px]">
            {[
              "Industrialisation & PME/PMI",
              "Énergie & ressources naturelles",
              "Infrastructures stratégiques",
              "Investissement diaspora",
            ].map((item, index) => (
              <div
                key={index}
                className="w-full bg-[#D8F0EA] p-[16px] flex items-center gap-[16px]"
              >
                <div className="min-w-[32px] w-[32px] h-[32px] rounded-[8px] border-[1px] border-[#36499B] flex items-center justify-center bg-transparent">
                  <Check strokeWidth={3} className="w-4 h-4 text-[#36499B]" />
                </div>
                <h4 className="text-[#1D1D1B] font-['Inter'] font-bold text-[14px] md:text-[20px] leading-[20px]">
                  <T>{item}</T>
                </h4>
              </div>
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
      <section className="reveal w-full bg-[#FFFFFF] py-[120px] px-[20px]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-32">
          <div className="w-full">
            <img
              src="https://cdn.sanity.io/images/d4jrc26i/production/722f028c11bd76dce3cb57671a92adee6f21ac2c-454x265.png"
              alt="World Map"
              className="w-full md:w-full h-full md:h-[331px] object-cover"
            />
          </div>

          <div className="w-full">
            <img
              src="https://cdn.sanity.io/images/d4jrc26i/production/011b92b1ff87daff05db64eb203fe1d8e736a31c-454x313.png"
              alt="World Map"
              className="w-full md:w-full h-full md:h-[331px] object-cover object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Senegal 2050*/}
      <section className="reveal w-full px-[20px] bg-[#36499B] py-[120px]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24">
          <div className="w-full md:w-[450px]">
            <h2 className="text-[#fff] font-['Tomorrow'] font-bold text-[32px] leading-[40px] mb-2 uppercase">
              <T>Territoires, pôles de développement et vision Sénégal 2050</T>
            </h2>
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <p className="text-[#fff] font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[22px]">
              <T>À travers cette approche, Build Africa Expo ambitionne de favoriser les connexions entre territoires, institutions, investisseurs, diaspora et acteurs privés afin d'accompagner les nouvelles dynamiques de développement et de structuration du continent africain.</T>
            </p>
            <p className="text-[#fff] font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[22px]">
              <T>Dans cette perspective, la plateforme met en lumière les pôles de développement du Plan Sénégal 2050, pensés comme des moteurs de croissance, d'industrialisation, de connectivité, d'innovation et de valorisation des territoires.</T>
            </p>
          </div>
        </div>
      </section>

      {/* Capital global */}

      <section className="reveal w-full animate-fade-in  animate-delay-200  animate-duration-1000  bg-[#161D3E]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[0px] w-full mx-auto">
          {/* Card 1: Diaspora */}
          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/08956dea00cddad651d0fec8e79a4538c5d002c6-1364x910.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] w-[100%] md:w-[250px] font-['Tomorrow'] font-bold uppercase">
                <T>Capital humain & formation</T>
              </h3>
            </div>
          </div>

          {/* Card 2: International Investment */}
          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/85f930515388370e289fe06ab31b6b2c3823b5cc-720x480.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] w-[100%] md:w-[250px] font-['Tomorrow'] font-bold uppercase">
                <T>INFRASTRUCTURES ET ENERGIES</T>
              </h3>
            </div>
          </div>

          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/0f8e5ab77bca4d8ad4ed3e080d77338f1c71db8f-720x540.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] w-[100%] md:w-[250px] font-['Tomorrow'] font-bold uppercase">
                <T>Urbanisation & habitat</T>
              </h3>
            </div>
          </div>

          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/a09040ca48d4bd1c789b0fb5b0a6112b4c4f30a7-720x480.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white w-[100%] md:w-[250px]  text-[24px] font-['Tomorrow'] font-bold uppercase">
                Industrie & transformation
              </h3>
            </div>
          </div>

          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/fe64667476ef49999173d8c8d8f71cdc33bc4540-720x480.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white w-[100%] md:w-[250px]  text-[24px] font-['Tomorrow'] font-bold uppercase">
                mobilité & connectivité
              </h3>
            </div>
          </div>
          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/f5d2fbe2fb8df6b53b1a3b06a0a740f98fc175c2-720x540.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white w-[100%] md:w-[300px]  text-[24px] font-['Tomorrow'] font-bold uppercase">
                Ports & corridors logistiques
              </h3>
            </div>
          </div>
          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/e4c1c11f11c42d9c464c44a8c777700f29eed31a-719x539.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white w-[100%] md:w-[250px]  text-[24px] font-['Tomorrow'] font-bold uppercase">
                Agriculture & agro-industrie
              </h3>
            </div>
          </div>
          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/75b1364d928bc833975d5c33cabd6e23f5c9a68a-720x483.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white w-[100%] md:w-[250px]  text-[24px] font-['Tomorrow'] font-bold uppercase">
                Tourisme & attractivité
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Connecter AFRIK */}

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
                <T>Rejoignez le réseau qui bâtit l'Afrique de demain.</T>
              </h2>
            </div>

            <div className="mx-auto flex justify-center items-center  animate-fade-in  animate-delay-200  animate-duration-1000 2 gap-[24px]">
              <Button className="w-full md:w-auto mx-auto   h-[48px] bg-[#36499B] font-bold px-[32px] rounded-[8px] py-[16px] text-white hover:bg-[#202C5D]/100 focus-visible:ring-[#202C5D]">
                <T>DEVENIR PARTENAIRE DU FORUM</T>
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
