import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { T } from "../../../lib/AutoTranslate";

const audienceCards = [
  {
    title: "Visiteurs",
    description:
      "Rencontrez les experts, découvrez les innovations et inspirez-vous des leaders africains du secteur BTP.",
    iconSrc: "icon/Visiteurs.svg",
    iconAlt: "Icon",
  },
  {
    title: "Exposants",
    description:
      "Exposez vos solutions à 1 500+ décideurs africains et à des investisseurs internationaux qualifiés.",
    iconSrc: "icon/Exposants.svg",
    iconAlt: "Icon",
  },
  {
    title: "Intervenants",
    description:
      "Prenez la parole lors de panels et workshops devant les acteurs clés de l'infrastructure africaine.",
    iconSrc: "icon/intervenants.svg",
    iconAlt: "Icon",
  },
  {
    title: "Partenaires",
    description:
      "Associez votre marque au premier salon africain de la construction et accédez aux investisseurs.",
    iconSrc: "icon/Partenaires.svg",
    iconAlt: "Icon",
  },
  {
    title: "Diaspora & Investisseurs",
    description:
      "Connectez-vous aux opportunités d'investissement au Sénégal lors du Forum Diaspora à New York et Toronto.",
    iconSrc: "icon/Diaspora & Investisseurs.svg",
    iconAlt: "Icons bx world",
  },
  {
    title: "Médias & Presse",
    description:
      "Couvrez l'événement majeur de la construction en Afrique de l'Ouest et rencontrez les leaders d'opinion.",
    iconSrc: "icon/press.svg",
    iconAlt: "Icons news",
  },
];

export const AudienceEngagementSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-center gap-10 px-5 py-20 lg:py-[120px]">
        <header className="flex flex-col items-start gap-4">
          <p className="mt-[-1.00px] font-headings-h4 text-[16px] md:text-[20px] font-bold text-[#00AB92]">
            <T>POURQUOI PARTICIPER ?</T>
          </p>
          <h2 className="max-w-[980px] font-headings-h1 text-[32px] md:text-[48px] font-bold leading-tight text-primary-bae">
            <T>C'EST ICI QUE LES OPPORTUNITÉS SE CONSTRUISENT.</T>
          </h2>
        </header>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {audienceCards.map((card) => (
            <Card
              key={card.title}
              className=" rounded-none py-[24px] px-[24px] border-0 bg-[#D7DBEB] shadow-none"
            >
              <CardContent className="flex h-full flex-col items-start gap-2 p-6">
                <img
                  className="h-10 w-10 shrink-0"
                  alt={card.iconAlt}
                  src={card.iconSrc}
                />
                <h3 className="font-headings-h4 text-[length:var(--headings-h4-font-size)] font-[number:var(--headings-h4-font-weight)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-primary-bae">
                  <T>{card.title}</T>
                </h3>
                <p className="font-body-regular text-[15px] font-normal leading-relaxed text-defaultblack min-h-[80px]">
                  <T>{card.description}</T>
                </p>
                <Button
                  variant="ghost"
                  className="h-auto p-0 text-[13px] font-semibold text-accent hover:bg-transparent hover:text-accent"
                  aria-label={`En savoir plus sur ${card.title}`}
                >
                 <img src="icon/arrow.svg" className="overflow-x-hidden " alt="icon" />

                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
