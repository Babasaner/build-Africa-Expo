import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SdifAnnouncement } from "./screens/SdifAnnouncement";
import { BaeHome } from "./screens/BaeHome";
import { PostDetails } from "./screens/PostDetails/PostDetails";
import { NotFound } from "./screens/NotFound/NotFound";
import { Salon } from "./screens/Salon/Salon";
import { Partenaires } from "./screens/Partenaires/Partenaires";
import { Contact } from "./screens/Contact/Contact";
import { Intervenants } from "./screens/Intervenants/Intervenants";
import { DevenirPartenaire } from "./screens/DevenirPartenaire/DevenirPartenaire";
import { InscriptionVisiteur } from "./screens/InscriptionVisiteur/InscriptionVisiteur";
import { Newsroom } from "./screens/Newsroom/Newsroom";
import { Chatbot } from "./components/Chatbot";
import { ScrollToTop } from "./components/ScrollToTop";
import { LanguageProvider } from "./lib/i18n";
import "../tailwind.css";
import { ROUTE_MAP } from "./lib/routes";

// GoogleAnalytics is excluded in development to prevent Firefox's Enhanced
// Tracking Protection (spoofer.js) from blocking the module on localhost.
// In production builds, the real GA component is imported and runs normally.
import { PageTracker as RealTracker } from "./components/PageTracker";
const PageTracker = import.meta.env.DEV ? () => null : RealTracker;

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <PageTracker />
          <ScrollToTop />
          <Routes>
            {/* === FRENCH ROUTES (default) === */}
            <Route path="/" element={<BaeHome />} />
            <Route path="/a-propos" element={<Salon />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/intervenants" element={<Intervenants />} />
            <Route path="/announcement" element={<SdifAnnouncement />} />
            <Route path="/actualite/:slug" element={<PostDetails />} />
            <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
            <Route path="/inscription-visiteur" element={<InscriptionVisiteur />} />
            <Route path="/newsroom" element={<Newsroom />} />

            {/* === ENGLISH TRANSLATED ROUTES === */}
            <Route path="/en" element={<BaeHome />} />
            <Route path="/en/about" element={<Salon />} />
            <Route path="/en/partners" element={<Partenaires />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/speakers" element={<Intervenants />} />
            <Route path="/en/news" element={<Newsroom />} />
            <Route path="/en/news/:slug" element={<PostDetails />} />
            <Route path="/en/become-partner" element={<DevenirPartenaire />} />
            <Route path="/en/register-visitor" element={<InscriptionVisiteur />} />
            <Route path="/en/announcement" element={<SdifAnnouncement />} />

            {/* === LEGACY lang-prefix routes (backward compat) === */}
            <Route path="/:lang/a-propos" element={<Salon />} />
            <Route path="/:lang/partenaires" element={<Partenaires />} />
            <Route path="/:lang/contact" element={<Contact />} />
            <Route path="/:lang/intervenants" element={<Intervenants />} />
            <Route path="/:lang/newsroom" element={<Newsroom />} />
            <Route path="/:lang/actualite/:slug" element={<PostDetails />} />
            <Route path="/:lang/devenir-partenaire" element={<DevenirPartenaire />} />
            <Route path="/:lang/inscription-visiteur" element={<InscriptionVisiteur />} />
            <Route path="/:lang/announcement" element={<SdifAnnouncement />} />

            {/* Fallbacks */}
            <Route path="/:lang/*" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>,
);

