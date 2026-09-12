import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = join(import.meta.dirname, "pdfs");
mkdirSync(OUTPUT_DIR, { recursive: true });

const blocks = [
  { type: "spacer", height: 120 },
  { type: "heading", text: "Superpowers", level: 1 },
  { type: "heading", text: "Workflow de Creation de SaaS", level: 2 },
  { type: "spacer", height: 40 },
  { type: "paragraph", text: "Guide premium pour construire des applications SaaS avec la methodologie agentic Superpowers + OpenCode." },
  { type: "spacer", height: 60 },
  { type: "paragraph", text: "Version 1.0 -- 2026" },
  { type: "pageBreak" },

  { type: "toc" },
  { type: "pageBreak" },

  { type: "heading", text: "1. Introduction", level: 1 },
  { type: "paragraph", text: "Superpowers est une methodologie complete de developpement logiciel pour agents de code. Au lieu de sauter directement dans l'ecriture de code, l'agent suit un processus discipline : brainstorming, planification, TDD, et review systematique." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Pourquoi Superpowers pour un SaaS ?", level: 2 },
  { type: "list", style: "bullet", items: [
    "Specification claire avant code -- evite les derives de scope",
    "TDD oblige -- chaque fonctionnalite est testee avant d'exister",
    "Subagents isoles -- chaque tache est executee avec un contexte frais",
    "Review systematique -- deux niveaux de controle qualite",
    "Git worktrees -- development propre sans polluer la branche principale"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Stack technique recommandee", level: 2 },
  { type: "table", headers: ["Couche", "Technologie", "Justification"], rows: [
    ["Frontend", "Next.js + React", "SSR/SSG, App Router, RSC"],
    ["Backend", "Next.js API Routes", "Un seul runtime, moins de deploiement"],
    ["Base de donnees", "Supabase (Postgres)", "Auth + BDD + Realtime + Storage"],
    ["Auth", "Supabase Auth + NextAuth", "JWT + sessions, SSO possible"],
    ["Paiements", "Stripe", "Webhooks, subscriptions, invoicing"],
    ["Deploiement", "Vercel / Netlify", "Preview deploys, CI/CD automatique"],
    ["Monitoring", "Sentry + PostHog", "Errors + analytics"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "2. Le Workflow en 6 Etapes", level: 1 },
  { type: "paragraph", text: "Superpowers decompose le developpement d'un SaaS en 6 etapes distinctes. Chaque etape a un objectif clair et un livrable attendu." },
  { type: "spacer", height: 10 },
  { type: "table", headers: ["Etape", "Objectif", "Livrable"], rows: [
    ["1. Brainstorming", "Affiner l'idee, explorer les alternatives", "Doc de design valide"],
    ["2. Git Worktrees", "Isoler le workspace, baseline propre", "Branche + worktree pret"],
    ["3. Writing Plans", "Decouper en taches de 2-5 min", "Plan detaille par tache"],
    ["4. Subagent Dev", "Executer les taches avec review", "Code fonctionnel + teste"],
    ["5. TDD", "RED-GREEN-REFACTOR sur chaque tache", "Tests + code valides"],
    ["6. Livraison", "Merge, PR, verification finale", "Branche mergeable"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "3. Etape 1 : Brainstorming", level: 1 },
  { type: "paragraph", text: "Le brainstorming est l'etape la plus importante. C'est ici que l'on transforme une idee vague en specification precise." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Processus", level: 2 },
  { type: "list", style: "numbered", items: [
    "L'agent pose des questions pour comprendre le probleme resolu",
    "Exploration des alternatives techniques et fonctionnelles",
    "Presentation du design par sections pour validation",
    "Sauvegarde du doc de design comme reference"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Questions cles pour un SaaS", level: 2 },
  { type: "list", style: "bullet", items: [
    "Quel probleme resout-on ? Pour qui ?",
    "Quel est le parcours utilisateur principal (user journey) ?",
    "Quelles fonctionnalites MVP (minimum viable product) ?",
    "Quel est le mode de monetisation ?",
    "Quelles integrations tierces sont necessaires ?",
    "Quelles sont les contraintes de scale et de perf ?"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Livrable", level: 2 },
  { type: "paragraph", text: "Un document de design contenant : vision du produit, users personas, fonctionnalites MVP, architecture technique proposee, et decisions cles." },
  { type: "pageBreak" },

  { type: "heading", text: "4. Etape 2 : Architecture et Worktrees", level: 1 },
  { type: "paragraph", text: "Apres validation du design, l'agent cree un workspace isole avec un git worktree. Cela permet de travailler proprement sans polluer la branche principale." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Actions concretes", level: 2 },
  { type: "list", style: "numbered", items: [
    "Creation d'un git worktree sur une branche dediee",
    "Installation des dependances et configuration du projet",
    "Verification que la baseline est propre (tests existants passent)",
    "Validation de l'architecture technique avec le client"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Structure de dossiers recommandee", level: 2 },
  { type: "table", headers: ["Dossier", "Contenu"], rows: [
    ["src/app/", "Routes Next.js (App Router)"],
    ["src/components/", "Composants React reutilisables"],
    ["src/lib/", "Utilitaires, helpers, types"],
    ["src/hooks/", "Custom React hooks"],
    ["src/services/", "Couche service (API calls, business logic)"],
    ["src/__tests__/", "Tests unitaires et d'integration"],
    ["prisma/ ou supabase/", "Schema de base de donnees"],
    ["public/", "Assets statiques"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "5. Etape 3 : Writing Plans", level: 1 },
  { type: "paragraph", text: "L'etape de planification est la cle du succes. Chaque tache doit etre suffisamment petite pour etre completee en 2 a 5 minutes, avec des instructions exactes." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Format d'une tache", level: 2 },
  { type: "table", headers: ["Champ", "Description"], rows: [
    ["Titre", "Description courte et actionnable"],
    ["Fichiers", "Liste exacte des fichiers a creer/modifier"],
    ["Code", "Code complet a inserer"],
    ["Verification", "Commande ou etape pour valider"],
    ["Duree", "Estimation 2-5 minutes"]
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Exemple de plan pour un SaaS", level: 2 },
  { type: "list", style: "numbered", items: [
    "Setup initial : schema DB + migrations",
    "Auth module : inscription, connexion, sessions",
    "Dashboard : layout + composants de base",
    "Feature principale : CRUD de l'entite centrale",
    "Integrations : webhooks, emails, paiements",
    "Tests : coverage minimum 80%",
    "Deploiement : CI/CD + variables d'env"
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "6. Etape 4 : Subagent-Driven Development", level: 1 },
  { type: "paragraph", text: "Le developpement est execute par des subagents -- des agents specialises qui recoivent une tache precise et la complete avec un contexte frais." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Pourquoi des subagents ?", level: 2 },
  { type: "list", style: "bullet", items: [
    "Contexte frais = moins d'erreurs de raisonnement",
    "Isolation = une tache echoue n'impacte pas les autres",
    "Parallelisation = plusieurs taches simultanees possibles",
    "Review en 2 etapes = qualite garantie"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Processus de review", level: 2 },
  { type: "list", style: "numbered", items: [
    "Review 1 : Conformite au spec -- le code correspond-il a la tache demandee ?",
    "Review 2 : Qualite du code -- style, performances, securite, best practices",
    "Si critique : blocage et retour a la planification",
    "Si mineur : correction integree dans la tache suivante"
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "7. Etape 5 : Test-Driven Development", level: 1 },
  { type: "paragraph", text: "Le TDD est non-negociable dans Superpowers. Chaque ligne de code fonctionnelle est precedee par un test qui echoue." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Cycle RED-GREEN-REFACTOR", level: 2 },
  { type: "list", style: "numbered", items: [
    "RED : Ecrire un test qui echoue (la fonctionnalite n'existe pas encore)",
    "GREEN : Ecrire le code minimal pour que le test passe",
    "REFACTOR : Ameliorer le code sans casser les tests",
    "COMMIT : Valider le code avec un message clair"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Outils de test recommandes", level: 2 },
  { type: "table", headers: ["Type", "Outil", "Usage"], rows: [
    ["Unitaire", "Vitest", "Fonctions, hooks, utilitaires"],
    ["Integration", "Vitest + MSW", "API routes, services"],
    ["E2E", "Playwright", "Parcours utilisateur complets"],
    ["Visual", "Chromatic / Percy", "Regressions visuelles"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "8. Etape 6 : Livraison", level: 1 },
  { type: "paragraph", text: "La livraison est l'etape finale ou l'agent verifie que tout est pret pour la mise en production." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Checklist de livraison", level: 2 },
  { type: "list", style: "bullet", items: [
    "Tous les tests passent (unitaires, integration, E2E)",
    "Pas de console.log ou code de debug residuel",
    "Variables d'env documentees et securisees",
    "Migration de base de donnees testee",
    "Performance acceptable (Lighthouse > 90)",
    "Accessibilite de base verifiee",
    "Documentation technique a jour",
    "PR creee avec description claire"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Deploiement", level: 2 },
  { type: "paragraph", text: "Avec Vercel ou Netlify, le deploiement est automatique des la merge sur main. Les preview deploys permettent de valider chaque PR avant merge." },
  { type: "pageBreak" },

  { type: "heading", text: "9. Cas Pratique : SaaS de Gestion de Taches", level: 1 },
  { type: "paragraph", text: "Illustration du workflow complet avec un exemple concret : un SaaS de gestion de taches type Todo App avec auth, teams, et subscriptions." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Brainstorming", level: 2 },
  { type: "list", style: "bullet", items: [
    "Probleme : les equipes petites n'ont pas d'outil simple pour organiser leur travail",
    "Users : teams de 2-10 personnes, freelances, startups",
    "MVP : auth, CRUD taches, invitation equipe, dashboard",
    "Monetisation : free tier (3 projets) + pro ($8/mois)"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Plan (extrait)", level: 2 },
  { type: "table", headers: ["#", "Tache", "Fichiers", "Duree"], rows: [
    ["1", "Schema DB + migrations", "supabase/migrations/", "3 min"],
    ["2", "Auth inscription/connexion", "src/app/auth/", "5 min"],
    ["3", "Layout dashboard", "src/app/dashboard/", "3 min"],
    ["4", "CRUD taches", "src/app/tasks/", "5 min"],
    ["5", "Invitation equipe", "src/app/teams/", "4 min"],
    ["6", "Stripe subscriptions", "src/app/billing/", "5 min"],
    ["7", "Tests E2E", "src/__tests__/e2e/", "5 min"]
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Resultat", level: 2 },
  { type: "paragraph", text: "Un SaaS fonctionnel, teste, avec auth, subscriptions, et deploiement CI/CD -- construit en quelques heures grace a la discipline du workflow Superpowers." },
  { type: "pageBreak" },

  { type: "heading", text: "10. Checklist Finale", level: 1 },
  { type: "paragraph", text: "Utilisez cette checklist pour chaque nouveau projet SaaS." },
  { type: "spacer", height: 10 },
  { type: "table", headers: ["Etape", "Critere", "Fait"], rows: [
    ["Brainstorming", "Doc de design valide", "[ ]"],
    ["Brainstorming", "MVP defini et scope fixe", "[ ]"],
    ["Worktree", "Branche isolee creee", "[ ]"],
    ["Worktree", "Baseline tests OK", "[ ]"],
    ["Plan", "Taches de 2-5 min ecrites", "[ ]"],
    ["Plan", "Fichiers exacts identifies", "[ ]"],
    ["Dev", "Chaque tache reviewee (2 niveaux)", "[ ]"],
    ["Dev", "Subagents avec contexte frais", "[ ]"],
    ["TDD", "Tests RED-GREEN-REFACTOR", "[ ]"],
    ["TDD", "Coverage minimum 80%", "[ ]"],
    ["Livraison", "Tous les tests passent", "[ ]"],
    ["Livraison", "PR creee et decrite", "[ ]"],
    ["Livraison", "Deploiement verify", "[ ]"]
  ]},
  { type: "spacer", height: 20 },
  { type: "paragraph", text: "Superpowers transforme le developpement SaaS d'un processus ad-hoc en une engineering discipline. Chaque etape a un objectif clair, chaque tache est verifiable, chaque code est teste. Le resultat : des applications plus robustes, livrees plus vite, avec moins de bugs." }
];

const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "generate_basic_pdf",
    arguments: {
      title: "Superpowers SaaS Workflow",
      blocks,
      pageSize: "A4",
      margins: { top: 72, bottom: 72, left: 60, right: 60 },
      embedFonts: true,
      headerTemplate: { right: "Superpowers SaaS Workflow -- page {page}/{pages}" },
      footerText: "Confidential -- Premium Guide v1.0",
      outline: "auto",
      outputMode: "file",
      outputPath: "superpowers-saas-workflow.pdf"
    }
  }
};

const child = spawn("npx", ["-y", "pdfnative-mcp"], {
  stdio: ["pipe", "pipe", "pipe"],
  env: { ...process.env, PDFNATIVE_MCP_OUTPUT_DIR: OUTPUT_DIR },
  shell: true
});

let stdout = "";
let stderr = "";

child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

child.stdin.write(JSON.stringify(request) + "\n");
child.stdin.end();

child.on("close", (code) => {
  if (stderr) console.error("stderr:", stderr.slice(0, 500));
  try {
    const resp = JSON.parse(stdout);
    if (resp.result?.isError) {
      console.error("MCP error:", JSON.stringify(resp.result.content));
    } else {
      const outPath = join(OUTPUT_DIR, "superpowers-saas-workflow.pdf");
      console.log("PDF generated:", outPath);
      const structured = resp.result?.structuredContent;
      if (structured) console.log("Size:", structured.sizeBytes, "bytes");
    }
  } catch (e) {
    console.error("Parse error:", e.message);
    console.error("Raw stdout:", stdout.slice(0, 1000));
  }
});

child.on("error", (err) => {
  console.error("Spawn error:", err.message);
});
