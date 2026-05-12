import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SdifAnnouncement } from "./screens/SdifAnnouncement";
import { BaeHome } from "./screens/BaeHome";
import { PostDetails } from "./screens/PostDetails/PostDetails";
import { NotFound } from "./screens/NotFound/NotFound";
import { Salon } from "./screens/Salon/Salon";
import { Contact } from "./screens/Contact/Contact";
import { Chatbot } from "./components/Chatbot";
import { ScrollToTop } from "./components/ScrollToTop";
import "../tailwind.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<BaeHome />} />
          <Route path="/a-propos" element={<Salon />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/announcement" element={<SdifAnnouncement />} />
          <Route path="/actualite/:slug" element={<PostDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);