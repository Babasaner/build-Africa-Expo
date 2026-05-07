import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client, urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, Calendar, User } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "post" && slug.current == $slug][0]`;
    client.fetch(query, { slug }).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center">Article non trouvé</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow pt-[110px] md:pt-[130px]">
        {/* Header / Hero */}
        <div className="relative h-[400px] w-full">
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center px-5">
            <div className="max-w-[800px] text-center">
              <h1 className="font-display-display-large text-[32px] md:text-[48px] font-bold text-white uppercase leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[800px] px-5 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-8 p-0 text-[#00AB92] hover:bg-transparent">
              <ChevronLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
            </Button>
          </Link>

          <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Admin BAE
            </div>
          </div>

          {/* Portable Text Content (WYSIWYG) */}
          <div className="prose prose-lg max-w-none prose-headings:text-[#161D3E] prose-p:text-gray-600">
            <PortableText value={post.body} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
