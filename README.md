# 🏗️ Build Africa Expo — Application Officielle 2026

Une plateforme web moderne, performante et hautement dynamique développée pour le **Build Africa Expo 2026 (Sénégal Diaspora Investment Forum)** ayant eu lieu à New York et Toronto. Cette application web sert de vitrine officielle pour connecter les institutions publiques, les promoteurs immobiliers, la diaspora africaine et les investisseurs internationaux autour des projets stratégiques africains.

🔗 **Site en production :** [buildafricaexpo.com](https://www.buildafricaexpo.com/)

---

##  Fonctionnalités Clés

- **⚡ Architecture Jamstack Haute Performance :** Un site ultra-rapide rendu de manière optimisée grâce au combo React + Vite.
- ** CMS Headless & Gestion de Contenu Dynamique :** Intégration complète de **Sanity.io** pour permettre aux organisateurs de gérer de façon totalement autonome les intervenants (Speakers), les partenaires, les articles de la Newsroom (blog) et le programme des journées.
- ** Système Multilingue complet (Internationalization) :** Support natif du Français (FR) et de l'Anglais (EN) pour toucher une cible globale d'investisseurs.
- ** Gestion de Programme Interactive :** Affichage optimisé des panels, horaires et thématiques spécifiques aux deux villes (New York & Toronto).
- * Saisie Typée & Sécurisée :** Utilisation rigoureuse de TypeScript sur tout le projet pour assurer la robustesse du code et l'absence de bugs en production.
- ** Design Responsive & UI Soignée :** Expérience utilisateur fluide pensée mobile-first, adaptée aux exigences graphiques d'un événement international de grande envergure.

---

## 🛠️ Stack Technique

### Frontend
- **Framework :** [React](https://react.dev/) (avec hooks personnalisés et gestion d'états réactifs)
- **Outil de Build :** [Vite.js](https://vitejs.dev/) (pour un rechargement à chaud ultra-rapide et un bundling optimisé)
- **Langage :** [TypeScript](https://www.typescriptlang.org/) (Sûreté de typage et autocomplétion optimale)
- **Styling :** CSS moderne / Tailwind CSS 
- **Gestion des icônes :** Boxicons / Lucide React

### Backend & CMS
- **Content Management System :** [Sanity.io](https://www.sanity.io/) (Headless CMS)
- **Langage de Requête :** GROQ (Graph Relational Object Queries) pour récupérer la donnée de façon chirurgicale.

---

## 📐 Architecture du Projet (Aperçu)

```text
├── src/
│   ├── components/       # Composants UI réutilisables (Header, Footer, SpeakerCard...)
│   ├── pages/            # Pages de l'application (Home, About, Newsroom, Partners...)
│   ├── sanity/           # Configuration du client Sanity et requêtes GROQ
│   ├── i18n/             # Fichiers de traduction et configuration des langues
│   ├── types/            # Fichiers de définitions TypeScript pour l'API Sanity
│   ├── App.tsx           # Routage et point d'entrée principal
│   └── main.tsx
├── sanity-studio/        
├── package.json
└── tsconfig.json
