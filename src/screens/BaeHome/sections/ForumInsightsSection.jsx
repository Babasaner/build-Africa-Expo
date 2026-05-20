import { Card, CardContent } from "../../../components/ui/card";
import { T } from "../../../lib/AutoTranslate";

const insightCards = [
  {
    number: "01",
    title: "Générer des opportunités d'investissement concrètes",
    description: "Pour la diaspora sénégalaise établie en Amérique du Nord.",
  },
  {
    number: "02",
    title: "Faciliter les rencontres entre institutions et investisseurs",
    description:
      "Entreprises, institutions financières et porteurs de projets réunis en un lieu.",
  },
  {
    number: "03",
    title: "Valoriser les projets structurants du Sénégal",
    description:
      "Auprès d'un public international et de la communauté financière de la diaspora.",
  },
  {
    number: "04",
    title: "Renforcer l'attractivité économique du Sénégal",
    description:
      "À l'échelle globale, en capitalisant sur la fenêtre d'opportunité de la Coupe du Monde 2026.",
  },
];

export const ForumInsightsSection = () => {
  return (
    <section className="relative w-full bg-[#d7dbeb]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-[29px] px-5 py-14 lg:py-[120px]">
        <header className="flex w-full flex-col items-start gap-[29px]">
          <p className="mt-[-1.00px] w-fit whitespace-nowrap font-headings-h4 text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-[#00ab92] [font-style:var(--headings-h4-font-style)]">
            <T>POURQUOI LE FORUM DIASPORA ?</T>
          </p>
          <h2 className="max-w-[764px] font-headings-h1 text-[length:var(--headings-h1-font-size)] font-[number:var(--headings-h1-font-weight)] leading-[var(--headings-h1-line-height)] tracking-[var(--headings-h1-letter-spacing)] text-[#36499b] [font-style:var(--headings-h1-font-style)]">
            <T>Transformer la visibilité internationale en opportunités économiques.</T>
          </h2>
          <p className="max-w-[900px] font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#4b5570] [font-style:var(--body-regular-font-style)]">
            <T>En marge de la Coupe du Monde 2026, une fenêtre d'opportunité unique pour mobiliser la diaspora sénégalaise d'Amérique du Nord autour de projets d'investissement concrets.</T>
          </p>
        </header>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {insightCards.map((card) => (
            <Card
              key={card.number}
              className="h-full rounded-none border-0 border-l-[6px] border-l-[#1d1d1b] bg-white shadow-none"
            >
              <CardContent className="flex h-full min-h-[271px] flex-col items-start gap-4 p-6">
                <div className="mt-[-6.00px] w-fit whitespace-nowrap font-display-display-large text-[length:var(--display-display-large-font-size)] font-[number:var(--display-display-large-font-weight)] leading-[var(--display-display-large-line-height)] tracking-[var(--display-display-large-letter-spacing)] text-[#d7dbeb] [font-style:var(--display-display-large-font-style)]">
                  {card.number}
                </div>
                <h3 className="w-full font-body-bold text-[length:var(--body-bold-font-size)] font-[number:var(--body-bold-font-weight)] leading-[var(--body-bold-line-height)] tracking-[var(--body-bold-letter-spacing)] text-[#36499b] [font-style:var(--body-bold-font-style)]">
                  <T>{card.title}</T>
                </h3>
                <p className="w-full font-body-regular text-[length:var(--body-regular-font-size)] font-[number:var(--body-regular-font-weight)] leading-[var(--body-regular-line-height)] tracking-[var(--body-regular-letter-spacing)] text-[#1d1d1b] [font-style:var(--body-regular-font-style)]">
                  <T>{card.description}</T>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
