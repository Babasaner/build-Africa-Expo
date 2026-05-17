import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { validateEmail, validatePhone } from "../../lib/validation";

const COUNTRIES = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne",
  "Angola", "Arabie Saoudite", "Argentine", "Australie", "Autriche",
  "Azerbaïdjan", "Bahreïn", "Bangladesh", "Belgique", "Bénin",
  "Biélorussie", "Bolivie", "Botswana", "Brésil", "Bulgarie",
  "Burkina Faso", "Burundi", "Cameroun", "Canada", "Cap-Vert",
  "Chili", "Chine", "Chypre", "Colombie", "Comores",
  "Congo (Brazzaville)", "Congo (Kinshasa)", "Corée du Sud", "Costa Rica",
  "Côte d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti",
  "Égypte", "Émirats Arabes Unis", "Équateur", "Espagne", "États-Unis",
  "Éthiopie", "Finlande", "France", "Gabon", "Gambie",
  "Ghana", "Grèce", "Guatemala", "Guinée", "Guinée Bissau",
  "Guinée Équatoriale", "Haïti", "Hongrie", "Inde", "Indonésie",
  "Irak", "Iran", "Irlande", "Islande", "Israël",
  "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan",
  "Kenya", "Koweït", "Laos", "Lesotho", "Liban",
  "Libéria", "Libye", "Liechtenstein", "Luxembourg", "Madagascar",
  "Malaisie", "Malawi", "Mali", "Maroc", "Mauritanie",
  "Maurice", "Mexique", "Moldavie", "Monaco", "Mongolie",
  "Mozambique", "Myanmar", "Namibie", "Niger", "Nigéria",
  "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan",
  "Pakistan", "Palestine", "Panama", "Paraguay", "Pays-Bas",
  "Pérou", "Philippines", "Pologne", "Portugal", "Qatar",
  "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Marin",
  "Sénégal", "Serbie", "Sierra Leone", "Singapour", "Slovaquie",
  "Slovénie", "Somalie", "Soudan", "Sri Lanka", "Suède",
  "Suisse", "Tanzanie", "Tchad", "Thaïlande", "Togo",
  "Tunisie", "Turquie", "Ukraine", "Uruguay", "Venezuela",
  "Vietnam", "Yémen", "Zambie", "Zimbabwe",
];

export const DevenirPartenaire = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    email: "",
    website: "",
    telephone: "",
    pays: "",
    message: "",
    newsletter: false,
    botcheck: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      setStatus({ submitting: false, submitted: false, error: emailCheck.message });
      return;
    }

    // Validate telephone format
    const phoneCheck = validatePhone(formData.telephone);
    if (!phoneCheck.valid) {
      setStatus({ submitting: false, submitted: false, error: phoneCheck.message });
      return;
    }

    // Validate country select
    if (!formData.pays) {
      setStatus({ submitting: false, submitted: false, error: "Veuillez choisir un pays dans la liste." });
      return;
    }

    const data = {
      nom: formData.nom,
      prenom: formData.prenom,
      entreprise: formData.entreprise,
      email: formData.email,
      website: formData.website,
      telephone: formData.telephone,
      pays: formData.pays,
      message: formData.message,
      newsletter: formData.newsletter ? "Oui" : "Non",
      botcheck: formData.botcheck,
      access_key: import.meta.env.VITE_WEB3FORMS_PARTENAIRE_KEY || "8973bdfe-8017-4d56-bcb7-b34f06d4f980",
      from_name: "Build Africa Expo - Devenir Partenaire",
      subject: `Demande de partenariat — ${formData.prenom} ${formData.nom} (${formData.entreprise})`,
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
          entreprise: "",
          email: "",
          website: "",
          telephone: "",
          pays: "",
          message: "",
          newsletter: false,
          botcheck: "",
        });
      } else {
        setStatus({ submitting: false, submitted: false, error: result.message });
      }
    } catch (err) {
      let errMsg = "Une erreur est survenue lors de l'envoi.";
      if (err instanceof TypeError || (err && err.message && err.message.toLowerCase().includes("fetch"))) {
        errMsg = "L'envoi a été bloqué par votre navigateur ou un bloqueur de publicité (AdBlock). Veuillez désactiver votre bloqueur pour ce site ou contactez-nous directement à contact@buildafricaexpo.com / +221 77 766 5757.";
      }
      setStatus({
        submitting: false,
        submitted: false,
        error: errMsg,
      });
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center bg-white overflow-hidden">
      <Helmet>
        <title>Devenir Partenaire — Build Africa Expo 2026</title>
        <meta
          name="description"
          content="Rejoignez Build Africa Expo 2026 en tant que partenaire. Réservez votre espace et bénéficiez d'une visibilité unique auprès des décideurs africains et internationaux."
        />
      </Helmet>
      <Header />

      {/* Hero Section — gradient identique au site */}
      <section
        className="relative w-full min-h-[40vh] md:min-h-[280px] animate-fade-in animate-delay-200 animate-duration-1000 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(92.26deg, #36499B 0.24%, #00AB92 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 w-full max-w-[1440px] flex flex-col justify-center gap-[16px] md:gap-[24px] min-h-[300px] md:min-h-[356px] mt-[100px] md:mt-[90px] px-[20px]">
          <h1 className="text-white font-['Tomorrow'] font-bold text-[28px] md:text-[48px] leading-[36px] md:leading-[56px] max-w-[900px] uppercase animate-fade-up">
            DEVENIR PARTENAIRE ? INSCRIVEZ-VOUS
          </h1>
          <p className="text-white/90 font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[20px] max-w-[680px] animate-fade-up [--animation-delay:200ms]">
            Nous vendons activement des espaces pour le BUILD AFRICA EXPO 2026.
            Contactez-nous dès maintenant pour réserver votre espace.
          </p>
        </div>
      </section>

      {/* Form Section — fond image audience sombre comme la capture */}
      <section
        className="relative w-full py-[80px] md:py-[120px] px-[20px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,22,66,0.82), rgba(13,22,66,0.82)), url('https://cdn.sanity.io/images/d4jrc26i/production/8e73dd1447741c61bfc7fad310665dd0cd62879e-2880x1620.jpg')",
        }}
      >
        <div className="reveal max-w-[780px] mx-auto w-full">
          {status.submitted ? (
            /* ── Success State ── */
            <div className="flex flex-col items-center gap-6 animate-fade-up text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#00AB92] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 16L13 23L26 9"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-white font-['Tomorrow'] font-bold text-[28px] md:text-[36px] uppercase">
                Demande envoyée !
              </h3>
              <p className="text-white/80 font-['Inter'] text-[16px] md:text-[18px] max-w-[500px]">
                Nous avons bien reçu votre demande de partenariat. Notre équipe
                vous contactera dans les plus brefs délais.
              </p>
              <Button
                onClick={() => setStatus({ ...status, submitted: false })}
                className="mt-4 bg-[#00AB92] text-white font-bold px-8 py-4 rounded-none hover:bg-[#36499B] transition-colors duration-300 cursor-pointer"
              >
                ENVOYER UNE AUTRE DEMANDE
              </Button>
            </div>
          ) : (
            /* ── Form ── */
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              {/* Anti-spam Honeypot field (invisible to humans, traps bots) */}
              <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                <input
                  type="text"
                  name="botcheck"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.botcheck}
                  onChange={handleChange}
                />
              </div>

              {/* Nom */}
              <input
                type="text"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom *"
                className="bg-white p-4 outline-none border-none placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B] focus:ring-2 focus:ring-[#00AB92] transition-shadow"
              />
              {/* Prénom */}
              <input
                type="text"
                name="prenom"
                required
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prénom *"
                className="bg-white p-4 outline-none border-none placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B] focus:ring-2 focus:ring-[#00AB92] transition-shadow"
              />
              {/* Entreprise */}
              <input
                type="text"
                name="entreprise"
                required
                value={formData.entreprise}
                onChange={handleChange}
                placeholder="Entreprise *"
                className="bg-white p-4 outline-none border-none placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B] focus:ring-2 focus:ring-[#00AB92] transition-shadow"
              />
              {/* Email */}
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className="bg-white p-4 outline-none border-none placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B] focus:ring-2 focus:ring-[#00AB92] transition-shadow"
              />
              {/* Téléphone */}
              <div className="flex w-full bg-white focus-within:ring-2 focus-within:ring-[#00AB92] transition-shadow">
                <PhoneInput
                  defaultCountry="sn"
                  value={formData.telephone}
                  onChange={(phone) => setFormData((prev) => ({ ...prev, telephone: phone }))}
                  inputClassName="w-full bg-white p-4 outline-none border-none placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B]"
                  countrySelectorProps={{
                    buttonClassName: "bg-white border-none h-full px-3 flex items-center justify-center focus:outline-none hover:bg-gray-50",
                    dropdownClassName: "bg-white border border-gray-100 shadow-xl max-h-[250px] overflow-y-auto z-50 text-black font-['Inter'] text-[14px]",
                  }}
                  inputProps={{
                    name: "telephone",
                    required: true,
                    placeholder: "Téléphone *",
                  }}
                />
              </div>
              {/* Website */}
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website"
                className="bg-white p-4 outline-none border-none placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B] focus:ring-2 focus:ring-[#00AB92] transition-shadow"
              />
              {/* Pays — select (pleine largeur pour équilibrer la grille) */}
              <div className="relative md:col-span-2">
                <select
                  name="pays"
                  required
                  value={formData.pays}
                  onChange={handleChange}
                  className="w-full bg-white p-4 pr-10 outline-none border-none appearance-none font-['Inter'] text-[14px] focus:ring-2 focus:ring-[#00AB92] transition-shadow cursor-pointer"
                  style={{ color: formData.pays ? "#1D1D1B" : "#343432" }}
                >
                  <option value="" disabled>
                    Pays *
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#343432"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Message — full width */}
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="En quoi pouvons-nous vous aider ?"
                className="md:col-span-2 bg-white p-4 outline-none border-none min-h-[140px] placeholder-[#343432] font-['Inter'] text-[14px] text-[#1D1D1B] resize-none focus:ring-2 focus:ring-[#00AB92] transition-shadow"
              />

              {/* Bottom row: checkbox + button */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Newsletter checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 flex items-center justify-center transition-all duration-200 ${
                        formData.newsletter
                          ? "bg-[#00AB92] border-[#00AB92]"
                          : "bg-white border-white/60 group-hover:border-[#00AB92]"
                      }`}
                    >
                      {formData.newsletter && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path
                            d="M1 5L4.5 8.5L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white/80 font-['Inter'] text-[14px] group-hover:text-white transition-colors">
                    Oui, je souhaite recevoir des e-mails
                  </span>
                </label>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={status.submitting}
                  className="bg-[#36499B] text-white font-bold px-6 py-3 rounded-none hover:bg-[#00AB92] transition-colors duration-300 cursor-pointer flex items-center gap-3 disabled:opacity-50 font-['Tomorrow'] text-[14px] tracking-wide"
                >
                  {status.submitting ? "ENVOI EN COURS..." : "ENVOYER"}
                  {!status.submitting && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.52867 11.5287L8.47133 12.4714L12.9427 8.00002L8.47133 3.52869L7.52867 4.47135L10.3907 7.33335H4V8.66669H10.3907L7.52867 11.5287Z"
                        fill="#D7DBEB"
                      />
                    </svg>
                  )}
                </Button>
              </div>

              {/* Error message */}
              {status.error && (
                <div className="md:col-span-2">
                  <p className="text-red-400 font-['Inter'] text-[14px] font-medium">
                    {status.error}
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};
