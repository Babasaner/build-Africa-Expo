import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { T } from "../../../lib/AutoTranslate";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../lib/i18n";
import { ROUTE_MAP } from "../../../lib/routes";

const forumActions = [
  {
    label: "DEVENIR PARTENAIRE DU FORUM",
    className:
      "h-auto rounded-lg border-0 bg-primary-bae px-8 py-4 text-left font-bold shadow-none transition-colors duration-300 hover:bg-[#00AB92] text-white/100 cursor-pointer",
  },
  {
    label: "S'INSCRIRE COMME VISITEUR",
    className:
      "h-auto rounded-lg border-0 bg-[#00AB92] px-8 py-4 font-bold text-left text-white shadow-none transition-colors duration-300 hover:bg-[#36499B] cursor-pointer",
  },
];

const forumDays = [
  {
    day: "JOURNÉE 1",
    city: "New York",
    participants: "300 – 500 pax",
  },
  {
    day: "JOURNÉE 2",
    city: "Toronto",
    participants: "200 – 300 pax",
  },
];

export const CountryOverviewSection = () => {
  const { locale } = useLanguage();

  const localizedHref = (frPath) => {
    if (locale === "en") {
      return ROUTE_MAP[frPath] || `/en${frPath}`;
    }
    return frPath;
  };
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(22, 29, 62, 0.64) 0%, rgba(22, 29, 62, 0.64) 100%), url('sdifsection.jpg')",
      }}
      aria-labelledby="country-overview-title"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-10 px-5 py-12 lg:flex-row lg:items-start lg:gap-12 lg:py-[120px]">
        <header className="flex max-w-[620px] flex-col items-start gap-6">
          <div className="flex w-full flex-col items-start gap-2">
            <p className="font-bold text-[#00ab92] text-sm md:text-base uppercase tracking-wider">
              <T>2ÈME ÉDITION — BUILD AFRICA EXPO</T>
            </p>
            <h2
              id="country-overview-title"
              className="font-['Tomorrow'] font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              <T>Sénégal Diaspora Investment Forum</T>
            </h2>
            <p className="font-bold text-[#ffc600] text-xl md:text-2xl">
              <T>New York – Toronto 2026</T>
            </p>
          </div>
          <p className="max-w-[520px] font-['Inter'] font-normal text-white text-base md:text-lg leading-relaxed">
            <T>Organisé en marge de la Coupe du Monde FIFA 2026, le Sénégal
            Diaspora Investment Forum est une plateforme stratégique visant à
            connecter la diaspora sénégalaise d'Amérique du Nord aux
            opportunités d'investissement au Sénégal.</T>
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full">
            {forumActions.map((action) => {
              const button = (
                <Button
                  type="button"
                  className={`${action.className} flex-1 justify-between`}
                >
                  <span className="text-left"><T>{action.label}</T></span>
                  <img className="h-4 w-4" alt="Arrow" src="icon/Vector.svg" />
                </Button>
              );

              if (action.label.includes("INSCRIRE")) {
                return (
                  <Link
                    key={action.label}
                    to={localizedHref("/inscription-visiteur")}
                    className="flex-1"
                  >
                    {button}
                  </Link>
                );
              }

              if (action.label.includes("PARTENAIRE")) {
                return (
                  <Link
                    key={action.label}
                    to={localizedHref("/devenir-partenaire")}
                    className="flex-1"
                  >
                    {button}
                  </Link>
                );
              }

              return <div key={action.label} className="flex-1">{button}</div>;
            })}
          </div>
        </header>
        <aside className="flex w-full lg:max-w-[280px] flex-col items-start gap-5">
          {forumDays.map((item) => (
            <Card
              key={item.day}
              className="w-full rounded-none border-0 bg-[#00000014] shadow-none backdrop-blur-md backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12px)_brightness(100%)]"
            >
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="inline-flex items-start gap-2 rounded bg-[#1d1d1b] px-2 py-1">
                  <span className="mt-[-1.00px] whitespace-nowrap [font-family:'Inter',Helvetica] text-[10px] font-bold leading-[normal] tracking-[0] text-white">
                    <T>{item.day}</T>
                  </span>
                </div>
                <div className="inline-flex items-center justify-center gap-2">
                  <img
                    className="relative h-10 w-10"
                    alt="Icons bx map"
                    src="https://c.animaapp.com/mot82cj4305Sf8/img/icons---bx-map.svg"
                  />
                  <h3 className="whitespace-nowrap font-['Tomorrow'] font-bold text-white text-xl">
                    <T>{item.city}</T>
                  </h3>
                </div>
                <p className="whitespace-nowrap font-['Inter'] font-normal text-white text-sm opacity-80">
                  <T>{item.participants}</T>
                </p>
              </CardContent>
            </Card>
          ))}
        </aside>
      </div>
    </section>
  );
};
