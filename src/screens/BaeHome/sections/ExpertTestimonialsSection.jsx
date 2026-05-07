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
      "Build Africa Expo a été pour nous la meilleure opportunité de rencontrer des décideurs du secteur que nous n'aurions jamais pu atteindre autrement.",
    name: "Jean-Marc Diallo",
    role: ["Directeur Commercial", "Groupe Réalités"],
    fallback: "JD",
    image: "temoignage/t1.jpg",
  },
  {
    quote:
      "L'Expo Afrique a été une occasion inestimable pour nous de nouer des liens avec des leaders du secteur que nous n'aurions jamais pu rencontrer autrement.",
    name: "Sophie Dupont",
    role: ["Responsable des Partenariats InnovAfrica"],
    fallback: "SD",
    image: "temoignage/t2.jpg",
  },
  {
    quote:
      "L'Expo Afrique a été une opportunité précieuse pour établir des connexions avec des leaders du secteur que nous n'aurions pas eu la chance de rencontrer.",
    name: "Claire Martin",
    role: ["Directrice des Partenariats EcoTech"],
    fallback: "CM",
    image: "temoignage/t3.jpg",
  },
  {
    quote:
      "Il y a une énergie électrique autour de l'innovation. Les créateurs, les entrepreneurs et les entreprises sont tous au même endroit, c'est énergisant.",
    name: "Julien Dupont",
    role: ["Responsable des Alliances GreenInnov"],
    fallback: "JD",
    image: "temoignage/t4.jpg",
  },
  {
    quote:
      "Puisque VivaTech est mondial, il connecte plusieurs secteurs. Il n'est pas courant dans l'industrie d'avoir tout au même endroit.",
    name: "Baba Didiers",
    role: ["Responsable des Architecture - Ecosystem 3D"],
    fallback: "BD",
    image: "temoignage/t5.jpg",
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
    <section className="relative w-full bg-[#161d3e] py-20 md:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-5">
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
                  <blockquote className="[font-family:'Inter',Helvetica] text-[16px] font-normal italic leading-relaxed tracking-[0] text-white/90">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <footer className="mt-auto flex w-full items-center gap-4 pt-6">
                    <div className="flex flex-1 flex-col items-start gap-1">
                      <p className="font-caption-bold text-[15px] font-bold text-[#ffc600]">
                        {testimonial.name}
                      </p>
                      <p className="font-caption-regular text-[13px] font-normal text-white/60">
                        {testimonial.role.join(" — ")}
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
              className={`min-h-0 min-w-0 border-0 p-0 transition-all duration-300 hover:opacity-100 focus-visible:ring-1 focus-visible:ring-white/60 focus-visible:ring-offset-0 ${
                activePage === item.value ? "opacity-100" : "opacity-30"
              } ${item.className}`}
            />
          ))}
        </ToggleGroup>
      </div>
    </section>
  );
};
