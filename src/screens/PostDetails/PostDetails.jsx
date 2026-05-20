import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client, urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ChevronLeft, Calendar, User } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useLanguage } from "../../lib/i18n";

const ArticleCard = ({ item, index }) => (
  <Card className="flex flex-col overflow-hidden rounded-none border-0 bg-white shadow-none h-full w-full transition-transform duration-300 hover:scale-[1.02]">
    <div className="h-[240px] w-full bg-gray-100">
      <img
        className="h-full w-full object-cover"
        alt={item.title}
        src={item.imageUrl || `/actu/a-${index + 1}.jpg`}
        onError={(e) => {
          e.target.src = "/actu/a-1.jpg";
        }}
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
        {item.excerpt}
      </p>
    </CardContent>
  </Card>
);

export const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { locale, t, translateText } = useLanguage();

  useEffect(() => {
    // Scroll to top on slug change
    window.scrollTo(0, 0);

    const query = `*[_type == "post" && slug.current == $slug][0]`;
    const recentQuery = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
      title, slug, excerpt, publishedAt, "imageUrl": mainImage.asset->url
    }`;

    Promise.all([
      client.fetch(query, { slug }),
      client.fetch(recentQuery, { slug }),
    ])
      .then(([postData, recentData]) => {
        setPost(postData);
        setRecentPosts(recentData);
        setLoading(false);

        // If the user requested English and DeepL is configured, translate fetched fields
        if (postData && locale === "en" && translateText) {
          (async () => {
            try {
              const translatedTitle = postData.title
                ? await translateText(postData.title, "en")
                : postData.title;
              const translatedExcerpt = postData.excerpt
                ? await translateText(postData.excerpt, "en")
                : postData.excerpt;
              // Translate PortableText body blocks (naive client-side approach)
              let translatedBody = postData.body;
              if (postData.body && Array.isArray(postData.body)) {
                try {
                  translatedBody = await Promise.all(
                    postData.body.map(async (block) => {
                      if (block && block._type === "block" && Array.isArray(block.children)) {
                        const plain = block.children.map((c) => c.text || "").join(" ");
                        const translated = plain ? await translateText(plain, "en") : plain;
                        return { ...block, children: [{ ...block.children[0], text: translated }] };
                      }
                      return block;
                    }),
                  );
                } catch (e) {
                  console.warn("Body translation failed:", e);
                }
              }
              setPost({ ...postData, title: translatedTitle, excerpt: translatedExcerpt });
              if (translatedBody) setPost((p) => ({ ...p, body: translatedBody }));
            } catch (e) {
              console.warn("Translation failed:", e);
            }
          })();
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [slug, locale]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00AB92] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">
            {t("common.loadingArticle")}
          </p>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-5 text-center">
        <h2 className="text-2xl font-bold text-[#161D3E] mb-4">
          {t("common.articleNotFound")}
        </h2>
        <p className="text-gray-500 mb-8">
          {t("common.articleNotFoundMsg")}
        </p>
        <Link to={locale === "en" ? "/en" : "/"}>
          <Button className="bg-[#00AB92] hover:bg-[#00AB92]/90">
            {t("common.backHome")}
          </Button>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow pt-[80px] lg:pt-[100px]">
        {/* Header / Hero Section */}
        <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
          {post.mainImage ? (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#161D3E]" />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center px-5">
            <div className="max-w-[900px] text-center animate-fade-in">
              <h1 className="font-headings-h1 text-[24px] sm:text-[32px] md:text-[42px] font-bold text-white uppercase leading-[1.2] tracking-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[900px] px-5 py-8 md:py-16">
          <Link to={locale === "en" ? "/en" : "/"}>
            <Button
              variant="ghost"
              className="mb-8 p-0 text-[#00AB92] hover:bg-transparent font-bold"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> {t("common.backHome")}
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4 text-[#00AB92]" />
              <span className="text-sm">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(
                      locale === "fr" ? "fr-FR" : "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )
                  : t("common.dateUnknown")}
              </span>
            </div>
          </div>

          {/* Portable Text Content */}
          <div
            className="prose prose-sm sm:prose-base md:prose-lg max-w-none 
            prose-headings:text-[#161D3E] prose-headings:font-bold 
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-img:rounded-xl prose-img:shadow-lg
            prose-a:text-[#00AB92] prose-strong:text-[#161D3E]"
          >
            <PortableText value={post.body} />
          </div>
        </div>

        {/* Other News Section - Same as Home Page */}
        <section className="w-full bg-[#D7DBEB] py-16 md:py-24 mt-16">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-5">
            <header className="flex w-full flex-wrap items-left justify-left gap-12">
              <h2 className="mt-[-1.00px] text-left font-headings-h1 text-[32px] md:text-[48px] font-bold leading-tight text-[#36499b] uppercase">
                {t("common.readAlso")}
              </h2>
            </header>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((item, index) => (
                <article
                  key={`news-item-${index}`}
                  className="flex h-full w-full"
                >
                  <Link
                    to={`/${locale === "en" ? "en/news" : "actualite"}/${item.slug.current}`}
                    className="flex h-full w-full"
                  >
                    <ArticleCard item={item} index={index} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
