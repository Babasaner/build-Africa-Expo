import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { client } from "../../../lib/sanity";

const ArticleCard = ({ item, index }) => (
  <Card className="flex flex-col overflow-hidden rounded-none border-0 bg-white shadow-none h-full w-full transition-transform duration-300 hover:scale-[1.02]">
    <div className="h-[240px] w-full bg-gray-100">
      <img
        className="h-full w-full object-cover"
        alt={item.title}
        src={item.imageUrl || `${import.meta.env.BASE_URL}actu/a-${index + 1}.jpg`}
        onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}actu/a-1.jpg`; }}
      />
    </div>
    <CardContent className="flex flex-1 flex-col gap-4 border-t-[6px] border-solid p-6 [border-image:linear-gradient(90deg,#00AB92_0%,#36499B_50%,#FFC600_100%)_1]">
      <div className="flex items-center gap-2 text-xs font-bold text-[#00ab92] uppercase tracking-wider">
        <span className="h-1 w-1 rounded-full bg-gray-300" />
      </div>
      <h3 className="font-headings-h4 text-[18px] md:text-[20px] font-bold leading-tight text-[#36499b]">
        {item.title}
      </h3>
      <p className="flex-1 font-body-regular text-[15px] leading-relaxed text-[#1d1d1b]/80">
        {item.description}
      </p>
    </CardContent>
  </Card>
);

export const NewsroomHighlightsSection = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
      title, slug, excerpt, publishedAt, "imageUrl": mainImage.asset->url
    }`;

    client.fetch(query).then(data => {
      if (data && data.length > 0) {
        setArticles(data.map(p => ({
          title: p.title,
          description: p.excerpt || "",
          imageUrl: p.imageUrl,
          slug: p.slug?.current,
          date: p.publishedAt
        })));
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Sanity fetch error:", err);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <section className="relative w-full bg-[#D7DBEB] py-10 md:py-16 lg:py-[120px]"><div className="text-center text-[#36499B]">Chargement des actualités...</div></section>;
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#D7DBEB] py-10 md:py-16 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-5">
        <header className="flex w-full flex-wrap items-left justify-left gap-12">
          <h2 className="mt-[-1.00px] text-left font-headings-h1 text-[32px] md:text-[48px] font-[number:var(--headings-h1-font-weight)] leading-tight tracking-[var(--headings-h1-letter-spacing)] text-[#36499b]">
            DERNIÈRES NOUVELLES DU SECTEUR
          </h2>
        </header>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((item, index) => (
            <article key={`news-item-${index}`} className="flex h-full w-full">
              {item.slug ? (
                <Link to={`/news/${item.slug}`} className="flex h-full w-full">
                  <ArticleCard item={item} index={index} />
                </Link>
              ) : (
                <ArticleCard item={item} index={index} />
              )}
            </article>
          ))}
        </div>
        <Button
          variant="outline"
          className="h-auto rounded-lg border border-solid border-[#36499b] px-8 py-4 font-button-default text-[length:var(--button-default-font-size)] font-[number:var(--button-default-font-weight)] leading-[var(--button-default-line-height)] tracking-[var(--button-default-letter-spacing)] text-[#36499b] [font-style:var(--button-default-font-style)] hover:bg-transparent hover:text-[#36499b]"
        >
          VOIR PLUS
        </Button>
      </div>
    </section>
  );
};
