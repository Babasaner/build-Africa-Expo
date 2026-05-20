import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLanguage } from "../../lib/i18n";
import { AudienceEngagementSection } from "./sections/AudienceEngagementSection";
import { CojojSection } from "./sections/CojojSection";
import { CountryOverviewSection } from "./sections/CountryOverviewSection";
import { EventAgendaSection } from "./sections/EventAgendaSection";
import { ExpertSpeakersGridSection } from "./sections/ExpertSpeakersGridSection";
import { ExpertTestimonialsSection } from "./sections/ExpertTestimonialsSection";
import { ForumInsightsSection } from "./sections/ForumInsightsSection";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { KeyMetricsStripSection } from "./sections/KeyMetricsStripSection";
import { NewsroomHighlightsSection } from "./sections/NewsroomHighlightsSection";
import { ParticipationCalloutSection } from "./sections/ParticipationCalloutSection";
import { PartnersShowcaseSection } from "./sections/PartnersShowcaseSection";
import { VideoPresentationSection } from "./sections/VideoPresentationSection";
import EntrepriseInvite from "./sections/EntrepriseInvite";

export const BaeHome = () => {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white">
      <Helmet>
        <title>{t("seo.titleHome")}</title>
        <meta name="description" content={t("seo.descriptionHome")} />
        <meta
          name="keywords"
          content="Build Africa Expo, investissement Afrique, diaspora africaine, développement urbain, infrastructure Afrique, 2026"
        />
        <meta property="og:title" content="Build Africa Expo 2026" />
        <meta
          property="og:description"
          content={t("seo.descriptionHome")}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />

      <div className="w-full" id="accueil">
        <HeroBannerSection />
      </div>

      <div id="intervenants" className="reveal w-full">
        <ExpertSpeakersGridSection />
      </div>

      <div className="reveal w-full hidden">
        <ParticipationCalloutSection />
      </div>

      <div id="a-propos" className="reveal w-full">
        <CountryOverviewSection />
      </div>

      <div className="reveal w-full">
        <KeyMetricsStripSection />
      </div>

      <div className="w-full">
        <VideoPresentationSection />
      </div>

      <div className="reveal w-full">
        <CojojSection />
      </div>

      <div className="reveal w-full">
        <ExpertTestimonialsSection />
      </div>

      <div className="reveal w-full">
        <EventAgendaSection />
      </div>

      <div className="reveal w-full hidden">
        <AudienceEngagementSection />
      </div>

      <div id="partenaires" className="reveal w-full">
        <PartnersShowcaseSection />
      </div>
      <div id="entrepriseinvite" className="reveal w-full">
        <EntrepriseInvite />
      </div>
      <div id="newsroom" className="reveal w-full">
        <NewsroomHighlightsSection />
      </div>

      <div id="contact" className="reveal w-full">
        <Footer />
      </div>
    </main>
  );
};
