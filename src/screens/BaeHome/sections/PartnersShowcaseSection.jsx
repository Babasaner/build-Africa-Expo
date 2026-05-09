import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { client } from "../../../lib/sanity";

const LogoCard = ({ alt, src, imgClassName }) => {
  return (
    <Card className="min-w-[166px] w-[166px] h-[100px] rounded-none border-[1px] border-[#d2d2d1] bg-white shadow-none transition-all duration-300 hover:border-[#36499b] hover:shadow-md">
      <CardContent className="flex h-full items-center justify-center p-4">
        <img
          alt={alt}
          src={src}
          className={`${imgClassName} transition-all duration-300`}
        />
      </CardContent>
    </Card>
  );
};

const CarouselRow = ({ items }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="group relative w-full">
      <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 shadow-md hover:bg-white"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 shadow-md hover:bg-white"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex w-full gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {items.map((item, index) => (
          <div key={`${item.alt}-${index}`} className="snap-start">
            <LogoCard
              alt={item.alt}
              src={item.src}
              imgClassName={
                item.imgClassName || "w-[120px] h-auto object-contain"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const PartnersShowcaseSection = () => {
  const [sectionData, setSectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "partner"] | order(order asc) {
      name, "src": logo.asset->url, category
    }`;

    client
      .fetch(query)
      .then((data) => {
        if (data && data.length > 0) {
          const grouped = {
            Media: data.filter((p) => p.category === "media"),
            Platinium: data.filter((p) => p.category === "platinum"),
            Gold: data.filter((p) => p.category === "gold"),
            Silver: data.filter((p) => p.category === "silver"),
            Bronze: data.filter((p) => p.category === "bronze"),
            "Co-organisateurs": data.filter(
              (p) => p.category === "co-organisateurs",
            ),
          };

          const dynamicSectionData = [];
          for (const [title, items] of Object.entries(grouped)) {
            if (items.length > 0) {
              dynamicSectionData.push({
                title,
                items: items.map((item) => ({
                  alt: item.name,
                  src: item.src,
                  imgClassName: "w-[120px] h-auto object-contain",
                })),
                hasIndicators: false,
              });
            }
          }

          if (dynamicSectionData.length > 0) {
            setSectionData(dynamicSectionData);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="relative w-full bg-[#E8E8E8] py-12 lg:py-[120px]">
        <div className="text-center">Chargement des partenaires...</div>
      </section>
    );
  }

  if (sectionData.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#E8E8E8] py-12 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-5">
        <header>
          <h2 className="[font-family:'Tomorrow',Helvetica] text-2xl font-bold leading-[1.2] tracking-[1.08px] text-[#1D1D1B] sm:text-3xl lg:text-4xl">
            PARTENAIRES
          </h2>
        </header>
        {sectionData.map((section, sectionIndex) => (
          <div
            key={section.title}
            className="flex w-full flex-col items-start gap-8"
          >
            <div className="flex w-full flex-col items-start gap-6">
              <h3 className="font-body-bold text-[18px] font-bold tracking-tight text-[#4a4a49]">
                {section.title}
              </h3>

              <CarouselRow items={section.items} />
            </div>
            {sectionIndex < sectionData.length - 1 ? (
              <div className="flex w-full items-center py-4">
                <Separator className="bg-[#d2d2d1]" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
};
