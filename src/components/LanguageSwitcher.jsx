import React from "react";
import { useLanguage } from "../lib/i18n";

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();

  const handleChange = (newLocale) => {
    setLocale(newLocale);
  };


  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="sr-only">
        Choisir la langue
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(event) => handleChange(event.target.value)}
        className="h-[36px] rounded-lg border border-[#36499B] bg-white px-3 text-sm font-bold text-[#161D3E] outline-none transition-all duration-200 hover:border-[#00AB92]"
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};
