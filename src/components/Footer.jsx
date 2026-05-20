import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLanguage } from "../lib/i18n";
import { T } from "../lib/AutoTranslate";
import { ROUTE_MAP } from "../lib/routes";

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
    href: "https://www.facebook.com/profile.php?id=61562911113388",
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
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/a-propos" },
  { labelKey: "nav.speakers", href: "/intervenants" },
  { labelKey: "nav.partners", href: "/partenaires" },
  { labelKey: "nav.newsroom", href: "/newsroom" },
  { labelKey: "nav.contact", href: "/contact" },
];
const announcementLocations = ["New York", "Toronto"];
const contactDetails = [
  "+221 77 766 5757",
  "contact@buildafricaexpo.com",
  "Sacré Cœur 3 lot 03, Dakar Sénégal",
];

export const Footer = () => {
  const { t, locale } = useLanguage();

  const localizedHref = (frPath) => {
    if (locale === "en") {
      return ROUTE_MAP[frPath] || `/en${frPath}`;
    }
    return frPath;
  };

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
      <div className="relative w-full bg-[#161D3E]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
            {/* Column 1: Logo, Socials, Copyright */}
            <div className="flex flex-col gap-12">
              <Link to={locale === "en" ? "/en" : "/"}>
                <img
                  className="h-auto w-[180px]"
                  alt="Build Africa Expo logo"
                  src="https://cdn.sanity.io/images/d4jrc26i/production/02196f445c7cfe260d35b7a96879e1f6a112756e-102x61.svg"
                />
              </Link>
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
                <p className="text-[14px] text-white/100">
                  {t("footer.copyright", {
                    year: new Date().getFullYear(),
                  })}
                </p>
              </div>
            </div>

            {/* Column 2: Navigation & Action */}
            <div className="flex flex-col gap-8">
              <nav
                aria-label="Footer navigation"
                className="flex flex-col gap-3"
              >
                {navigationLinks.map((link) => (
                  <Link
                    key={link.labelKey}
                    to={localizedHref(link.href)}
                    className="w-fit text-left text-[16px] text-white hover:text-[#00ab92] transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </nav>

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
            </div>

            {/* Column 3: Contact & Newsletter */}
            <div className="flex flex-col gap-12">
              <div className="flex w-full flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <a
                  href="https://tickets.buildafricaexpo.com/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    type="button"
                    className="w-full h-auto rounded-lg bg-[#36499b] px-6 py-4 text-[16px] font-bold text-white transition-colors duration-300 hover:bg-[#00ab92] cursor-pointer"
                  >
                    {t("nav.register")}
                  </Button>
                </a>

                <Link to={localizedHref("/devenir-partenaire")} className="flex-1">
                  <Button
                    type="button"
                    className="w-full h-auto rounded-lg bg-[#36499b] px-6 py-4 text-[16px] font-bold text-white transition-colors duration-300 hover:bg-[#00ab92] cursor-pointer"
                  >
                    {t("nav.becomePartner")}
                  </Button>
                </Link>
              </div>
              <form className="flex w-full flex-col gap-4">
                <label
                  htmlFor="footer-newsletter-email"
                  className="text-[16px] text-white"
                >
                  <T>Bulletin d'information</T>
                </label>
                <div className="flex w-full items-center bg-white  overflow-hidden">
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
