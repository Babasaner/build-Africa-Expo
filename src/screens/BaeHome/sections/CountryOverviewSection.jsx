import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

const forumActions = [
  {
    label: "DEVENIR PARTENAIRE DU FORUM",
    className: "h-auto rounded-lg border-0 bg-primary-bae px-8 py-4 text-left font-bold  shadow-none hover:bg-primary-bae/90 text-white/80",
  },
  {
    label: "S'INSCRIRE COMME VISITEUR",
    className: "h-auto rounded-lg border-0 bg-accent px-8 py-4 text-left bg-[#00AB92] text-white font-bold  shadow-none hover:bg-accent/90 text-white/80",
  },
];

const forumDays = [
  {
    day: "JOURNÉE 1",
    city: "New York",
    participants: "200 – 300 participants",
  },
  {
    day: "JOURNÉE 2",
    city: "Toronto",
    participants: "100 – 180 participants",
  },
];

export const CountryOverviewSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(0deg, rgba(22, 29, 62, 0.64) 0%, rgba(22, 29, 62, 0.64) 100%), url('sdifsection.jpg')",
      }}
      aria-labelledby="country-overview-title"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-10 px-5 py-12 lg:flex-row lg:items-start lg:gap-12 lg:py-[120px]">
        <header className="flex max-w-[620px] flex-col items-start gap-6">
          <div className="flex w-full flex-col items-start gap-2">
            <p className="mt-[-1.00px] self-stretch font-body-bold font-[number:var(--body-bold-font-weight)] text-[#00ab92] text-[length:var(--body-bold-font-size)] tracking-[var(--body-bold-letter-spacing)] leading-[var(--body-bold-line-height)] [font-style:var(--body-bold-font-style)]">
              2ÈME ÉDITION — BUILD AFRICA EXPO
            </p>
            <h2
              id="country-overview-title"
              className="self-stretch font-headings-h2 font-[number:var(--headings-h2-font-weight)] text-white text-[length:var(--headings-h2-font-size)] tracking-[var(--headings-h2-letter-spacing)] leading-[var(--headings-h2-line-height)] [font-style:var(--headings-h2-font-style)]"
            >
              Sénégal Diaspora Investment Forum
            </h2>
            <p className="self-stretch font-headings-h4 font-[number:var(--headings-h4-font-weight)] text-[#ffc600] text-[length:var(--headings-h4-font-size)] tracking-[var(--headings-h4-letter-spacing)] leading-[var(--headings-h4-line-height)] [font-style:var(--headings-h4-font-style)]">
              New York – Toronto 2026
            </p>
          </div>
          <p className="max-w-[520px] font-body-regular font-[number:var(--body-regular-font-weight)] text-white text-[length:var(--body-regular-font-size)] tracking-[var(--body-regular-letter-spacing)] leading-[var(--body-regular-line-height)] [font-style:var(--body-regular-font-style)]">
            Organisé en marge de la Coupe du Monde FIFA 2026, le Sénégal
            Diaspora Investment Forum est une plateforme stratégique visant à
            connecter la diaspora sénégalaise d&apos;Amérique du Nord aux
            opportunités d&apos;investissement au Sénégal.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full">
            {forumActions.map((action) => (
              <Button
                key={action.label}
                type="button"
                className={`${action.className} flex-1 justify-between`}
              >
                <span className="text-left">
                  {action.label}
                </span>
                <img
                  className="h-4 w-4"
                  alt="Arrow"
                  src="icon/Vector.svg"
                />
              </Button>
            ))}
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
                    {item.day}
                  </span>
                </div>
                <div className="inline-flex items-center justify-center gap-2">
                  <img
                    className="relative h-10 w-10"
                    alt="Icons bx map"
                    src="https://c.animaapp.com/mot82cj4305Sf8/img/icons---bx-map.svg"
                  />
                  <h3 className="whitespace-nowrap font-headings-h4 font-[number:var(--headings-h4-font-weight)] text-white text-[length:var(--headings-h4-font-size)] tracking-[var(--headings-h4-letter-spacing)] leading-[var(--headings-h4-line-height)] [font-style:var(--headings-h4-font-style)]">
                    {item.city}
                  </h3>
                </div>
                <p className="whitespace-nowrap font-caption-regular font-[number:var(--caption-regular-font-weight)] text-white text-[length:var(--caption-regular-font-size)] tracking-[var(--caption-regular-letter-spacing)] leading-[var(--caption-regular-line-height)] [font-style:var(--caption-regular-font-style)]">
                  {item.participants}
                </p>
              </CardContent>
            </Card>
          ))}
        </aside>
      </div>
    </section>
  );
};
