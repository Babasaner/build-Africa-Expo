import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { validateEmail, validatePhone } from "../../lib/validation";
import { T } from "../../lib/AutoTranslate";

export const Contact = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    entreprise: "",
    ville: "",
    message: "",
    botcheck: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    // Anti-spam Honeypot check
    if (formData.botcheck) {
      // Silent success to trick the spam bot without hitting API limits
      setStatus({ submitting: false, submitted: true, error: null });
      return;
    }

    // Validate email (anti-disposable check)
    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) {
      setStatus({
        submitting: false,
        submitted: false,
        error: emailCheck.message,
      });
      return;
    }

    // Validate telephone format
    const phoneCheck = validatePhone(formData.telephone);
    if (!phoneCheck.valid) {
      setStatus({
        submitting: false,
        submitted: false,
        error: phoneCheck.message,
      });
      return;
    }

    const data = {
      ...formData,
      access_key:
        import.meta.env.VITE_WEB3FORMS_CONTACT_KEY ||
        "a9752037-7b12-4195-a489-38caa53f4833",
      from_name: "Build Africa Expo - Site Web",
      subject: `Nouveau message de ${formData.prenom} ${formData.nom}`,
      replyto: formData.email,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          entreprise: "",
          ville: "",
          message: "",
        });
      } else {
        setStatus({
          submitting: false,
          submitted: false,
          error: result.message,
        });
      }
    } catch (err) {
      let errMsg = "Une erreur est survenue lors de l'envoi.";
      if (
        err instanceof TypeError ||
        (err.message && err.message.toLowerCase().includes("fetch"))
      ) {
        errMsg =
          "L'envoi a été bloqué par votre navigateur ou un bloqueur de publicité (AdBlock). Veuillez désactiver votre bloqueur pour ce site ou contactez-nous directement à contact@buildafricaexpo.com / +221 77 766 5757.";
      }
      setStatus({
        submitting: false,
        submitted: false,
        error: errMsg,
      });
    }
  };

  const collaborationCards = [
    {
      title: "PARTENARIATS & SPONSORING",
      description:
        "Pour les partenaires stratégiques, sponsors, institutions et collaborations à forte valeur.",
      bg: "bg-[#36499B]",
      buttonColor: "bg-[#00AB92]",
    },
    {
      title: "INVESTISSEMENTS & OPPORTUNITÉS",
      description:
        "Pour les discussions autour des investissements, projets, collaborations et opportunités de développement.",
      bg: "bg-[#00AB92]",
      buttonColor: "bg-[#36499B]",
    },
    {
      title: "MÉDIAS & PRESSE",
      description:
        "Pour les interviews, demandes médias, partenariats presse et collaborations éditoriales.",
      bg: "bg-[#36499B]",
      buttonColor: "bg-[#00AB92]",
    },
    {
      title: "INFORMATIONS GÉNÉRALES",
      description:
        "Pour toute demande d'information complémentaire concernant la plateforme Build Africa Expo.",
      bg: "bg-[#00AB92]",
      buttonColor: "bg-[#36499B]",
    },
  ];

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white overflow-hidden">
      <Helmet>
        <title>Contact & Relations — Build Africa Expo 2026</title>
        <meta
          name="description"
          content="Contactez Build Africa Expo 2026 pour toute question relative aux partenariats, investissements, médias ou informations générales."
        />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full min-h-[40vh] md:min-h-[280px] animate-fade-in animate-delay-200 animate-duration-1000 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(92.26deg, #36499B 0.24%, #00AB92 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[16px] md:gap-[24px] min-h-[300px] md:min-h-[356px] mt-[100px] md:mt-[90px] px-[20px]">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] max-w-[900px] animate-fade-up">
            <T>CONTACT</T>
          </h1>
          <p className="text-white/90 font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[20px] max-w-[700px] animate-fade-up [--animation-delay:200ms]">
            <T>
              Sélectionnez le département concerné pour assurer un traitement
              rapide et personnalisé de votre demande.
            </T>
          </p>
        </div>
      </section>

      {/* Collaboration Section */}
      <section
        className="relative w-full  py-[120px] px-[20px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.sanity.io/images/d4jrc26i/production/8e73dd1447741c61bfc7fad310665dd0cd62879e-2880x1620.jpg')",
        }}
      >
        <div className="max-w-[1440px] mx-auto reveal animate-fade-up">
          <h2 className="text-white text-center font-['Tomorrow'] font-bold text-[20px] md:text-[32px] mb-12 uppercase">
            <T>COMMENT POUVONS-NOUS COLLABORER ?</T>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationCards.map((card, index) => (
              <div
                key={index}
                className={`${card.bg} p-[24px] flex flex-col justify-between min-h-[240px] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] cursor-default`}
              >
                <div className="flex flex-col gap-4">
                  <h4 className="text-white font-['Tomorrow'] font-bold leading-[24px] text-[20px] ">
                    <T>{card.title}</T>
                  </h4>
                  <p className="text-white/100 font-['Inter'] text-[14px] leading-relaxed ">
                    <T>{card.description}</T>
                  </p>
                </div>
                <a href="#contact">
                  <Button
                    className={`${card.buttonColor} mt-6 w-fit text-white font-bold px-[16px] py-[8px] rounded-[8px] transition-colors duration-300 flex items-center gap-2 cursor-pointer ${
                      card.buttonColor === "bg-[#00AB92]"
                        ? "hover:bg-[#36499B]"
                        : "hover:bg-[#00AB92]"
                    }`}
                  >
                    <T>CONTACTER</T>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 7H13M13 7L7 1M13 7L7 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="reveal w-full overflow-hidden pl-[20px] bg-white pt-[120px] pb-[0px] ">
        <div className="flex flex-col lg:flex-row items-end">
          {/* Left: Constrained Content */}
          <div className="w-full lg:w-1/2 lg:pl-[calc((100vw-1440px)/2-30px)] lg:pr-12 mb-12 lg:mb-[80px] reveal animate-fade-left">
            <h2 className="text-[#1D1D1B] w-[100%] md:w-[425px] font-['Tomorrow'] font-bold text-[28px] md:text-[32px] leading-tight mb-8 uppercase">
              <T>UNE PLATEFORME AFRICAINE CONNECTÉE AUX ÉCOSYSTÈMES MONDIAUX</T>
            </h2>
            <p className="text-[#343432] w-[100%] md:w-[425px] font-['Inter'] text-[16px] md:text-[18px] leading-relaxed max-w-[540px]">
              <T>
                Build Africa Expo crée des liens entre l’Afrique, sa diaspora et
                les centres économiques mondiaux grâce à des initiatives
                stratégiques et des partenariats. Cette plateforme favorise les
                rencontres entre territoires, investisseurs et acteurs du
                développement pour soutenir les transformations du continent
                africain.
              </T>
            </p>
          </div>

          {/* Right: Full Width Map */}
          <div className="w-full lg:w-1/2 relative bg-white">
            {/* Aspect Ratio Wrapper to keep Pin relative to Map Pixels */}
            <div className="relative w-full aspect-[913/441] group overflow-hidden">
              <img
                src="https://cdn.sanity.io/images/d4jrc26i/production/4e6b89dd3e840cabefd15485f8069f9334d5fe09-913x441.svg"
                alt="World Map"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact" className="reveal w-full flex flex-col lg:flex-row">
        {/* Left: Form */}
        <div className="flex-[3] bg-[#D7DBEB] p-[20px] md:p-[120px] lg:pl-[calc((100vw-1440px)/2-30px)]">
          {status.submitted ? (
            <div className="flex flex-col items-start gap-6 animate-fade-up px-[20px]">
              <h3 className="text-[#36499B] font-['Tomorrow'] font-bold text-[32px] uppercase">
                <T>Merci pour votre message !</T>
              </h3>
              <p className="text-[#1D1D1B] font-['Inter'] text-[18px]">
                <T>
                  Nous avons bien reçu votre demande et nous vous répondrons
                  dans les plus brefs délais.
                </T>
              </p>
              <Button
                onClick={() => setStatus({ ...status, submitted: false })}
                className="bg-[#36499B] text-white font-bold px-8 py-4 rounded-none hover:bg-[#00AB92] transition-colors"
              >
                <T>ENVOYER UN AUTRE MESSAGE</T>
              </Button>
            </div>
          ) : (
            <form
              className="grid grid-cols-1 px-[20px] md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* Anti-spam Honeypot field (invisible to humans, traps bots) */}
              <div
                style={{ position: "absolute", left: "-9999px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="botcheck"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.botcheck}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom"
                className="bg-white p-4 outline-none border-none placeholder-[#343432]"
              />
              <input
                type="text"
                name="prenom"
                required
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prenom"
                className="bg-white p-4 outline-none border-none placeholder-[#343432]"
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-white p-4 outline-none border-none placeholder-[#343432]"
              />
              <div className="flex w-full bg-white focus-within:ring-2 focus-within:ring-[#36499B] transition-shadow">
                <PhoneInput
                  defaultCountry="sn"
                  value={formData.telephone}
                  onChange={(phone) =>
                    setFormData((prev) => ({ ...prev, telephone: phone }))
                  }
                  inputClassName="w-full bg-white p-4 outline-none border-none placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B]"
                  countrySelectorProps={{
                    buttonClassName:
                      "bg-white border-none h-full px-3 flex items-center justify-center focus:outline-none hover:bg-gray-50",
                    dropdownClassName:
                      "bg-white border border-gray-100 shadow-xl max-h-[250px] overflow-y-auto z-50 text-black font-['Inter'] text-[14px]",
                  }}
                  inputProps={{
                    name: "telephone",
                    required: true,
                    placeholder: "Téléphone *",
                  }}
                />
              </div>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleChange}
                placeholder="Entreprise"
                className="bg-white p-4 outline-none border-none placeholder-[#343432]"
              />
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Ville"
                className="bg-white p-4 outline-none border-none placeholder-[#343432]"
              />
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="bg-white p-4 outline-none border-none md:col-span-2 min-h-[150px] placeholder-[#343432]"
              />
              <div className="md:col-span-2 flex flex-col gap-4">
                <Button
                  disabled={status.submitting}
                  className="h-[36px] md:h-[44px] rounded-lg bg-[#36499B] w-fit px-4 md:px-6 font-bold text-white hover:bg-[#00AB92] transition-colors duration-300 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {status.submitting ? (
                    <T>ENVOI EN COURS...</T>
                  ) : (
                    <T>ENVOYER</T>
                  )}
                  {!status.submitting && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.52867 11.5287L8.47133 12.4714L12.9427 8.00002L8.47133 3.52869L7.52867 4.47135L10.3907 7.33335H4V8.66669H10.3907L7.52867 11.5287Z"
                        fill="#D7DBEB"
                      />
                    </svg>
                  )}
                </Button>
                {status.error && (
                  <p className="text-red-600 font-medium animate-shake">
                    {status.error}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Right: Info Sidebar */}
        <div className="flex-[2] bg-[#1D1D1B] flex flex-col items-center py-16 md:py-[120px] px-6 md:px-[80px] lg:pr-[calc((100vw-1440px)/2-30px)] lg:pl-20 text-white gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="text-[#00AB92] font-['Tomorrow'] font-bold leading-[24px] text-[20px] uppercase">
              <T>POUR VISITER</T>
            </h4>
            <div className="flex flex-col gap-1">
              <p className="font-['Inter'] font-normal text-[16px]">
                +221 77 766 5757
              </p>
              <p className="ffont-['Inter'] font-normal text-[16px]">
                contact@buildafricaexpo.com
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[#00AB92] font-['Tomorrow'] font-bold leading-[24px] text-[20px] uppercase">
              <T>POUR EXPOSER</T>
            </h4>
            <div className="flex flex-col gap-1">
              <p className="font-['Inter'] font-normal text-[16px]">
                +221 77 766 5757
              </p>
              <p className="font-['Inter'] font-normal text-[16px]">
                contact@buildafricaexpo.com
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[#00AB92] font-['Tomorrow'] font-bold leading-[24px] text-[20px] uppercase">
              <T>MEDIA & PRESSE</T>
            </h4>
            <div className="flex flex-col gap-1">
              <p className="font-['Inter'] font-normal text-[16px]">
                +221 77 766 5757
              </p>
              <p className="font-['Inter'] font-normal text-[16px]">
                contact@buildafricaexpo.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
