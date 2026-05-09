import React, { useState, useRef, useEffect, useCallback } from "react";

// ============================================================
// DONNÉES PRÉ-DÉFINIES DU CHATBOT (sécurisé - pas d'API externe)
// ============================================================
const QUICK_REPLIES = [
  { id: "what", label: "🏛️ Qu'est-ce que le BAE ?" },
  { id: "goals", label: "🎯 Objectifs du salon" },
  { id: "edition2025", label: "📅 Édition 2025" },
  { id: "tor", label: "📄 Termes de référence" },
  { id: "brochure", label: "⬇️ Télécharger la brochure" },
  { id: "who", label: "👥 Qui peut participer ?" },
  { id: "contact", label: "📞 Contact & Informations" },
];

const RESPONSES = {
  what: `Build Africa Expo (BAE) est le premier salon international dédié à l'immobilier, la construction, l'aménagement urbain et les infrastructures en Afrique. 🌍\n\nIl réunit décideurs, investisseurs, experts et professionnels du secteur autour d'expositions, de conférences et de sessions de networking de haut niveau.`,
  goals: `Les objectifs du Build Africa Expo sont :\n\n✅ Créer des opportunités d'investissement dans l'immobilier et les infrastructures africaines\n✅ Stimuler l'innovation dans la construction durable\n✅ Favoriser les échanges entre pays africains\n✅ Positionner Dakar comme hub incontournable des grandes manifestations internationales\n✅ Promouvoir les villes africaines intelligentes et vertes`,
  edition2025: `L'édition 2025 du Build Africa Expo se tiendra à Dakar, Sénégal, au Centre International des Expositions de Diamniadio. 🇸🇳\n\nCet événement réunira des experts, des architectes, des promoteurs et des décideurs venus de toute l'Afrique pour deux jours de conférences, forums et expositions.`,
  tor: `Les Termes de Référence (TDR) détaillent le cadre officiel, les thématiques et les conditions de participation au Build Africa Expo.\n\n📄 Vous pouvez les consulter directement depuis le bouton "TERMES DE RÉFÉRENCE" présent sur la page d'accueil du site.`,
  brochure: `La brochure officielle de Build Africa Expo contient toutes les informations essentielles sur le salon, les opportunités de partenariat et le programme.\n\n⬇️ Pour la télécharger, cliquez sur le bouton "TÉLÉCHARGER LA BROCHURE" présent sur la bannière principale de notre site.`,
  who: `Build Africa Expo est ouvert à tous les acteurs du secteur :\n\n🏗️ Promoteurs immobiliers & développeurs\n🏛️ Architectes & urbanistes\n💼 Investisseurs & financeurs\n🏢 Entreprises de construction & BTP\n🌿 Acteurs de la ville verte & durable\n🏛️ Institutions publiques & collectivités\n📰 Médias & journalistes spécialisés`,
  contact: `Pour toute information complémentaire :\n\n📧 Contactez-nous via le formulaire sur notre site web\n🌐 www.buildafricaexpo.com\n📍 Dakar, Sénégal\n\nNous vous répondrons dans les meilleurs délais ! 😊`,
};

const KEYWORD_MAP = [
  { keywords: ["salon", "bae", "build africa", "expo", "c'est quoi", "qu'est-ce"], responseId: "what" },
  { keywords: ["objectif", "but", "mission", "vocation", "pourquoi"], responseId: "goals" },
  { keywords: ["2025", "édition", "edition", "date", "quand", "lieu", "où", "diamniadio"], responseId: "edition2025" },
  { keywords: ["termes", "référence", "reference", "tdr", "cahier"], responseId: "tor" },
  { keywords: ["brochure", "télécharger", "telecharger", "document", "pdf"], responseId: "brochure" },
  { keywords: ["participer", "participant", "exposant", "qui", "public", "cible"], responseId: "who" },
  { keywords: ["contact", "email", "téléphone", "telephone", "joindre", "info"], responseId: "contact" },
];

const DEFAULT_RESPONSE = "Je suis désolée, je n'ai pas compris votre question 🙏\n\nVeuillez sélectionner l'une des questions ci-dessous ou reformuler votre demande. Je ferai de mon mieux pour vous aider !";

const WELCOME_MESSAGES = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Bonjour et bienvenue sur Build Africa Expo ! 👋\n\nJe suis **Sarah**, votre assistante virtuelle. Je suis là pour répondre à toutes vos questions sur notre salon.",
  },
  {
    id: "welcome-2",
    sender: "bot",
    text: "Comment puis-je vous aider aujourd'hui ? Sélectionnez une question rapide ou écrivez directement votre message. ⬇️",
  },
];

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(WELCOME_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 50);
      inputRef.current?.focus();
    }
  }, [messages, isOpen, scrollToBottom]);

  const addBotMessage = useCallback((text) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, sender: "bot", text },
      ]);
    }, 800);
  }, []);

  const handleSend = useCallback((text) => {
    const trimmed = (text || "").trim();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: trimmed },
    ]);
    setInputValue("");

    // Find response
    const lower = trimmed.toLowerCase();
    let responseId = null;

    for (const { keywords, responseId: rid } of KEYWORD_MAP) {
      if (keywords.some((kw) => lower.includes(kw))) {
        responseId = rid;
        break;
      }
    }

    addBotMessage(responseId ? RESPONSES[responseId] : DEFAULT_RESPONSE);
  }, [addBotMessage]);

  const handleQuickReply = useCallback((item) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: item.label },
    ]);
    addBotMessage(RESPONSES[item.id] || DEFAULT_RESPONSE);
  }, [addBotMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  }, [inputValue, handleSend]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* ====== BOUTON FLOTTANT ====== */}
      <button
        id="chatbot-toggle-btn"
        onClick={handleToggle}
        aria-label={isOpen ? "Fermer le chat avec Sarah" : "Parler à Sarah - Assistante Build Africa Expo"}
        className="fixed bottom-6 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#00ab92] text-white shadow-xl transition-transform hover:scale-110 hover:bg-[#009880]"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
        )}
      </button>

      {/* ====== FENÊTRE DE CHAT ====== */}
      {isOpen && (
        <div
          id="chatbot-window"
          role="dialog"
          aria-label="Chat avec Sarah - Build Africa Expo"
          aria-modal="true"
          className="fixed bottom-[6rem] right-6 z-[9998] flex h-[520px] max-h-[80vh] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200"
        >
          {/* --- EN-TÊTE --- */}
          <div className="flex items-center justify-between bg-[#161d3e] px-4 py-3 text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-md">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="Logo Build Africa Expo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.textContent = "BAE";
                    e.currentTarget.parentElement.style.cssText += "color:#36499b;font-weight:700;font-size:10px;";
                  }}
                />
              </div>
              <div>
                <h2 className="font-bold text-[15px] leading-tight m-0 p-0" style={{ fontFamily: "Inter, sans-serif" }}>
                  Sarah
                </h2>
                <p className="text-xs text-white/70 m-0 p-0 leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                  Build Africa Expo • En ligne
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Fermer le chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>
          </div>

          {/* --- ZONE DE MESSAGES --- */}
          <div
            className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 bg-gray-50"
            aria-live="polite"
            aria-label="Messages de chat"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.sender === "bot" && (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#161d3e] p-0.5 shadow">
                    <img
                      src={`${import.meta.env.BASE_URL}logo.png`}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "rounded-br-none bg-[#00ab92] text-white"
                      : "rounded-bl-none bg-white text-gray-800 border border-gray-100"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Indicateur "en train d'écrire..." */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#161d3e] p-0.5 shadow">
                  <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" aria-hidden="true" className="h-full w-full object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-white px-4 py-3 shadow-sm border border-gray-100">
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* --- QUESTIONS RAPIDES --- */}
          <div className="flex flex-wrap gap-1.5 border-t border-gray-100 bg-white p-3 flex-shrink-0">
            {QUICK_REPLIES.map((item) => (
              <button
                key={item.id}
                onClick={() => handleQuickReply(item)}
                className="rounded-full border border-[#00ab92] bg-white px-2.5 py-1 text-[11px] text-[#00ab92] transition-colors hover:bg-[#00ab92] hover:text-white"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* --- ZONE DE SAISIE --- */}
          <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2.5 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez votre message..."
              maxLength={500}
              autoComplete="off"
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none transition-colors focus:border-[#00ab92] focus:ring-1 focus:ring-[#00ab92]"
              style={{ fontFamily: "Inter, sans-serif" }}
              aria-label="Zone de saisie du message"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#00ab92] text-white transition-all hover:bg-[#009880] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Envoyer le message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
