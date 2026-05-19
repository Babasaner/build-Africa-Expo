import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const announcementLocations = ["New York", "Toronto"];

const navigationItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "À PROPOS", href: "/a-propos" },
  { label: "INTERVENANTS", href: "/intervenants" },
  { label: "PARTENAIRES", href: "/partenaires" },
  { label: "NEWSROOM", href: "/newsroom" },
  { label: "CONTACT", href: "/contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="absolute top-0 left-0 z-50 w-full">
      {/* Announcement Bar */}
      {location.pathname === "/" && (
        <section className="w-full bg-[#161D3E]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-2 md:gap-3 px-4 py-3 md:py-4">
            <div className="inline-flex items-center justify-center gap-2">
              <Badge className="rounded bg-[#00AB92] px-1.5 py-0.5 font-bold text-[9px] md:text-[10px] text-white hover:bg-[#00AB92]/90">
                NOUVEAU
              </Badge>
              <p className="text-center text-[13px] sm:text-[16px] md:text-[20px] font-bold leading-tight text-white">
                Sénégal Diaspora Investment Forum 2026
              </p>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <div className="flex items-center justify-center gap-3">
              {announcementLocations.map((location) => (
                <div key={location} className="inline-flex items-center gap-1">
                  <img
                    className="h-3.5 w-3.5 md:h-4 md:w-4 opacity-80"
                    alt="Location icon"
                    src={`${import.meta.env.BASE_URL}icon/map.svg`}
                  />
                  <span className="text-[12px] md:text-[14px] font-normal text-white/80">
                    {location}
                  </span>
                </div>
              ))}
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 md:block" />
            <a
              href="https://buildafricaexpo.com/edition-2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-[12px] md:text-[14px] font-bold text-[#ffc600]">
                ÉDITION 2025
              </span>
              <span className="text-[12px] md:text-[13px] font-bold text-[#f5c518]">→</span>
            </a>
          </div>
        </section>
      )}

      {/* Main Header */}
      <header className="w-full border-b border-[#36499b14] bg-white">
        <div className="mx-auto flex h-[70px] md:h-[90px] w-full max-w-[1440px] items-center justify-between gap-6 px-5">
          <a
            href={import.meta.env.BASE_URL}
            className="relative h-[40px] md:h-[58px] w-auto"
            aria-label="Logo"
          >
            <img
              className="h-full w-auto object-contain"
              alt="Build Africa Expo Logo"
              src={`${import.meta.env.BASE_URL}logo.png`}
            />
          </a>

          <div className="flex items-center gap-4 lg:gap-8">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={`text-[14px] font-bold transition-colors hover:text-[#00AB92] ${
                        isActive(item.href)
                          ? "text-[#00AB92]"
                          : "text-[#161D3E]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/inscription-visiteur"
              >
                <Button className="h-[36px] md:h-[44px] rounded-lg bg-[#36499B] px-4 md:px-6 font-bold text-white transition-colors duration-300 hover:bg-[#00AB92] cursor-pointer">
                  S&apos;INSCRIRE
                </Button>
              </Link>
              <Link
                to="/devenir-partenaire"
                className="hidden sm:inline-flex"
              >
                <Button
                  variant="outline"
                  className="h-[36px] md:h-[44px] rounded-lg border-[#36499B] px-4 md:px-6 font-bold text-[#36499B] transition-all duration-300 hover:bg-[#00AB92] hover:text-white hover:border-[#00AB92] cursor-pointer"
                >
                  DEVENIR PARTENAIRE
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Side Panel */}
          <div 
            className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-bold text-[#161D3E]">MENU</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-[#161D3E]" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-5">
                <ul className="flex flex-col gap-4">
                  {navigationItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block w-full text-left py-3 font-bold text-[16px] transition-colors ${
                          isActive(item.href)
                            ? "text-[#00AB92]"
                            : "text-[#161D3E] hover:text-[#00AB92]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Actions at bottom */}
              <div className="p-5 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
                <Link
                  to="/inscription-visiteur"
                  className="w-full"
                >
                  <Button className="w-full h-12 rounded-lg bg-[#36499B] font-bold text-white">
                    S&apos;INSCRIRE
                  </Button>
                </Link>
                <Link
                  to="/devenir-partenaire"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-lg border-[#36499B] text-[#36499B] font-bold"
                  >
                    DEVENIR PARTENAIRE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
