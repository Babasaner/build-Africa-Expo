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
import { Chatbot } from "./components/Chatbot";
import { ScrollToTop } from "./components/ScrollToTop";
import "../tailwind.css";

// GoogleAnalytics is excluded in development to prevent Firefox's Enhanced
// Tracking Protection (spoofer.js) from blocking the module on localhost.
// In production builds, the real GA component is imported and runs normally.
import { PageTracker as RealTracker } from "./components/PageTracker";
const PageTracker = import.meta.env.DEV ? () => null : RealTracker;

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <PageTracker />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<BaeHome />} />
          <Route path="/a-propos" element={<Salon />} />
          <Route path="/partenaires" element={<Partenaires />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/intervenants" element={<Intervenants />} />
          <Route path="/announcement" element={<SdifAnnouncement />} />
          <Route path="/actualite/:slug" element={<PostDetails />} />
          <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
          <Route path="/inscription-visiteur" element={<InscriptionVisiteur />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);

