import React from "react";
import { Button } from "../../../components/ui/button";

const EntrepriseInvite = () => {
  return (
    <>
      {/* ENTREPRISES INVITÉES Section */}
      <section className="reveal w-full px-[20px] py-16 md:py-[120px] bg-[#fff]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
          <div className="text-center">
            <h2 className="text-[#202C5D] text-[32px] md:text-[48px] font-['Tomorrow'] uppercase font-bold leading-tight">
              ENTREPRISES INVITÉES
            </h2>
          </div>

          <div className="w-full mx-auto flex flex-col">
            <img
              src="https://cdn.sanity.io/images/d4jrc26i/production/a7eaf2af72e6e31dfe724f15eb9f7a60345cc1d4-1308x770.png"
              alt="entreprises invites"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default EntrepriseInvite;
