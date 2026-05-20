import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ROUTE_MAP, EN_TO_FR } from "./routes";

const DEFAULT_LANGUAGE = "fr";
const SUPPORTED_LANGUAGES = ["fr", "en"];
const STORAGE_KEY = "bae_language";

const ISO_COUNTRY_TO_LANGUAGE = {
  FR: "fr",
  BE: "fr",
  CH: "fr",
  CA: "fr",
  LU: "fr",
  MC: "fr",
  SN: "fr",
  CI: "fr",
  CM: "fr",
  BF: "fr",
  BJ: "fr",
  NE: "fr",
  ML: "fr",
  TG: "fr",
  GN: "fr",
  CD: "fr",
  CG: "fr",
  GA: "fr",
  KM: "fr",
  MG: "fr",
  RW: "fr",
  BI: "fr",
  DJ: "fr",
  TD: "fr",
  GA: "fr",
};

const translations = {
  fr: {
    nav: {
      home: "ACCUEIL",
      about: "À PROPOS",
      speakers: "INTERVENANTS",
      partners: "PARTENAIRES",
      newsroom: "NEWSROOM",
      contact: "CONTACT",
      register: "S'INSCRIRE",
      becomePartner: "DEVENIR PARTENAIRE",
      menu: "MENU",
      new: "NOUVEAU",
      edition2025: "ÉDITION 2025",
    },
    footer: {
      newsletter: "Bulletin d'information",
      copyright:
        "© {year} — Copyright. Tous droits réservés. Build Africa Expo une initiative de Sovereign Insight Group",
    },
    common: {
      loadingArticle: "Chargement de l'article...",
      articleNotFound: "Article non trouvé",
      articleNotFoundMsg:
        "Désolé, cet article n'existe pas ou a été déplacé.",
      backHome: "Retour à l'accueil",
      dateUnknown: "Date inconnue",
      readAlso: "À LIRE AUSSI",
      pageNotFound: "Page introuvable",
      pageNotFoundMsg: "Cette page n'existe pas ou a été déplacée.",
      redirecting: "Vous serez redirigé vers l'accueil dans {count} seconde{plural}.",
      pagePrevious: "PAGE PRÉCÉDENTE",
      searchPlaceholder: "Rechercher...",
      heroHeading:
        "Perspectives, analyses et dynamiques autour des transformations africaines",
      heroDescription:
        "Retrouvez les tribunes, actualités, analyses et points de vue des experts de Build Africa Expo sur les grands enjeux économiques et sectoriels.",
      newsroomSectionTitle: "LES TRANSFORMATIONS QUI REDESSINENT L'AFRIQUE",
    },
    seo: {
      titleHome:
        "Build Africa Expo 2026 — Plateforme d'Investissement et de Développement",
      descriptionHome:
        "Build Africa Expo 2026 est le rendez-vous stratégique pour connecter investisseurs, institutions et diaspora africaine autour des transformations urbaines et économiques.",
    },
  },
  en: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      speakers: "SPEAKERS",
      partners: "PARTNERS",
      newsroom: "NEWSROOM",
      contact: "CONTACT",
      register: "REGISTER",
      becomePartner: "BECOME A PARTNER",
      menu: "MENU",
      new: "NEW",
      edition2025: "EDITION 2025",
    },
    footer: {
      newsletter: "Newsletter",
      copyright:
        "© {year} — All rights reserved. Build Africa Expo is an initiative of Sovereign Insight Group",
    },
    common: {
      loadingArticle: "Loading article...",
      articleNotFound: "Article not found",
      articleNotFoundMsg:
        "Sorry, this article does not exist or may have been moved.",
      backHome: "Back to home",
      dateUnknown: "Unknown date",
      readAlso: "READ ALSO",
      pageNotFound: "Page not found",
      pageNotFoundMsg: "This page does not exist or may have been moved.",
      redirecting: "You will be redirected to home in {count} second{plural}.",
      pagePrevious: "PREVIOUS PAGE",
      searchPlaceholder: "Search...",
      heroHeading:
        "Perspectives, analysis and storytelling around Africa's transformations",
      heroDescription:
        "Find editorials, news, analysis and expert viewpoints from Build Africa Expo on major economic and sectoral challenges.",
      newsroomSectionTitle:
        "TRANSFORMATIONS REDEFINING AFRICA",
    },
    seo: {
      titleHome:
        "Build Africa Expo 2026 — Investment & Development Platform",
      descriptionHome:
        "Build Africa Expo 2026 is the strategic event to connect investors, institutions and the African diaspora around urban and economic transformation.",
    },
  },
};

const getTranslation = (locale, key) => {
  const current = translations[locale];
  if (!current) return undefined;

  return key.split(".").reduce((value, segment) => {
    if (value && typeof value === "object") {
      return value[segment];
    }
    return undefined;
  }, current);
};

const formatMessage = (template, variables = {}) => {
  if (typeof template !== "string") return template;

  return template.replace(/\{(\w+)\}/g, (_, key) => {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      return variables[key];
    }
    return `{${key}}`;
  });
};

const detectBrowserLanguage = () => {
  if (typeof navigator === "undefined") return null;
  const languages = navigator.languages || [navigator.language];
  for (const lang of languages) {
    if (!lang) continue;
    const normalized = lang.toLowerCase();
    if (normalized.startsWith("fr")) return "fr";
    if (normalized.startsWith("en")) return "en";
  }
  return null;
};

const detectCountryLanguage = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) return null;
    const data = await response.json();
    const countryLang = ISO_COUNTRY_TO_LANGUAGE[data.country_code];
    if (countryLang) return countryLang;
  } catch (error) {
    console.warn("Geo-language detection failed:", error);
  }
  return null;
};

const deeplTranslateText = async (text, targetLang) => {
  if (!text) return text;

  const proxy = import.meta.env.VITE_DEEPL_PROXY;

  // If a proxy is configured, send a JSON POST to it and let the server
  // attach the auth key. This avoids exposing the key client-side and
  // bypasses CORS issues.
  if (proxy) {
    try {
      const response = await fetch(proxy, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target_lang: targetLang.toUpperCase() }),
      });

      if (!response.ok) {
        console.warn("DeepL proxy failed", response.status, response.statusText);
        return text;
      }

      const json = await response.json();
      return json?.translations?.[0]?.text || text;
    } catch (err) {
      console.warn("DeepL proxy request error:", err);
      return text;
    }
  }

  // No proxy: require a client-side key (not recommended for production)
  const authKey = import.meta.env.VITE_DEEPL_API_KEY;
  if (!authKey) return text;

  const endpoint = "/api/deepl/v2/translate";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `DeepL-Auth-Key ${authKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang.toUpperCase()
      }),
    });

    if (!response.ok) {
      console.warn("DeepL translate failed", response.status, response.statusText);
      return text;
    }

    const json = await response.json();
    return json?.translations?.[0]?.text || text;
  } catch (err) {
    console.warn("DeepL request error (CORS or network):", err);
    return text;
  }
};

const deeplTranslateTexts = async (texts, targetLang) => {
  if (!texts || texts.length === 0) return texts;

  const authKey = import.meta.env.VITE_DEEPL_API_KEY;
  if (!authKey) return texts;

  const endpoint = "/api/deepl/v2/translate";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `DeepL-Auth-Key ${authKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: texts,
        target_lang: targetLang.toUpperCase()
      }),
    });

    if (!response.ok) {
      console.warn("DeepL translate batch failed", response.status, response.statusText);
      return texts;
    }

    const json = await response.json();
    return json?.translations?.map(t => t.text) || texts;
  } catch (err) {
    console.warn("DeepL request error (CORS or network):", err);
    return texts;
  }
};

const LanguageContext = createContext({
  locale: DEFAULT_LANGUAGE,
  initialized: false,
  setLocale: () => {},
  t: (key, vars) => key,
  translateText: async (text) => text,
  translateTexts: async (texts) => texts,
});

export const LanguageProvider = ({ children }) => {
  const [locale, setLocaleState] = useState(DEFAULT_LANGUAGE);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    // 1) If path contains a language prefix (/fr or /en), use it.
    try {
      const m = window.location.pathname.match(/^\/(fr|en)(?:\/|$)/);
      if (m && m[1] && SUPPORTED_LANGUAGES.includes(m[1])) {
        setLocaleState(m[1]);
        setInitialized(true);
        return;
      }
    } catch (e) {
      // ignore (ssr or unavailable window)
    }

    // 2) stored preference
    const storedLang = localStorage.getItem(STORAGE_KEY);
    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
      setLocaleState(storedLang);
      setInitialized(true);
      return;
    }

    // 3) browser preference
    const browserLang = detectBrowserLanguage();
    if (browserLang) {
      setLocaleState(browserLang);
      setInitialized(true);
      return;
    }

    // 4) fallback to geo IP
    detectCountryLanguage().then((countryLang) => {
      setLocaleState(countryLang || DEFAULT_LANGUAGE);
      setInitialized(true);
    });
  }, []);

  const setLocale = (lang) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    setLocaleState(lang);

    try {
      const loc = window.location;
      const p = loc.pathname || "/";
      let newPath = p;

      if (lang === "en") {
        if (ROUTE_MAP[p]) {
          newPath = ROUTE_MAP[p];
        } else if (p.startsWith("/actualite/")) {
          newPath = p.replace(/^\/actualite\//, "/en/news/");
        } else {
          const m = p.match(/^(?:\/fr)(\/.*|$)/);
          if (m) {
            newPath = `/en${m[1] || ""}`;
          } else if (!p.startsWith("/en")) {
            newPath = `/en${p === "/" ? "" : p}`;
          }
        }
      } else {
        if (EN_TO_FR[p]) {
          newPath = EN_TO_FR[p];
        } else if (p.startsWith("/en/news/")) {
          newPath = p.replace(/^\/en\/news\//, "/actualite/");
        } else {
          const m = p.match(/^(?:\/en)(\/.*|$)/);
          if (m) {
            newPath = m[1] || "/";
          } else {
            const mFr = p.match(/^(?:\/fr)(\/.*|$)/);
            if (mFr) {
              newPath = mFr[1] || "/";
            }
          }
        }
      }

      if (!newPath.startsWith("/")) {
        newPath = "/" + newPath;
      }

      if (newPath !== p) {
        window.location.href = newPath + (loc.search || "") + (loc.hash || "");
      }
    } catch (e) {
      console.error("setLocale routing failed:", e);
    }
  };


  const t = useMemo(
    () => (key, variables = {}) => {
      const translation =
        getTranslation(locale, key) || getTranslation(DEFAULT_LANGUAGE, key) || key;
      return formatMessage(translation, variables);
    },
    [locale],
  );

  const translateText = async (text, targetLocale = locale) => {
    if (targetLocale === "fr") return text;
    return await deeplTranslateText(text, targetLocale === "en" ? "EN" : "FR");
  };

  const translateTexts = async (texts, targetLocale = locale) => {
    if (targetLocale === "fr") return texts;
    return await deeplTranslateTexts(texts, targetLocale === "en" ? "EN" : "FR");
  };

  return React.createElement(
    LanguageContext.Provider,
    {
      value: { locale, initialized, setLocale, t, translateText, translateTexts },
    },
    children,
  );
};

export const useLanguage = () => useContext(LanguageContext);
