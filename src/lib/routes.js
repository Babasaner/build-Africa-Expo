// Central route map: FR path → EN path
// Used by Header, Footer and LanguageSwitcher to build localized links
export const ROUTE_MAP = {
  "/": "/en",
  "/a-propos": "/en/about",
  "/intervenants": "/en/speakers",
  "/partenaires": "/en/partners",
  "/contact": "/en/contact",
  "/newsroom": "/en/news",
  "/devenir-partenaire": "/en/become-partner",
  "/inscription-visiteur": "/en/register-visitor",
};

// Reverse map: EN path → FR path
export const EN_TO_FR = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([fr, en]) => [en, fr])
);
