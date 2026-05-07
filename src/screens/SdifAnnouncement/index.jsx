import React from 'react';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const SdifAnnouncement = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-[110px] md:pt-[130px] p-6">
        <h1 className="text-2xl font-bold">SDIF Announcement</h1>
        <p className="mt-2 text-muted-foreground">Details about SDIF announcements will appear here.</p>
      </main>
      <Footer />
    </div>
  );
};
