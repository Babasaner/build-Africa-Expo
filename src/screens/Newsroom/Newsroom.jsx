import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { client } from "../../lib/sanity";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Input } from "../../components/ui/input";
import {
  Search,
  ChevronDown,
  Play,
  Calendar,
  Headphones,
  Clock,
  X,
} from "lucide-react";
import { ExpertTestimonialsSection } from "../BaeHome/sections/ExpertTestimonialsSection";
import { useLanguage } from "../../lib/i18n";
import { T, useTText } from "../../lib/AutoTranslate";

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr, locale = "fr") => {
  if (!dateStr) return locale === "fr" ? "08 Mai 2026" : "May 08, 2026";
  return new Date(dateStr).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );
};

// Dynamically fetched categories will be appended to this list
const DEFAULT_CATEGORIES = ["TOUT"];

export const Newsroom = () => {
  useScrollReveal();

  const { locale, translateText } = useLanguage();
  const tSearchPlaceholder = useTText("Rechercher...");

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [podcasts, setPodcasts] = useState([]);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("TOUT");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Sanity posts and categories
  useEffect(() => {
    const postsQuery = `*[_type == "post"] | order(publishedAt desc)[0...12] {
      title, slug, excerpt, publishedAt,
      "category": category->title,
      "imageUrl": mainImage.asset->url
    }`;
    const categoriesQuery = `*[_type == "category"] | order(title asc) { title }`;
    const podcastsQuery = `*[_type == "podcast"] | order(publishedAt desc)[0...3] {
      episode, title, guests, duration,
      "imageUrl": image.asset->url
    }`;

    Promise.all([
      client.fetch(postsQuery),
      client.fetch(categoriesQuery),
      client.fetch(podcastsQuery),
    ])
      .then(([postsData, categoriesData, podcastsData]) => {
        if (categoriesData && categoriesData.length > 0) {
          const fetchedCategories = categoriesData
            .map((c) => c.title)
            .filter(Boolean);
          setCategories(["TOUT", ...fetchedCategories]);
        }

        if (podcastsData && podcastsData.length > 0) {
          setPodcasts(
            podcastsData.map((p) => ({
              ep: p.episode,
              title: p.title,
              sub: p.guests || "",
              time: p.duration || "",
              img: p.imageUrl,
            })),
          );
        } else {
          setPodcasts([
            {
              ep: "EP. 12",
              title:
                "Bâtir l'Afrique : conversation avec les architectes du continent",
              sub: "Diébédo Francis Kéré · Pierre Goudiaby Atepa",
              time: "48 min",
              img: "https://cdn.sanity.io/images/d4jrc26i/production/32a05929e0c85e9f6f605fef2a18c2735e99e88f-519x779.jpg",
            },
            {
              ep: "EP. 11",
              title:
                "Diaspora & capital : structurer les flux d'investissement vers l'Afrique",
              sub: "Acha Leke · Mossadeck Bally",
              time: "52 min",
              img: "https://cdn.sanity.io/images/d4jrc26i/production/1683d30a74ec909b4c7110be972c49bb03bad187-666x999.jpg",
            },
            {
              ep: "EP. 10",
              title:
                "Sport & industries créatives : l'Afrique comme puissance d'influence",
              sub: "Mamadou Gaye · Aliou Cissé",
              time: "41 min",
              img: "https://cdn.sanity.io/images/d4jrc26i/production/2885c31225d904fdbd82a2188d5890950b970ce4-562x999.jpg",
            },
          ]);
        }

        if (postsData && postsData.length > 0) {
          const mapped = postsData.map((p) => ({
            title: p.title,
            description: p.excerpt || "",
            imageUrl: p.imageUrl,
            slug: p.slug?.current,
            date: p.publishedAt,
            category: p.category || "ACTUALITE",
          }));

          setArticles(mapped);

          // If English requested, translate titles/descriptions via DeepL
          if (locale === "en" && translateText) {
            (async () => {
              try {
                const translated = await Promise.all(
                  mapped.map(async (a) => ({
                    ...a,
                    title: a.title
                      ? await translateText(a.title, "en")
                      : a.title,
                    description: a.description
                      ? await translateText(a.description, "en")
                      : a.description,
                  })),
                );
                setArticles(translated);
              } catch (e) {
                console.warn("Article translations failed:", e);
              }
            })();
          }
        } else {
          // Robust mock fallback matching the screenshot perfectly if no articles exist yet
          setArticles([
            {
              title:
                "JOJ Dakar 2026 : le Sénégal accélère sa transformation urbaine et sportive",
              description:
                "À moins de quelques mois des Jeux Olympiques de la Jeunesse 2026, le Sénégal entre dans une phase décisive de ses préparatifs.",
              imageUrl:
                "https://cdn.sanity.io/images/d4jrc26i/production/08956dea00cddad651d0fec8e79a4538c5d002c6-1364x910.jpg",
              slug: "joj-dakar-2026",
              date: "2026-05-08",
              category: "Actualité",
            },
            {
              title:
                "Goethe-Institut Sénégal : quand l'architecture durable africaine devient une référence",
              description:
                "À Dakar, au cœur du quartier du Point E, le nouveau siège du Goethe-Institut Sénégal s'impose déjà comme l'un des projets phares.",
              imageUrl:
                "https://cdn.sanity.io/images/d4jrc26i/production/cf9f90e9bee395fd5cfe8b9d361e09d663ac3d5e-672x448.jpg",
              slug: "goethe-institut",
              date: "2026-05-06",
              category: "Urbanisme",
            },
            {
              title:
                "Why sports are increasingly becoming a leading funding sector inside Africa",
              description:
                "An extensive development analysis regarding infrastructure, brand sponsorship, and state support for strategic sports events.",
              imageUrl:
                "https://cdn.sanity.io/images/d4jrc26i/production/35a0f34241921d36e650c9c38188551965e8892e-672x378.jpg",
              slug: "sports-funding",
              date: "2026-05-02",
              category: "Partenariat",
            },
            {
              title:
                "West Africa's leading commercial development hubs: a financial focus on region's potential",
              description:
                "Highlighting key sectors like retail, business real estate, and structural investments that stimulate local and regional growth.",
              imageUrl:
                "https://cdn.sanity.io/images/d4jrc26i/production/bd56213318b622e22bcbfd1f05b08e25692c982f-672x448.jpg",
              slug: "commercial-hubs",
              date: "2026-04-28",
              category: "Infrastructure",
            },
            {
              title:
                "Dakar 2026 : The first regional metropolitan Smart City project unveiled",
              description:
                "A visionary project combining high tech solutions, renewable energy, and modern urban planning for the capital city.",
              imageUrl:
                "https://cdn.sanity.io/images/d4jrc26i/production/fe64667476ef49999173d8c8d8f71cdc33bc4540-720x480.jpg",
              slug: "smart-city",
              date: "2026-04-24",
              category: "Innovation",
            },
            {
              title:
                "Senegal's Prime Youth Olympic Venues: a structural legacy approach",
              description:
                "Detailing the strategic construction plans, venue assignments, and sustainable urban legacies for future generations.",
              imageUrl:
                "https://cdn.sanity.io/images/d4jrc26i/production/1fbb9e8cab3d2be0ee2e1f8e11ef369dcdfc92e7-671x448.jpg",
              slug: "olympic-venues",
              date: "2026-04-20",
              category: "Actualité",
            },
          ]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setIsLoading(false);
      });
  }, [locale]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter logic
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "TOUT" ||
      article.category.toUpperCase() === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white overflow-x-hidden">
      <Helmet>
        <title>Newsroom — Build Africa Expo 2026</title>
        <meta
          name="description"
          content="Perspectives, analyses et dynamiques autour des transformations africaines. Retrouvez toutes les actualités de Build Africa Expo 2026."
        />
      </Helmet>

      <Header />

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[42vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(92.26deg, #36499B 0.24%, #00AB92 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[16px] md:gap-[24px] min-h-[280px] md:min-h-[340px] mt-[100px] md:mt-[80px] px-[20px]">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[28px] sm:text-[34px] md:text-[50px] leading-[1.2] w-full uppercase tracking-wide">
            {" "}
            <T>
              PERSPECTIVES, ANALYSES ET DYNAMIQUES AUTOUR DES TRANSFORMATIONS
              AFRICAINES
            </T>
          </h1>
          <p className="text-white/90 font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[1.6] w-full">
            {" "}
            <T>
              Retrouvez les tribunes, actualités, analyses et points de vue des
              experts de Build Africa Expo sur les grands enjeux économiques et
              sectoriels.
            </T>
          </p>
        </div>
      </section>

      {/* ── LES TRANSFORMATIONS QUI REDESSINENT L'AFRIQUE ────────────────── */}
      <section className="reveal w-full bg-[#D7DBEB] py-[120px] px-[20px]">
        <div className="mx-auto w-full max-w-[1440px] flex flex-col gap-8">
          {/* Title */}
          <h2 className="text-[#1B3A6B] font-['Tomorrow'] w-full md:max-w-[500px] font-bold text-[32px] md:text-[32px] leading-[40px] uppercase tracking-wide">
            <T>LES TRANSFORMATIONS QUI REDESSINENT L'AFRIQUE</T>
          </h2>

          {/* Filters and Search Area */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Pill Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat.toUpperCase())}
                  className={`px-[16px] py-[8px] text-[14px] font-bold uppercase tracking-wider transition-all duration-300 rounded-[8px] ${
                    activeCategory === cat.toUpperCase()
                      ? "bg-[#36499B] text-white"
                      : "bg-transparent border-[1px] border-[#36499B] text-[#36499B] hover:bg-[#36499B]/10"
                  }`}
                >
                  <T>{cat === "TOUT" && locale === "en" ? "ALL" : cat}</T>
                </button>
              ))}
            </div>

            {/* Search Dropdown / Search Input */}
            <div className="relative w-full lg:w-[280px]">
              <input
                type="text"
                placeholder={` ${tSearchPlaceholder}`}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-[34px] bg-white placeholder:text-[#000] border px-4 pr-10 text-[14px] text-[#1D1D1B] outline-none font-['Inter']  shadow-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#36499B]" />
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#36499B] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Articles Grid (Exactly 3-columns, simple elegant cards) */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-4">
              {filteredArticles.map((article, index) => (
                <Link
                  to={
                    article.slug
                      ? `/${locale === "en" ? "en/news" : "actualite"}/${article.slug}`
                      : "#"
                  }
                  key={index}
                  className="group flex flex-col h-full w-full bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative w-full h-[220px] overflow-hidden bg-gray-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x250?text=Build+Africa+Expo";
                      }}
                    />
                  </div>

                  <div className="flex flex-col flex-grow p-6 gap-3 border-solid p-6 border-t-[6px] [border-image:linear-gradient(90deg,#00AB92_0%,#36499B_100%)_1] ">
                    <h3 className="font-headings-h4 text-[16px] md:text-[16px] font-bold leading-tight text-[#1D1D1B]">
                      <T> {article.title}</T>
                    </h3>
                    <p className="flex-1 font-body-regular text-[16px] leading-relaxed text-[#1d1d1b]/100">
                      <T> {article.description}</T>
                    </p>
                    <span className="text-[#00AB92] font-['inter'] font-[400] text-[16px] uppercase mt-auto pt-2 block">
                      <T>Lire la suite</T>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SIX UNIVERS POUR DÉCRYPTER L'AFRIQUE CONTEMPORAINE ─────────────── */}
      <section className="reveal w-full bg-white py-[120px] px-[20px]">
        <div className="mx-auto w-full max-w-[1440px] flex flex-col gap-10">
          <h2 className="text-[#1B3A6B] font-['Tomorrow'] w-full md:max-w-[600px] line-clamp-none md:line-clamp-3 font-bold text-[32px] md:text-[32px] leading-[40px] uppercase tracking-wide">
            <T> Quelques UNIVERS POUR DÉCRYPTER L'AFRIQUE CONTEMPORAINE</T>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {[
              {
                title: "FINANCE & INVESTISSEMENT",
                part1: "FINANCE &",
                part2: "INVESTISSEMENT",
                bg: "https://cdn.sanity.io/images/d4jrc26i/production/64b1e607235d7c13283e8ef2b226bf7b67678fea-1600x1067.jpg",
              },
              {
                title: "IMMOBILIER & ATTRACTIVITÉ TERRITORIALE",
                part1: "IMMOBILIER & ATTRACTIVITÉ",
                part2: "TERRITORIALE",
                bg: "https://cdn.sanity.io/images/d4jrc26i/production/0f8e5ab77bca4d8ad4ed3e080d77338f1c71db8f-720x540.jpg",
              },
              {
                title: "DEVELOPPEMENT URBAIN & INFRASTRUCTURES",
                part1: "DEVELOPPEMENT URBAIN &",
                part2: "INFRASTRUCTURES",
                bg: "https://cdn.sanity.io/images/d4jrc26i/production/55821e6e1716efef8192a2d26dfbc6aa527613f0-1300x535.jpg",
              },
              {
                title: "INDUSTRIE & SOUVERAINETÉ ÉCONOMIQUE",
                part1: "INDUSTRIE & SOUVERAINETÉ",
                part2: "ÉCONOMIQUE",
                bg: "https://cdn.sanity.io/images/d4jrc26i/production/a09040ca48d4bd1c789b0fb5b0a6112b4c4f30a7-720x480.jpg",
              },
              {
                title: "SPORT, CULTURE & INDUSTRIES CRÉATIVES",
                part1: "SPORT, CULTURE &",
                part2: "INDUSTRIES CRÉATIVES",
                bg: "https://cdn.sanity.io/images/d4jrc26i/production/96f86553030c298c807049684523a7d3e0c2f810-800x533.jpg",
              },
              {
                title: "INNOVATION & TECHNOLOGIE",
                part1: "INNOVATION &",
                part2: "TECHNOLOGIE",
                bg: "https://cdn.sanity.io/images/d4jrc26i/production/48d31b7624fb4c8e8b31f3c1d40282c502599078-800x533.jpg",
              },
            ].map((univ, index) => (
              <div
                key={index}
                className="group relative h-[400px] animate-fade-up [--animation-delay:200ms] hover:translate-y-[-10px] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <img
                  src={univ.bg}
                  alt={univ.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 group-hover:bg-[#161D3E]/75 transition-colors duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(22, 29, 62, 0) 0%, #161D3E 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <h4 className="text-white font-['Tomorrow'] font-bold text-[16px] w-full md:text-[18px] line-clamp-none uppercase leading-snug tracking-wider">
                    <T>{univ.part1}</T>
                    <br className="hidden md:block" />
                    <T>{univ.part2}</T>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PODCAST SECTION ────────────────────────────────────────────── */}
      <section className="reveal w-full bg-[#36499B] py-[80px] md:py-[120px] px-[20px]">
        <div className="mx-auto w-full max-w-[1440px] flex flex-col gap-12">
          {/* Header area */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="text-[#00AB92] font-['Tomorrow'] font-bold text-[14px] md:text-[16px] uppercase tracking-wider">
                <T>PODCASTS & CONVERSATIONS STRATÉGIQUES</T>
              </h3>
              <h2 className="text-white font-['Tomorrow'] font-bold text-[28px] md:text-[40px] uppercase leading-[1.2] tracking-wide">
                <T>LES VOIX QUI PENSENT ET BÂTISSENT L'AFRIQUE DE DEMAIN</T>
              </h2>
              <p className="text-[#D7DBEB] font-['Inter'] text-[14px] md:text-[16px] leading-relaxed max-w-[600px]">
                <T>
                  Entretiens d'exécutifs, débats sur l'infrastructure, la
                  diaspora, le sport et l'investissement. Une conversation
                  continue, toute l'année.
                </T>
              </p>
            </div>
            <Button className="bg-[#00AB92] hover:bg-[#00AB92]/90 text-white font-bold px-[16px] py-[8px] rounded-[4px] w-fit flex items-center gap-2 transition-colors text-[14px] uppercase tracking-wider">
              <T>TOUTES LES ÉPISODES</T>{" "}
              <span className="text-lg leading-none">&rarr;</span>
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast, idx) => (
              <div
                key={idx}
                onClick={() => setIsPodcastModalOpen(true)}
                className="group relative h-[520px] w-full overflow-hidden bg-[#0d132c] flex flex-col justify-between cursor-pointer border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/50"
              >
                {/* Background Image */}
                <img
                  src={podcast.img}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                  alt={podcast.title}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Top Icons */}
                <div className="relative z-10 flex justify-between items-center p-6">
                  <span className="bg-[#00AB92] text-white text-[12px] font-bold px-3 py-1 rounded-[4px] uppercase tracking-wider">
                    {podcast.ep}
                  </span>
                  <Headphones className="w-5 h-5 text-white/80" />
                </div>

                {/* Play Button Center */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-md group-hover:bg-[#00AB92]/90 group-hover:border-[#00AB92] group-hover:scale-110 transition-all duration-300 pointer-events-auto shadow-lg">
                    <Play
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-6 flex flex-col gap-3">
                  <h4 className="text-white font-bold text-[18px] md:text-[20px] leading-snug font-['Inter']">
                    <T>{podcast.title}</T>
                  </h4>
                  <p className="text-white/70 text-[14px] font-['Inter']">
                    <T>{podcast.sub}</T>
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-white/50 text-[12px] font-['Inter'] font-medium">
                    <Clock className="w-4 h-4" />
                    <span> {podcast.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExpertTestimonialsSection variant="light" />

      {/* ── NEWSLETTER SECTION ───────────────────────────────────────────── */}
      <section
        className="reveal w-full py-16 md:py-[120px] px-[20px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22, 29, 62, 0.8), rgba(22, 29, 62, 0.8)), url('https://cdn.sanity.io/images/d4jrc26i/production/a2b7a7b3961cd0c706068de1d0bcd72f5977c80b-2880x1920.jpg')",
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] flex flex-col items-start justify-start gap-[40px] text-start">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[24px] sm:text-[32px] md:text-[40px] uppercase leading-tight max-w-[950px] tracking-wide">
            <T>
              ABONNEZ-VOUS À NOTRE NEWSLETTER ET RECEVEZ LES DERNIÈRES NOUVELLES
            </T>
          </h1>

          <form className="flex w-full md:w-[400px] flex-col gap-4">
            <div className="flex w-full items-center bg-white  overflow-hidden">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Email"
                className="h-[48px] border-0 bg-transparent placeholder:text-[#1D1D1B]/100 px-4 text-[16px] text-black shadow-none  focus-visible:ring-0"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="h-[56px] w-[56px] p-0 hover:bg-transparent"
                aria-label="Newsletter submit"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.494 0.938737L14.802 7.70807C14.8543 7.73685 14.8978 7.77912 14.9282 7.83048C14.9586 7.88184 14.9746 7.94041 14.9746 8.00007C14.9746 8.05973 14.9586 8.1183 14.9282 8.16966C14.8978 8.22102 14.8543 8.2633 14.802 8.29207L2.494 15.0614C2.44325 15.0893 2.3861 15.1035 2.32818 15.1026C2.27027 15.1017 2.21358 15.0858 2.16372 15.0563C2.11385 15.0268 2.07253 14.9849 2.04382 14.9346C2.01511 14.8842 2.00001 14.8273 2 14.7694V1.23074C2.00001 1.17281 2.01511 1.11589 2.04382 1.06558C2.07253 1.01528 2.11385 0.973316 2.16372 0.943842C2.21358 0.914368 2.27027 0.898396 2.32818 0.897501C2.3861 0.896606 2.44325 0.910818 2.494 0.938737V0.938737ZM3.33333 8.66674V13.0781L12.5667 8.00007L3.33333 2.92207V7.3334H6.66667V8.66674H3.33333Z"
                    fill="#36499B"
                  />
                </svg>
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />

      {/* ── PODCAST MODAL ─────────────────────────────────────────────── */}
      {isPodcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-xl p-8 flex flex-col items-center text-center shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setIsPodcastModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 bg-[#00AB92]/10 rounded-full flex items-center justify-center mb-6">
              <Headphones className="w-8 h-8 text-[#00AB92]" />
            </div>
            <h3 className="text-2xl font-['Tomorrow'] font-bold text-[#1B3A6B] mb-2 uppercase">
              <T>Podcast à venir</T>
            </h3>
            <p className="text-gray-600 font-['Inter'] mb-6">
              <T>
                Cet épisode sera bientôt disponible. Restez à l'écoute pour ne
                rien manquer de nos prochaines conversations stratégiques !
              </T>
            </p>
            <Button
              onClick={() => setIsPodcastModalOpen(false)}
              className="bg-[#00AB92] rounded-[4px] px-[16px] py-[8px] hover:bg-[#00AB92]/90 text-white font-bold px-8 py-3 w-full"
            >
              <T>Fermer</T>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};
