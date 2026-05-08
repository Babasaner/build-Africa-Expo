import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../components/ui/toggle-group";

const testimonials = [
  {
    quote:
      "Notre objectif est de positionner le Senegal dans l’organisation des grands événements et faire de notre pays un hub incontournable.",
    name: "Ibrahima WADE",
    role: ["Coordonnateur général ", "Comité d’organisation des Jeux Olympiques de la Jeunesse Dakar 2026 COJOJ"],
    fallback: "IW",
    image: "https://cdn.sanity.io/images/d4jrc26i/production/882499d7585da9cf685174cf0f4590d04836a234-169x168.png",
  },
  {
    quote:
      "Nous nous engageons à créer des opportunités d’emplois, à stimuler les investissements et à renforcer l’attractivité des territoires.",
    name: "Cheikh Mamadou Abiboulaye DIEYE",
    role: ["Directeur Général", "Aéroport International Blaise Diagne (AIBD SA)"],
    fallback: "CMAD",
    image: "https://cdn.sanity.io/images/d4jrc26i/production/112c7edb82d9e02e4af7fa7709d128ef432e35a7-168x168.jpg",
  },
  {
    quote:
      "Il nous faut des villes pensées par et pour les africains, où l’innovation épouse nos réalités et répond à nos besoins.",
    name: "Fadilou KEITA",
    role: ["Directeur Général", "Caisse des depots et consignations (CDC)"],
    fallback: "FK",
    image: "https://cdn.sanity.io/images/d4jrc26i/production/2ee9012d08eff9ca6aab4e86c904d61e2c5b958a-169x169.png",
  },

  {
    quote:
      "On encourage tout le monde à aller vers l’économie verte parce qu’on aimerait que les véhicules qui circulent maintenant soient remplacés par des véhicules électriques. ",
    name: "Serigne Mamadou MBOUP",
    role: ["Directeur General", "Société d'Aménagement et de Promotion des côtes et Zones touristiques du Sénégal   SAPCO"],
    fallback: "SMM",
    image: "https://www.buildafricaexpo.com/wp-content/uploads/2025/03/DSC07089.webp",
  },
];

const paginationItems = [
  {
    value: "page-1",
    className: "h-2 w-6 rounded-none bg-[#00ab92] data-[state=on]:bg-[#00ab92]",
    ariaLabel: "Page 1",
  },
  {
    value: "page-2",
    className: "h-2 w-2 rounded-none bg-[#d7dbeb] data-[state=on]:bg-[#d7dbeb]",
    ariaLabel: "Page 2",
  },
  {
    value: "page-3",
    className: "h-2 w-2 rounded-none bg-[#d7dbeb] data-[state=on]:bg-[#d7dbeb]",
    ariaLabel: "Page 3",
  },
];

export const ExpertTestimonialsSection = () => {
  const scrollRef = React.useRef(null);
  const [activePage, setActivePage] = React.useState("page-1");

  const scrollToPage = (pageValue) => {
    setActivePage(pageValue);
    if (scrollRef.current) {
      const pageWidth = scrollRef.current.offsetWidth;
      const pageIndex = parseInt(pageValue.split("-")[1]) - 1;
      scrollRef.current.scrollTo({
        left: pageIndex * pageWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-[#161d3e]  md:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 ">
        <header className="flex flex-col items-center gap-[9px]">
          <h2 className="[font-family:'Tomorrow',Helvetica] text-center text-[32px] font-bold leading-[38px] tracking-[1.08px] text-white md:text-4xl md:leading-[43.2px]">
            SOYEZ INSPIRÉ PAR LES EXPERTS
          </h2>
        </header>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex w-full gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in-up opacity-0 min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start rounded-none border-0 bg-[#36499b] text-white shadow-none transition-all duration-300 hover:bg-[#36499b]/80 group"
              >
                <CardContent className="flex h-full flex-col items-start gap-6 p-8">
                  <Avatar className="h-16 w-16 rounded-full border-2 border-transparent transition-colors duration-300 group-hover:border-[#ffc600]">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-[#1d295f] text-sm font-bold text-[#ffc600]">
                      {testimonial.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <blockquote className="[font-family:'Inter',Helvetica] text-[16px] font-normal italic leading-relaxed tracking-[0] text-white/100">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <footer className="mt-auto flex w-full items-center gap-4 pt-6">
                    <div className="flex flex-1 flex-col items-start gap-1">
                      <p className="font-caption-bold text-[15px] font-bold text-[#ffc600]">
                        {testimonial.name}
                      </p>
                      <p className="font-caption-regular text-[13px] font-normal text-white/100">
                        {testimonial.role.map((r, i) => (
                          <span key={i} className="block">{r}</span>
                        ))}
                      </p>
                    </div>
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <ToggleGroup
          type="single"
          value={activePage}
          onValueChange={(value) => value && scrollToPage(value)}
          aria-label="Navigation des témoignages"
          className="flex items-start justify-center gap-2"
        >
          {paginationItems.map((item) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              aria-label={item.ariaLabel}
              className={`min-h-0 min-w-0 border-0 p-0 transition-all duration-300 hover:opacity-100 focus-visible:ring-1 focus-visible:ring-white/100 focus-visible:ring-offset-0 ${activePage === item.value ? "opacity-100" : "opacity-30"
                } ${item.className}`}
            />
          ))}
        </ToggleGroup>
      </div>
    </section>
  );
};
