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
        className="relative w-full min-h-[40vh] md:min-h-[50vh] animate-fade-in animate-delay-200 animate-duration-1000 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(92.26deg, #36499B 0.24%, #00AB92 100%)",
        }}
      >
        {/* Subtle Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[16px] md:gap-[24px] min-h-[300px] md:min-h-[356px] mt-[100px] md:mt-[90px] px-[20px]">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[28px] sm:text-[32px] md:text-[48px] leading-[36px] md:leading-[56px] max-w-[900px] animate-fade-up uppercase">
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
      <section className="reveal w-full max-w-[1440px] animate-fade-in  animate-delay-200  animate-duration-1000  py-16  md:py-24 bg-white">
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
            <div
              className="w-full h-[340px] md:h-[520px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300  overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[40px] bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage:
                  "url('https://cdn.sanity.io/images/d4jrc26i/production/20a65e6dbb5cd552757b8febb7af96c18767d2b4-572x525.png')",
              }}
            >
              <div className="flex flex-col items-center gap-[8px]">
                <h4 className="text-white text-[20px] font-['Tomorrow'] font-bold uppercase">
                  Connecter les capitaux à la vision.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital global */}

      <section className="reveal w-full animate-fade-in  animate-delay-200  animate-duration-1000 pt-[80px] bg-[#161D3E]">
        <div className="w-full mx-auto ">
          <div className="text-center mb-16 px-[20px] flex flex-col items-center max-w-[800px] mx-auto gap-[8px]">
            <h2 className="text-[#fff] text-[32px]  font-['Tomorrow'] uppercase  leading-[56px] uppercase font-bold ">
              Les grands piliers de transformation
            </h2>

            <p className=" text-[#fff] text-[16px] font-['inter']  leading-[20px] font-[400] font-normal ">
              Pour soutenir des projets d'infrastructures à grande échelle, nous
              facilitons l'accès aux mécanismes financiers essentiels, reliant
              les porteurs de projets aux pools de liquidités mondiaux.
            </p>
          </div>
        </div>

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
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/3d8dc63778af67623f97a6b186b01ac511f45205-1143x755.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] w-[100%] md:w-[250px] font-['Tomorrow'] font-bold uppercase">
                Investissements internationaux
              </h3>
              <p className="text-white/100 text-[16px] font-['Inter'] font-normal leading-[20px] max-w-[470px]">
                Attirer les fonds d'investissement mondiaux et les capitaux
                institutionnels vers des projets structurants.
              </p>
            </div>
          </div>

          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/55821e6e1716efef8192a2d26dfbc6aa527613f0-1300x535.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white text-[24px] w-[100%] md:w-[250px] font-['Tomorrow'] font-bold uppercase">
                Capital Global & Vert
              </h3>
              <p className="text-white/100 text-[16px] font-['Inter'] font-normal leading-[20px] max-w-[470px]">
                Faciliter l'accès aux financements innovants, fonds climatiques
                et mécanismes de développement durable.
              </p>
            </div>
          </div>

          <div
            className="w-full h-[300px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-end pb-[20px] pt-[120px] px-[20px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%), url('https://cdn.sanity.io/images/d4jrc26i/production/64b1e607235d7c13283e8ef2b226bf7b67678fea-1600x1067.jpg')",
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-white w-[100%] md:w-[250px]  text-[24px] font-['Tomorrow'] font-bold uppercase">
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

      {/* Connecter AFRIK */}

      <section className="reveal w-full px-[20px] py-16 md:py-[120px] bg-[#D7DBEB] animate-fade-in  animate-delay-200  animate-duration-1000">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[40px] mx-auto max-w-[1440px]">
          <div className="w-full">
            <img
              src="https://cdn.sanity.io/images/d4jrc26i/production/efb62654f4a0b09b123d7a36060fdf9e9553557d-588x520.png"
              alt="Build Africa Future"
              srcset=""
            />
          </div>
          <div className="w-full lg:w-[500px] flex flex-col justify-start gap-[40px]">
            <h1 className="text-[#1D1D1B] text-[28px] md:text-[40px] leading-[36px] md:leading-[48px] font-['Tomorrow'] font-bold uppercase">
              Connecter l’Afrique aux dynamiques mondiales
            </h1>

            <p className="text-[#343432] text-[16px] font-['Inter'] font-normal leading-[20px] w-full lg:w-[483px] flex flex-col justify-start gap-[10px]">
              L’Afrique connaît aujourd’hui une phase majeure de transformation
              portée par l’urbanisation, les infrastructures, la mobilité,
              l’énergie, l’innovation, la finance et le capital humain.
              <p>
                Build Africa Expo a été conçu pour accompagner et structurer ces
                dynamiques en créant des connexions entre acteurs publics,
                privés, investisseurs internationaux, institutions et diaspora
                africaine.
              </p>
              <p>
                La plateforme ambitionne de contribuer à l’attractivité, à la
                compétitivité et au développement durable du continent.
              </p>
            </p>
          </div>
        </div>
      </section>

      {/* ENTREPRISES INVITÉES Section */}
      <section className="reveal w-full px-[20px] py-16 md:py-[120px] bg-[#fff]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
          <div className="text-center">
            <h2 className="text-[#202C5D] text-[32px] md:text-[48px] font-['Tomorrow'] uppercase font-bold leading-tight">
              ENTREPRISES INVITÉES
            </h2>
          </div>

          <div className="w-full mx-auto flex flex-col">
            <img
              src="https://cdn.sanity.io/images/d4jrc26i/production/a7eaf2af72e6e31dfe724f15eb9f7a60345cc1d4-1308x770.png"
              alt="entreprises invites "
            />
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
