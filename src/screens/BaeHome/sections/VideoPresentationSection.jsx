import React, { useState, useEffect, useRef } from "react";
import { Play, X } from "lucide-react";
import { client, urlFor } from "../../../lib/sanity";

export const VideoPresentationSection = () => {
  const [videoData, setVideoData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const query = `*[_type == "videoSection"][0] {
      title,
      "thumbnailUrl": thumbnail.asset->url,
      videoUrl
    }`;

    client.fetch(query).then((data) => {
      if (data) {
        setVideoData(data);
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Sanity fetch error:", err);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    // Only observe if the video is playing
    if (!isPlaying || !containerRef.current) {
      setIsFloating(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // If the container is out of view, float it.
        setIsFloating(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isPlaying]);

  if (isLoading) {
    return (
      <section className="relative w-full bg-[#EAEDF5] py-12 lg:py-[80px]">
        <div className="text-center text-[#36499B]">Chargement de la vidéo...</div>
      </section>
    );
  }

  // Si aucune donnée n'est trouvée dans Sanity, on n'affiche rien
  if (!videoData) {
    return null;
  }

  // Extraction de l'ID YouTube si c'est un lien YouTube
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let embedUrl = url;
    if (url.includes("youtube.com/watch?v=")) {
      embedUrl = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      embedUrl = url.replace("youtu.be/", "youtube.com/embed/");
    }
    return embedUrl;
  };

  return (
    <section className="relative w-full bg-[#EAEDF5] ">
      <div className="mx-auto flex w-full flex-col items-center gap-8 px-0">
        {videoData.title && (
          <h2 className="text-center hidden font-headings-h2 text-[32px] md:text-[48px] font-bold leading-tight text-[#36499B]">
            {videoData.title}
          </h2>
        )}
        
        {/* Placeholder container to maintain height when video is floating */}
        <div 
          ref={containerRef}
          className="relative w-full shadow-xl aspect-video bg-black group rounded-2xl" 
        >
          {!isPlaying ? (
            <div className="w-full h-full cursor-pointer relative overflow-hidden rounded-2xl" onClick={() => setIsPlaying(true)}>
              {videoData.thumbnailUrl ? (
                <img
                  src={videoData.thumbnailUrl}
                  alt={videoData.title || "Video thumbnail"}
                  className="w-full h-full object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#36499B]">
                  <span className="text-white">Aperçu non disponible</span>
                </div>
              )}
              
              
            </div>
          ) : (
            <div className={
              isFloating 
                ? "fixed bottom-5 right-5 z-[9999] w-[320px] sm:w-[400px] aspect-video rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5" 
                : "w-full h-full overflow-hidden rounded-2xl"
            }>
              {isFloating && (
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  aria-label="Fermer la vidéo"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <iframe
                className="w-full h-full border-0"
                src={`${getEmbedUrl(videoData.videoUrl)}?autoplay=1`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
