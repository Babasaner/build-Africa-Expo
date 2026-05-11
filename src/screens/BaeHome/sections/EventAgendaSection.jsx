import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";

const agendaDays = [
  {
    dayLabel: "JOURNÉE 1",
    city: "NEW YORK",
    headerClassName: "bg-primary-bae",
    dayBadgeClassName: "bg-[#00AB92] text-white hover:bg-accent",
    items: [
      {
        time: "09:00",
        title: "Accueil des participants",
        titleClassName:
          "font-caption-regular font-[number:var(--caption-regular-font-weight)] text-[#1d1d1b] text-[length:var(--caption-regular-font-size)] tracking-[var(--caption-regular-letter-spacing)] leading-[var(--caption-regular-line-height)] [font-style:var(--caption-regular-font-style)]",
      },
      {
        time: "10:00",
        title: "Panel 1 : Épargne, finance et investissement",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "INSTITUTIONS FINANCIÈRES & BANQUES",
      },
      {
        time: "11:30",
        title: "Panel 2 : Immobilier, logement et cadre de vie",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "PROMOTEURS IMMOBILIERS",
      },
      {
        time: "13:00",
        title: "Déjeuner & networking",
        titleClassName:
          "font-caption-regular font-[number:var(--caption-regular-font-weight)] text-[#1d1d1b] text-[length:var(--caption-regular-font-size)] tracking-[var(--caption-regular-letter-spacing)] leading-[var(--caption-regular-line-height)] [font-style:var(--caption-regular-font-style)]",
      },
      {
        time: "15:00",
        title: "Panel 3 : Infrastructures & services",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "INSTITUTIONS PUBLIQUES",
      },
      {
        time: "16:30",
        title: "Panel 4 : Sport, tourisme & attractivité",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "ACTEURS DU TOURISME & SPORT",
      },
      {
        time: "17:30",
        title: "Networking & closing",
        titleClassName:
          "font-caption-regular font-[number:var(--caption-regular-font-weight)] text-[#1d1d1b] text-[length:var(--caption-regular-font-size)] tracking-[var(--caption-regular-letter-spacing)] leading-[var(--caption-regular-line-height)] [font-style:var(--caption-regular-font-style)]",
      },
      {
        time: "20:30",
        title: "Dîner VIP ★",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "INVITÉS VVIP & PARTENAIRES",
        featured: true,
      },
    ],
  },
  {
    dayLabel: "JOURNÉE 2",
    city: "TORONTO",
    headerClassName: "bg-[#00AB92]",
    dayBadgeClassName: "bg-[#36499B] text-white hover:bg-[#36499B]",
    items: [
      {
        time: "09:00",
        title: "Accueil des participants",
        titleClassName:
          "font-caption-regular font-[number:var(--caption-regular-font-weight)] text-[#1d1d1b] text-[length:var(--caption-regular-font-size)] tracking-[var(--caption-regular-letter-spacing)] leading-[var(--caption-regular-line-height)] [font-style:var(--caption-regular-font-style)]",
      },
      {
        time: "10:00",
        title: "Panel 1 : Épargne, finance et investissement",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "INSTITUTIONS FINANCIÈRES & BANQUES",
      },
      {
        time: "11:30",
        title: "Panel 2 : Immobilier, logement et cadre de vie",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "PROMOTEURS IMMOBILIERS",
      },
      {
        time: "13:00",
        title: "Déjeuner & networking",
        titleClassName:
          "font-caption-regular font-[number:var(--caption-regular-font-weight)] text-[#1d1d1b] text-[length:var(--caption-regular-font-size)] tracking-[var(--caption-regular-letter-spacing)] leading-[var(--caption-regular-line-height)] [font-style:var(--caption-regular-font-style)]",
      },
      {
        time: "15:00",
        title: "Panel 3 : Infrastructures & services",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "INSTITUTIONS PUBLIQUES",
      },
      {
        time: "16:30",
        title: "Panel 4 : Sport, tourisme & attractivité",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "ACTEURS DU TOURISME & SPORT",
      },
      {
        time: "17:30",
        title: "Networking & closing",
        titleClassName:
          "font-caption-regular font-[number:var(--caption-regular-font-weight)] text-[#1d1d1b] text-[length:var(--caption-regular-font-size)] tracking-[var(--caption-regular-letter-spacing)] leading-[var(--caption-regular-line-height)] [font-style:var(--caption-regular-font-style)]",
      },
      {
        time: "20:30",
        title: "Dîner VIP ★",
        titleClassName:
          "font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#36499b] text-[length:var(--caption-bold-font-size)] tracking-[var(--caption-bold-letter-spacing)] leading-[var(--caption-bold-line-height)] [font-style:var(--caption-bold-font-style)]",
        tag: "INVITÉS VVIP & PARTENAIRES",
        featured: true,
      },
    ],
  },
];

export const EventAgendaSection = () => {
  return (
    <section
      className="relative w-full py-16 md:py-[120px]"
      style={{
        background:
          "linear-gradient(112.64deg, #00AB92 0.01%, #36499B 100.01%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-8 md:gap-10 px-5">
        <header className="flex w-full flex-col items-start gap-2">
          <h2 className="font-headings-h2 text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white sm:text-[40px]">
            DEUX JOURNÉES, DEUX VILLES, QUATRE PANELS.
          </h2>
          <p className="max-w-[760px] font-body-regular text-base md:text-lg text-white/100">
            Un programme dense et orienté résultats, conçu pour maximiser les
            opportunités de mise en relation entre investisseurs et porteurs de
            projets.
          </p>
        </header>
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {agendaDays.map((day) => (
            <Card
              key={day.city}
              className="overflow-hidden rounded-none border-0 bg-transparent shadow-none"
            >
              <div
                className={`flex min-h-[62px] items-center gap-3 px-6 py-4 ${day.headerClassName}`}
              >
                <Badge
                  className={`rounded px-2 py-1 [font-family:'Inter',Helvetica] text-[10px] font-bold leading-[normal] tracking-[0] ${day.dayBadgeClassName}`}
                >
                  {day.dayLabel}
                </Badge>
                <h3 className="font-headings-h4 font-[number:var(--headings-h4-font-weight)] text-[length:var(--headings-h4-font-size)] leading-[var(--headings-h4-line-height)] tracking-[var(--headings-h4-letter-spacing)] text-white [font-style:var(--headings-h4-font-style)]">
                  {day.city}
                </h3>
              </div>
              <CardContent className="bg-white p-6">
                <ol className="flex flex-col gap-4">
                  {day.items.map((item) => (
                    <li
                      key={`${day.city}-${item.time}-${item.title}`}
                      className={`flex items-start gap-4 ${item.featured ? "rounded-[0px_6px_6px_0px] bg-[#f5c5181a] px-3 py-2" : ""}`}
                    >
                      <time className="min-w-[44px] pt-[1px] font-caption-bold font-[number:var(--caption-bold-font-weight)] text-[#00ab92] text-[length:var(--caption-bold-font-size)] leading-[var(--caption-bold-line-height)] tracking-[var(--caption-bold-letter-spacing)] [font-style:var(--caption-bold-font-style)]">
                        {item.time}
                      </time>
                      <Separator
                        orientation="vertical"
                        className={`w-px shrink-0 bg-[#d7dbeb] ${item.tag ? "min-h-[49.5px]" : "min-h-[21.5px]"}`}
                      />
                      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                        <p className={item.titleClassName}>{item.title}</p>
                        {item.tag ? (
                          <Badge className="h-auto rounded-md bg-[#cceee9] px-2 py-0.5 [font-family:'Inter',Helvetica] text-[11px] font-semibold leading-[16.5px] tracking-[0] text-[#00ab92] hover:bg-[#cceee9]">
                            {item.tag}
                          </Badge>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
