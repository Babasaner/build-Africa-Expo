import { Check } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

const calloutCards = [
  {
    eyebrow: "POUR LES VISITEURS",
    title: "POURQUOI VISITER BUILD AFRICA EXPO ?",
    backgroundClassName: "bg-primary-bae",
    eyebrowClassName: "text-accent",
    titleClassName: "text-white",
    textClassName: "text-white/80",
    buttonClassName: "bg-[#00AB92] text-white hover:bg-accent/90 focus-visible:ring-accent",
    buttonLabel: "S'INSCRIRE POUR VISITER",
    checkColor: "#00AB92",
    items: [
      {
        text: "Accès aux dernières innovations de la construction africaine.",
        widthClassName: "max-w-[454px]",
      },
      { text: "Rencontres avec 55+ exposants sélectionnés." },
      { text: "7+ panels et workshops avec des experts du secteur." },
      { text: "Opportunités de networking avec 1.500+ professionnels." },
    ],
  },
  {
    eyebrow: "POUR LES EXPOSANTS",
    title: "POURQUOI EXPOSER AU SALON ?",
    backgroundClassName: "bg-[#00AB92]",
    eyebrowClassName: "text-primary-bae",
    titleClassName: "text-white",
    textClassName: "text-white/80",
    buttonClassName: "bg-primary-bae text-white hover:bg-primary-bae/90 focus-visible:ring-primary-bae",
    buttonLabel: "S'INSCRIRE POUR EXPOSER",
    checkColor: "#36499B",
    items: [
      {
        text: "Exposition directe à des décideurs africains et internationaux.",
        widthClassName: "max-w-[454px]",
      },
      { text: "Accès aux investisseurs et fonds d'infrastructure." },
      { text: "Visibilité médiatique nationale et régionale." },
      { text: "Rencontres B2B organisées avec acheteurs qualifiés." },
    ],
  },
];

export const ParticipationCalloutSection = () => {
  return (
    <section className="relative w-full" aria-label="Participation callout">
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        {calloutCards.map((card, index) => (
          <Card
            key={card.eyebrow}
            className={`rounded-none border-0 shadow-none ${card.backgroundClassName}`}
          >
            <CardContent className={`flex h-full py-16 md:py-24 lg:py-[120px] ${index === 0 ? "lg:justify-end lg:pr-[80px]" : "lg:justify-start lg:pl-[80px]"} justify-center`}>
              <article className="flex w-full max-w-[540px] flex-col items-start gap-8 px-6 sm:px-10">
                <header className="flex flex-col items-start gap-6">
                  <p
                    className={`font-headings-h4 text-[16px] md:text-[20px] font-bold leading-tight tracking-tight ${card.eyebrowClassName}`}
                  >
                    {card.eyebrow}
                  </p>
                  <h2
                    className={`max-w-[486px] font-headings-h2 text-[28px] md:text-[40px] font-bold leading-tight tracking-tight ${card.titleClassName}`}
                  >
                    {card.title}
                  </h2>
                </header>
                <ul className="flex flex-col items-start gap-4">
                  {card.items.map((item, idx) => (
                    <li
                      key={`${card.eyebrow}-item-${idx}`}
                      className="flex items-start gap-3"
                    >
                      <svg 
                        width="15" 
                        height="12" 
                        viewBox="0 0 15 12" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-1.5 shrink-0"
                      >
                        <path 
                          d="M4.707 8.293L1.414 5L0 6.414L4.707 11.121L14.414 1.414L13 0L4.707 8.293Z" 
                          fill={card.checkColor}
                        />
                      </svg>
                      <p
                        className={`font-body-regular text-[16px] font-normal leading-relaxed ${card.textClassName} ${item.widthClassName || ""}`}
                      >
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://tickets.buildafricaexpo.com/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[253px]"
                >
                  <Button
                    type="button"
                    className={`h-[48px] w-full px-[32px] py-[16px] font-button-default text-[16px] font-bold tracking-wider ${card.buttonClassName}`}
                  >
                    {card.buttonLabel}
                  </Button>
                </a>
              </article>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
