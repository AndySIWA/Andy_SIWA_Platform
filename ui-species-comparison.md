# UI Specifications Comparison: Pages Realisations, Blog, Marketplace & Idées & Projets

## Overview
All four pages are part of the **Andy SIWA Portfolio** built with **Next.js 15 (app router)**, **React 19**, **Sanity CMS**, **Tailwind CSS**, and **framer-motion**. They share a consistent dark-theme cyber aesthetic with cyan/purple/emerald accents.

---

## 1. Realisations Page (`src/app/realisations/page.tsx`)

| Spec | Details |
|---|---|
| **Header** | Badge: `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 text-xs font-mono` with `FolderGit2` icon + "Ingénierie & Développement" text. Title: `font-display text-4xl sm:text-5xl font-extrabold text-slate-900` "Réalisations & Projets". Subtitle paragraph with slate-600. |
| **Grid** | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5` (1→2→3→4 columns). |
| **Card** | `blog-card rounded-2xl overflow-hidden flex flex-col justify-between group`. Image: `relative h-48 w-full bg-slate-100` with `object-cover group-hover:scale-105 transition-transform duration-300`. Tech stack: `flex flex-wrap gap-1.5 pt-2 mt-auto` with `text-xs px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600` pills. |
| **Card Content** | Title: `font-display font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors`. Summary: `text-sm text-slate-600 leading-relaxed`. |
| **CTA Area** | Bottom section: `p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4`. Actions: "Fiche Détaillée" link + demo/github icons (external link + github). |
| **Background** | Parent `div className="blog-light"` |
| **Color Accent** | Cyan primary (badge, links, icons). Slate background (slate-100/200/50/900). White overlay on image hover. |
| **Meta per card** | Category badge at top-left (uppercase, rounded pill, text-xs). |

---

## 2. Blog Page (`src/app/blog/page.tsx`)

| Spec | Details |
|---|---|
| **Header** | Two hero badges: <br>`blog-badge` (inline-flex gap-3) with `BookOpen` + "Blog & Publications" <br>Second badge: `rgba(99,102,241,0.08)` bg, `6366f1` text/border, `Sparkles` + "REX & Guides". Title: `blog-title text-4xl sm:text-5xl md:text-6xl` with `blog-gradient-text` span "Techniques". |
| **Grid** | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5` (1→2→3→4 columns). |
| **Card** | `blog-card flex flex-col group`. Image: `blog-card-img` with `fill`, `object-cover`, `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`. |
| **Card Content** | Category badge: `blog-badge text-[10px] px-2 py-0.5`. Meta row: `text-[11px] text-slate-400 mb-2` with Calendar+Date (fr-FR) + separator line + Clock+ReadTime. Title: `font-display font-bold text-[15px] text-slate-800 group-hover:text-cyan-600 transition-colors leading-snug mb-2 line-clamp-2`. Excerpt: `text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3`. Tags: `flex flex-wrap gap-1 mt-auto` with `blog-tag text-[10px] px-1.5 py-0 #tag`. |
| **CTA/Empty** | Empty state: centered `BookOpen` + "Aucun article pour le moment". |
| **Background** | `MeshBackground` component (floating nodes canvas). Decorative dots/lines in hero area with variable positioning. |
| **Color Accent** | Purple accents (`6366f1` = indigo-600). Badges have subtle purple tint. Blog title uses gradient text. Meta text is slate-400/500. |
| **Read time** | Displayed as `{post.readTime}` (e.g., "4 min read"). |

---

## 3. Marketplace Page (`src/app/marketplace/page.tsx`)

| Spec | Details |
|---|---|
| **Header** | Badge: `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 text-xs font-mono` with `ShoppingBag` + "Produits Digitaux & Outillage Électrique". Title: `font-display text-4xl sm:text-5xl font-extrabold text-slate-900` "Marketplace d'Ingénierie". Subtitle paragraph with cyan-600 "Chariow" bold. |
| **Trust Badges Banner** | `p-6 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600`. Three columns: <br>1. **Instant Download**: Zap icon + cyan bg, "Téléchargement Instantané" + "Accès immédiat après paiement Chariow". <br>2. **Conformes NFC**: ShieldCheck + emerald bg, "Contenus Conformes NFC" + "Élabérés par un ingénieur qualifié". <br>3. **Paiement Sécurisé Chariow**: ExternalLink + purple bg, "Paiement Sécurisé Chariow" + "Cartes bancaires, Mobile Money". |
| **Grid** | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5` (1→2→3→4 columns). |
| **Card** | `blog-card rounded-2xl overflow-hidden flex flex-col justify-between group`. Image: `relative h-48 w-full bg-slate-100` with `object-cover group-hover:scale-105 transition-transform duration-300`. **Price badge**: `absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-emerald-500 text-white font-display font-extrabold text-sm shadow-lg` — displays `{product.price}`. |
| **Card Content** | Title: `font-display font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors`. Description: `text-sm text-slate-600 leading-relaxed`. Features: `space-y-2 pt-2 border-t border-slate-100 mt-auto` with `text-xs font-mono text-cyan-600 uppercase tracking-wider "Inclus :"` + checkmark list (`CheckCircle` + feature text). |
| **CTA** | Bottom: `p-5 pt-0` with `blog-read-more w-full text-center flex items-center justify-center gap-2 text-xs uppercase tracking-wider` button "Obtenir via Chariow" + external link icon. Links to `product.chariowLink`. |
| **Background** | Parent `div className="blog-light"` |
| **Color Accent** | Cyan (badge, link text), Emerald (price badge, features checkmarks), Purple (trust badge 3), White/Slate for overlays. |

---

## 4. Idées & Projets Page (`src/app/idees/page.tsx`)

| Spec | Details |
|---|---|
| **Header** | Badge: `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono` with `Lightbulb` + "Laboratoire & Incubateur". Title: `font-display text-4xl sm:text-5xl font-extrabold text-white` "Idées & Projets à Venir". Subtitle: `text-gray-300 text-base leading-relaxed` with transparent collaboration invitation. |
| **Grid** | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` (1→2→3 columns — different breakpoint pattern). |
| **Card** | `cyber-card rounded-2xl p-6 flex flex-col justify-between space-y-6`. Status badge: dynamic color-coded: <br>- `prototype`: `bg-cyan/10 text-cyan border-cyan/40` (cyan) <br>- `study`: `bg-purple/10 text-purple border-purple/40` (purple) <br>- `soon`: `bg-emerald-500/10 text-emerald-400 border-emerald-500/40` (emerald) <br>- `concept`: `bg-amber-400/10 text-amber-400 border-amber-400/40` (amber). Badge format: `px-2.5 py-1 rounded-full border {color}`. |
| **Card Content** | Top row: badge + optional target date with `Clock` icon + cyan text. Title: `font-display font-bold text-xl text-white`. Excerpt: `text-sm text-gray-400 leading-relaxed`. Tags: `flex flex-wrap gap-1.5 pt-2` with `text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300` pills. |
| **CTA** | Bottom section: `pt-4 border-t border-white/10 flex items-center justify-between`. Left: `text-xs text-gray-500 font-mono` showing "ID: {_id}". Right: "Proposer une idée / Partenariat" → `https://wa.me/237691234567` (WhatsApp link), `text-xs font-bold text-cyan hover:underline flex items-center gap-1`. |
| **Background** | No mesh/particle background. Clean section with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12`. |
| **Color Accent** | Amber primary for badge/links. Cyan for WhatsApp icon/text. White/gray tones (gray-50/10/30/40/50). No emerald/purple accents used. |
| **Status System** | 4 status types with distinct color coding, each has custom label with emoji prefix. |

---

## Shared UI Patterns (Cross-Page)

| Pattern | Usage Across Pages |
|---|---|
| **CyberCard** | Realisations, Marketplace, Idées & Projets — dark rounded card with subtle border. |
| **Responsive Grid** | All pages: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` (Marketplace/Realisations/Blog), Idées uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. |
| **Badge Component** | Inline-flex pill: `px-3 py-1 rounded-full bg-{color}-50 border border-{color}-200 text-{color}-600 text-xs font-mono`. Used in Realisations header, Marketplace header, Blog hero, Idées status. |
| **Button Style** | `blog-read-more`: `py-2 px-4 flex items-center gap-2` (or `w-full text-center`) with icons. Variants: primary (cyan gradient implied) + secondary. |
| **Font System** | Orbitron for display heads (`font-display`), Rajdhani implied, Inter for body. Consistent across all pages. |
| **Image Pattern** | `next/image` with `fill`, `object-cover`, `group-hover:scale-105 transition-transform duration-300` on card images (Realisations, Marketplace, Idées). Blog uses `sizes` prop for responsive img widths. |
| **Footer** | Two themes: light (blog pages), dark (others). Sanity + Netlify credits, social links. |
| **Data Source** | All fetch from Sanity: `getProjects`, `getPosts`, `getProducts`, `getIdeas`. Mock data fallbacks in `src/sanity/lib/data.ts`. |
| **Link Pattern** | All external links use `target="_blank" rel="noopener noreferrer"`. Internal links use Next.js `<Link>`. |

---

## Key Differences Summary

| Aspect | Realisations | Blog | Marketplace | Idées & Projets |
|---|---|---|---|---|
| **Grid breakpoints** | 1→2→3→4 (xl) | 1→2→3→4 (xl) | 1→2→3→4 (xl) | 1→2→3 (md/lg) — narrower max |
| **Hero badges** | 1 badge (cyan) | 2 badges (book + sparkles) | 1 badge (cyan) | 1 badge (amber) |
| **Card image hover** | `scale-105` zoom | No hover (static) | `scale-105` zoom | No hover (static) — card is `cyber-card` |
| **Price display** | N/A | N/A | `absolute bottom-3 right-3` emerald badge | N/A |
| **Meta under image** | Category pill (top-left) | Date + read-time row + category | Category pill + price badge (bottom-right) | Status badge + target date (top) |
| **CTA button** | "Fiche Détaillée" link + demo/github | Post link only | "Obtenir via Chariow" button | "Proposer une idée / Partenariat" → WhatsApp |
| **Background decoration** | `blog-light` class + subtle | `MeshBackground` + decorative dots/lines | `blog-light` class only | Plain section, no canvas |
| **Status badges** | Category only (tech stack pills) | Category + date/read-time | Category + price | 4-color status system (prototype/study/soon/concept) |
| **Text color scheme** | Slate-900 on white/slate backgrounds | Slate-800/600 with purple accent | Slate-900 on white with cyan/emerald/purple accents | White (`text-white`) on amber/dark backgrounds |

--- 

**Generated from source files analysis.** All pages maintain consistent cyber-dark aesthetic but adapt UI patterns to their content type (projects, articles, products, ideas).