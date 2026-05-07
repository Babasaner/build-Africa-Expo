import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const announcementLocations = ["New York", "Toronto"];

const navigationItems = [
  { label: "ACCUEIL", href: "/#accueil" },
  { label: "SALON", href: "/#salon" },
  { label: "INTERVENANTS", href: "/#intervenants" },
  { label: "PARTENAIRES", href: "/#partenaires" },
  { label: "NEWSROOM", href: "/#newsroom" },
  { label: "CONTACT", href: "/#contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="absolute top-0 left-0 z-50 w-full">
      {/* Announcement Bar */}
      <section className="w-full bg-[#161D3E]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-3 px-5 py-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <Badge className="rounded bg-[#00AB92] px-2 py-1 font-bold text-[10px] text-white hover:bg-[#00AB92]/90">
              NOUVEAU
            </Badge>
            <p className="text-center text-[16px] md:text-[20px] font-bold leading-tight text-white">
              Sénégal Diaspora Investment Forum 2026
            </p>
          </div>
          <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {announcementLocations.map((location) => (
              <div key={location} className="inline-flex items-center gap-1">
                <img
                  className="h-4 w-4 opacity-80"
                  alt="Location icon"
                  src="/icon/map.svg"
                />
                <span className="text-[14px] font-normal text-white/80">
                  {location}
                </span>
              </div>
            ))}
          </div>
          <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
          <a
            href="https://buildafricaexpo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-bold text-[#ffc600]">
              ÉDITION 2025
            </span>
            <span className="text-[13px] font-bold text-[#f5c518]">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Main Header */}
      <header className="w-full border-b border-[#36499b14] bg-white">
        <div className="mx-auto flex h-[70px] md:h-[90px] w-full max-w-[1440px] items-center justify-between gap-6 px-5">
          <a href="/" className="relative h-[40px] md:h-[58px] w-auto" aria-label="Logo">
            <img
              className="h-full w-auto object-contain"
              alt="Build Africa Expo Logo"
              src="/logo.png"
            />
          </a>

          <div className="flex items-center gap-4 lg:gap-8">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[14px] font-bold text-[#161D3E] transition-colors hover:text-[#00AB92]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button className="h-[36px] md:h-[44px] rounded-lg bg-[#36499B] px-4 md:px-6 font-bold text-white hover:bg-[#36499B]/90">
                S&apos;INSCRIRE
              </Button>
              <Button
                variant="outline"
                className="hidden h-[36px] md:h-[44px] rounded-lg border-[#36499B] px-4 md:px-6 font-bold text-[#36499B] hover:bg-[#36499B]/10 sm:inline-flex"
              >
                DEVENIR PARTENAIRE
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 top-full w-full bg-white border-b border-gray-100 shadow-xl lg:hidden">
            <nav className="flex flex-col p-5">
              <ul className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left py-2 font-bold text-[14px] text-[#161D3E] hover:text-[#00AB92]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full justify-center h-12 rounded-lg border-[#36499B] text-[#36499B] font-bold"
                  >
                    DEVENIR PARTENAIRE
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};
