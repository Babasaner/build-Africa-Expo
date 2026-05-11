import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  Building2,
  MapPin,
  Truck,
  ShieldCheck,
  Globe,
  Users,
  ArrowRight,
} from "lucide-react";

export const Salon = () => {
  useScrollReveal();

  const pillars = [
    {
      title: "Développement urbain et qualité de vie",

      description:
        "Aménagement des territoires et création de cadres de vie durables.",
      bg: "bg-[#36499B]",
    },
    {
      title: "Mobilité, Services Publics & Réseaux",

      description:
        "Infrastructures de transport et accès aux services essentiels.",
      bg: "bg-[#00AB92]",
    },
    {
      title: "Infrastructures à Grande Échelle",

      description:
        "Grands projets structurants pour la croissance continentale.",
      bg: "bg-[#36499B]",
    },
    {
      title: "Normes & Réglementations",

      description: "Cadre législatif et standards de qualité internationaux.",
      bg: "bg-[#00AB92]",
    },
  ];

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white overflow-hidden">
      <Helmet>
        <title>Le Salon — Build Africa Expo 2026</title>
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
        className="relative w-full min-h-[50vh] md:min-h-[50vh]  flex items-center pt-[80px] pb-[50px] justify-center overflow-hidden"
        style={{
          background: "linear-gradient(92.26deg, #36499B 0.24%, #00AB92 100%)",
        }}
      >
        <div className="w-full max-w-[1440px] flex flex-col justify-center gap-[24px]  min-h-[356px] mt-[120px] md:mt-[90px] px-[20px]">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] max-w-[900px] animate-fade-up">
            Repositionner l’Afrique au cœur des grandes mutations du monde
          </h1>
          <p className="text-white/90 font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[20px] max-w-[700px] animate-fade-up [--animation-delay:200ms]">
            Build Africa Expo est une plateforme internationale portée par
            Sovereign Insight Group, créée pour connecter investisseurs,
            institutions, diaspora et territoires africains autour des grandes
            transformations urbaines, économiques et infrastructurelles du
            continent.
          </p>
        </div>
      </section>

      {/* Section 2 — Presentation */}
      <section className="reveal w-full max-w-[1440px]  py-16  md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto  flex flex-col lg:flex-row items-center gap-12 lg:gap-24 px-[20px]">
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex gap-[24px]">
              <h2 className="text-[#00AB92] flex flex-col uppercase text-[20px] gap-[8px]  font-bold leading-[24px]">
                Plus qu’un salon. <br />
                <span className="text-[#1D1D1B] font-bold text-[32px] font-['Tomorrow'] font-bold leading-[40px]">
                  UNE PLATEFORME <br />
                  STRATÉGIQUE.
                </span>
              </h2>
            </div>

            <p className="text-[#343432] font-['Inter'] font-normal text-[16px] md:text-[16px] leading-[20px] max-w-[470px] animate-fade-up [--animation-delay:200ms]">
              Build Africa Expo a été créé pour devenir une plateforme durable
              de dialogue, d’influence, de rencontres et de développement autour
              des grands enjeux de transformation du continent africain.
            </p>

            <p className="text-[#343432] font-['Inter'] font-normal text-[16px] md:text-[16px] leading-[20px] max-w-[470px] animate-fade-up [--animation-delay:200ms]">
              Inspiré dans son esprit par des plateformes internationales, cet
              événement se positionne autour du développement urbain, des
              infrastructures, des investissements et de l’avenir des
              territoires africains.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src="ImageSection.png"
              alt="Build Africa Expo Presentation"
              className="w-full h-auto shadow-2xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="reveal w-full px-[20px] py-[120px] bg-[#161D3E]">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-left mb-16">
            <h2 className="text-[#fff] text-[32px] md:text-[64px] font-['Tomorrow']  leading-[42px] md:leading-[70px] uppercase font-bold mb-4 ">
              Les grands piliers de transformation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {pillars.map((pillar, index) => (
              <Card
                key={index}
                className={`${pillar.bg} border-none rounded-none animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group`}
              >
                <CardContent className="p-10 flex flex-col gap-6 h-full min-h-[176px] justify-between">
                  <div>
                    <h3 className="text-white uppercase text-[20px] leading-[24px] font-bold mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-white/100 font-['Inter'] font-normal text-[16px] leading-[20px]">
                      {pillar.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capital global */}

      <section className="reveal w-full px-[20px] py-[120px] bg-[#fff]">
        <div className="max-w-[1440px] mx-auto ">
          <div className="text-center mb-16 flex flex-col items-center max-w-[800px] mx-auto gap-[8px]">
            <h2 className="text-[#00A99D] text-[20px] font-['Tomorrow']  leading-[24px] uppercase font-bold ">
              INGÉNIERIE FINANCIÈRE
            </h2>
            <h2 className="text-[#1D1D1B] text-[32px] font-['Tomorrow'] uppercase  leading-[56px] uppercase font-bold ">
              Structurer le capital global.
            </h2>

            <p className=" text-[#343432] text-[16px] font-['inter']  leading-[20px] font-[400] font-normal ">
              Pour soutenir des projets d'infrastructures à grande échelle, nous
              facilitons l'accès aux mécanismes financiers essentiels, reliant
              les porteurs de projets aux pools de liquidités mondiaux.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] max-w-[1440px] mx-auto">
          {/* Card 1: Diaspora */}
          <div
            className="w-full h-[300px] flex flex-col justify-end pb-[40px] pt-[120px] px-[40px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/08956dea00cddad651d0fec8e79a4538c5d002c6-1364x910.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] font-['Tomorrow'] font-bold uppercase">
                Engagement de la diaspora
              </h3>
              <p className="text-white/100 text-[16px] font-['Inter'] font-normal leading-[20px] max-w-[470px]">
                Mobiliser l'expertise et les ressources de la diaspora africaine
                pour des investissements à fort impact.
              </p>
            </div>
          </div>

          {/* Card 2: International Investment */}
          <div
            className="w-full h-[300px] flex flex-col justify-end pb-[40px] pt-[120px] px-[40px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/3d8dc63778af67623f97a6b186b01ac511f45205-1143x755.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] font-['Tomorrow'] font-bold uppercase">
                Investissements internationaux
              </h3>
              <p className="text-white/100 text-[16px] font-['Inter'] font-normal leading-[20px] max-w-[470px]">
                Attirer les fonds d'investissement mondiaux et les capitaux
                institutionnels vers des projets structurants.
              </p>
            </div>
          </div>

          <div
            className="w-full h-[300px] flex flex-col justify-end pb-[40px] pt-[120px] px-[40px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/55821e6e1716efef8192a2d26dfbc6aa527613f0-1300x535.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] font-['Tomorrow'] font-bold uppercase">
                Capital Global & Vert
              </h3>
              <p className="text-white/100 text-[16px] font-['Inter'] font-normal leading-[20px] max-w-[470px]">
                Faciliter l'accès aux financements innovants, fonds climatiques
                et mécanismes de développement durable.
              </p>
            </div>
          </div>

          <div
            className="w-full h-[300px] flex flex-col justify-end pb-[40px] pt-[120px] px-[40px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/64b1e607235d7c13283e8ef2b226bf7b67678fea-1600x1067.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] font-['Tomorrow'] font-bold uppercase">
                Alliances Stratégiques
              </h3>
              <p className="text-white/100 text-[16px] font-['Inter'] font-normal leading-[20px] max-w-[470px]">
                Forger des synergies public-privé (PPP) et des consortiums pour
                accélérer le développement territorial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <section className="reveal w-full px-[20px] py-[120px] bg-[#D7DBEB]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-1 gap-[24px]">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-[40px]">
            <div className="mx-auto w-full flex justify-center ">
              <img
                src="https://cdn.sanity.io/images/d4jrc26i/production/ab921f141d395b251b22adba3de8ab84f3fdf52b-48x48.svg"
                alt=""
              />
            </div>
            <div className="text-center">
              <h2 className="text-[#202C5D] text-[32px] md:text-[64px] font-['Tomorrow'] uppercase  leading-[42px] md:leading-[72px] font-bold ">
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
