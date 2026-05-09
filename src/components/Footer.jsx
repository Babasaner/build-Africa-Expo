import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const socialLinks = [
  {
    alt: "Instagram",
    src: "https://c.animaapp.com/mot82cj4305Sf8/img/icons---bxl-instagram.svg",
    href: "https://www.instagram.com/buildafricaexpo.dakar/",
  },
  {
    alt: "Twitter",
    src: "https://c.animaapp.com/mot82cj4305Sf8/img/icons---bxl-twitter.svg",
    href: "https://x.com/BuildAfricaExpo",
  },
  {
    alt: "Facebook",
    src: "https://c.animaapp.com/mot82cj4305Sf8/img/icons---bxl-facebook.svg",
    href: "#", // Non fourni par l'utilisateur
  },
  {
    alt: "LinkedIn",
    src: "https://c.animaapp.com/mot82cj4305Sf8/img/icons---bxl-linkedin.svg",
    href: "https://www.linkedin.com/company/buildafricaexpo",
  },
  {
    alt: "YouTube",
    src: "https://c.animaapp.com/mot82cj4305Sf8/img/icons---bxl-youtube.svg",
    href: "https://www.youtube.com/channel/UCB5F__JvUvseC0RKOxd6b_w",
  },
  {
    alt: "TikTok",
    src: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOS41OSA2LjY5YTQuODMgNC44MyAwIDAgMS0zLjc3LTQuMjVWMmgtMy40NXYxMy42N2EyLjg5IDIuODkgMCAwIDEtNS4yIDIuNzQgMi44OSAyLjg5IDAgMCAxIDIuMzEtNC42NCAyLjkzIDIuOTMgMCAwIDEgLjg4LjEzVjkuNGE2Ljg0IDYuODQgMCAwIDAtMS0uMDVBNi4zMyA2LjMzIDAgMCAwIDUgMjAuMWE2LjM0IDYuMzQgMCAwIDAgMTAuODYtNC40M3YtN2E4LjE2IDguMTYgMCAwIDAgNC43NyAxLjUydi0zLjRhNC44NSA0Ljg1IDAgMCAxLTEuMDQtLjF6Ii8+PC9zdmc+",
    href: "https://www.tiktok.com/@build.africa.expo?_t=8pJ9C59VK1Q&_r=1",
  },
];

const navigationLinks = [
  { label: "ACCUEIL", href: "/#accueil" },
  { label: "LE SALON", href: "/#salon" },
  { label: "INTERVENANTES", href: "/#intervenants" },
  { label: "PARTENAIRES", href: "/#partenaires" },
  { label: "NEWSROOM", href: "/#newsroom" },
  { label: "CONTACT", href: "/#contact" },
];

const contactDetails = [
  "+221 77 766 5757",
  "contact@buildafricaexpo.com",
  "Sacré Cœur 3 lot 03, Dakar Sénégal",
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full">
      <img
        className="block h-auto w-full"
        alt="Bae graphic"
        src={`${import.meta.env.BASE_URL}BAE_Graphic.svg`}
      />
      <div className="relative w-full bg-[#1D1D1B]">
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute right-0 top-0 h-[64px] w-[64px] bg-[#00ab92] flex items-center justify-center transition-colors hover:bg-[#00ab92]/90 z-20"
          aria-label="Back to top"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.3334 10.437V26.6663H14.6667V10.437L7.51473 17.589L5.62939 15.7037L16.0001 5.33301L26.3707 15.7037L24.4854 17.589L17.3334 10.437Z"
              fill="white"
            />
          </svg>
        </button>

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
            {/* Column 1: Logo, Socials, Copyright */}
            <div className="flex flex-col gap-12">
              <img
                className="h-auto w-[180px]"
                alt="Build Africa Expo logo"
                src={`${import.meta.env.BASE_URL}footer-logo.png`}
              />
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-start gap-3">
                  {socialLinks.map((socialLink, index) => (
                    <a
                      key={`${socialLink.alt}-${index}`}
                      href={socialLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-lg bg-[#36499b] p-2 flex items-center justify-center transition-colors hover:bg-[#4157b9]"
                      aria-label={socialLink.alt}
                    >
                      <img
                        className="h-5 w-5"
                        alt={socialLink.alt}
                        src={socialLink.src}
                      />
                    </a>
                  ))}
                </div>
                <p className="text-[14px] text-white/70">
                  © 2026 — Copyright. Tous droits réservés
                </p>
              </div>
            </div>

            {/* Column 2: Navigation & Action */}
            <div className="flex flex-col gap-12">
              <nav
                aria-label="Footer navigation"
                className="flex flex-col gap-3"
              >
                {navigationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-fit text-left text-[16px] text-white hover:text-[#00ab92] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <Button
                type="button"
                className="h-auto w-fit rounded-lg bg-[#36499b] px-10 py-4 text-[16px] font-bold text-white hover:bg-[#4157b9]"
              >
                S&apos;INSCRIRE
              </Button>
            </div>

            {/* Column 3: Contact & Newsletter */}
            <div className="flex flex-col gap-12">
              <address className="flex flex-col gap-3 not-italic">
                {contactDetails.map((detail, index) => (
                  <p
                    key={`${detail}-${index}`}
                    className="text-[16px] text-white"
                  >
                    {detail}
                  </p>
                ))}
              </address>

              <form className="flex w-full flex-col gap-4">
                <label
                  htmlFor="footer-newsletter-email"
                  className="text-[16px] text-white"
                >
                  Bulletin d&apos;information
                </label>
                <div className="flex w-full items-center bg-white rounded-sm overflow-hidden">
                  <Input
                    id="footer-newsletter-email"
                    type="email"
                    placeholder="Email"
                    className="h-[48px] border-0 bg-transparent px-4 text-[16px] text-black shadow-none placeholder:text-gray-400 focus-visible:ring-0"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="h-[56px] w-[56px] p-0 hover:bg-transparent"
                    aria-label="Newsletter submit"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.494 0.938737L14.802 7.70807C14.8543 7.73685 14.8978 7.77912 14.9282 7.83048C14.9586 7.88184 14.9746 7.94041 14.9746 8.00007C14.9746 8.05973 14.9586 8.1183 14.9282 8.16966C14.8978 8.22102 14.8543 8.2633 14.802 8.29207L2.494 15.0614C2.44325 15.0893 2.3861 15.1035 2.32818 15.1026C2.27027 15.1017 2.21358 15.0858 2.16372 15.0563C2.11385 15.0268 2.07253 14.9849 2.04382 14.9346C2.01511 14.8842 2.00001 14.8273 2 14.7694V1.23074C2.00001 1.17281 2.01511 1.11589 2.04382 1.06558C2.07253 1.01528 2.11385 0.973316 2.16372 0.943842C2.21358 0.914368 2.27027 0.898396 2.32818 0.897501C2.3861 0.896606 2.44325 0.910818 2.494 0.938737V0.938737ZM3.33333 8.66674V13.0781L12.5667 8.00007L3.33333 2.92207V7.3334H6.66667V8.66674H3.33333Z"
                        fill="#36499B"
                      />
                    </svg>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
