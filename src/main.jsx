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
import { Chatbot } from "./components/Chatbot";
import { ScrollToTop } from "./components/ScrollToTop";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import "../tailwind.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <GoogleAnalytics />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<BaeHome />} />
          <Route path="/a-propos" element={<Salon />} />
          <Route path="/partenaires" element={<Partenaires />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/intervenants" element={<Intervenants />} />
          <Route path="/announcement" element={<SdifAnnouncement />} />
          <Route path="/actualite/:slug" element={<PostDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
