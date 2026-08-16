# Andy SIWA — Portfolio Ingénieur Électricien & Développeur Digital

Portfolio professionnel d'Andy SIWA, ingénieur électricien spécialisé en coordination technique, réseaux HTA/BT, domotique IoT et développement web moderne.

## 🚀 Aperçu

Plateforme web interactive (Next.js + Sanity CMS) présentant réalisations, blog, marketplace de produits digitaux et idées de projets futurs.

**Site en ligne :** [https://andysiwa.com](https://andysiwa.com)

## ✨ Fonctionnalités

- **Accueil** avec photo de profil animée (flottement, anneau lumineux rotatif, halo pulsant) et statistiques
- **Réalisations & Projets** — études HTA/BT, domotique, ingénierie (pages détaillées par slug)
- **Blog & Articles** — articles techniques avec partage (LinkedIn, X, WhatsApp, Facebook, copie de lien)
- **Marketplace Digitale** — produits digitaux vendus via Chariow
- **Idées & Projets futurs** — roadmap avec statuts (concept / étude / prototype / bientôt)
- **Studio Sanity** — CMS hébergé sur Sanity cloud pour gérer tout le contenu (projets, posts, produits, idées, profil)
- **Fond animé** — particules connectées sur canvas (style constellation) + halos néon
- **Design high-tech premium** — thème sombre, néon cyan/bleu/violet, typographies Inter / Orbitron / Rajdhani

## 🛠️ Technologies

- **Next.js 15** (App Router, Server Components)
- **React 19**
- **Sanity CMS** + next-sanity (Studio embarqué)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — animations
- **lucide-react** + **@icons-pack/react-simple-icons** — icônes

## 📁 Structure du Projet

```
├── src/
│   ├── app/                   # Pages (App Router)
│   │   ├── layout.tsx         # Layout racine (fond animé, nav, footer)
│   │   ├── page.tsx           # Accueil (hero, services, projets, blog, produits, idées)
│   │   ├── realisations/      # Liste + détail [slug]
│   │   ├── blog/              # Liste + détail [slug]
│   │   ├── marketplace/       # Produits digitaux
│   │   ├── idees/             # Idées & projets futurs
│   │   └── globals.css        # Thème, mesh bg, cartes/liens cyber
│   ├── components/            # AvatarFrame, ParticleBackground, Navbar, Footer, ShareButtons, LinkedinIcon
│   └── sanity/
│       ├── client.ts          # Client Sanity
│       ├── env.ts             # Variables d'environnement
│       ├── schemas/           # Schémas (project, post, product, idea, profile)
│       └── lib/data.ts        # Fetch GROQ + fallback mock data
├── public/img/                # Images statiques
├── img/                       # Images legacy
├── _legacy/                   # Ancien site statique (HTML/CSS/JS)
├── sanity.config.ts           # Config Sanity Studio
├── sanity.cli.ts              # Config CLI Sanity (dev/deploy)
├── netlify.toml               # Config Netlify
└── package.json
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js ≥ 18
- npm

### Installation

```bash
git clone <url-du-depot>
cd Portfolio-Andy-SIWA-V2
npm install
```

### Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez vos identifiants Sanity :

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-10
SANITY_API_READ_TOKEN=...   # optionnel
```

> Sans configuration Sanity valide, le site fonctionne en **mode démo** avec des données mock (voir `src/sanity/lib/data.ts`).

### Lancement

```bash
npm run dev       # Développement (http://localhost:3000)
npm run build     # Build de production
npm run start     # Production (après build)
npm run lint      # Lint
```

Le **Studio Sanity** se lance séparément du site et est hébergé sur le cloud Sanity :

```bash
npm run studio            # Studio en local (http://localhost:3333)
npm run studio:build      # Build du bundle studio (dist/)
npm run studio:deploy     # Déploie le studio sur Sanity cloud
```

**Studio hébergé :** [https://andysiwa-studio.sanity.studio](https://andysiwa-studio.sanity.studio)

## ☁️ Déploiement

- **Netlify** — configuré dans `netlify.toml` (build : `npm run build`, publish : `.next`, via `@netlify/plugin-nextjs`, Node 20)
- Configurable sur **Vercel** sans modification

## 💡 Note : Mode Démo vs CMS

Les fetchs vers Sanity basculent automatiquement sur des **données mock** si `NEXT_PUBLIC_SANITY_PROJECT_ID` est absent ou invalide. Branche ainsi le site au CMS : renseigne les variables d'environnement, puis crée du contenu dans le Studio (`/studio`).

## 📞 Contact

- **Location** : Yaoundé, Cameroun
- **GitHub** : [AndySIWA](https://github.com/AndySIWA/)
- **LinkedIn** : [andy-siwa-180283199](https://www.linkedin.com/in/andy-siwa-180283199/)

## ⚖️ Licence

Ce projet est la propriété intellectuelle d'Andy SIWA. Tous droits réservés.