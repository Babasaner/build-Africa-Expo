import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SdifAnnouncement } from "./screens/SdifAnnouncement";
import { BaeHome } from "./screens/BaeHome";
import { PostDetails } from "./screens/PostDetails/PostDetails";
import { NotFound } from "./screens/NotFound/NotFound";
import "../tailwind.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter basename="/edition-2026">
      <Routes>
        <Route path="/" element={<BaeHome />} />
        <Route path="/announcement" element={<SdifAnnouncement />} />
        <Route path="/news/:slug" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);