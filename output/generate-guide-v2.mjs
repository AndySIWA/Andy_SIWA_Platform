import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = join(import.meta.dirname, "pdfs");
mkdirSync(OUTPUT_DIR, { recursive: true });

const blocks = [
  { type: "spacer", height: 160 },
  { type: "heading", text: "Superpowers", level: 1 },
  { type: "heading", text: "\u00c9crire un SaaS avec une m\u00e9thodologie agentic", level: 2 },
  { type: "spacer", height: 30 },
  { type: "paragraph", text: "Guide premium pour concevoir, planifier et livrer des applications SaaS robustes gr\u00e2ce au plugin Superpowers et \u00e0 OpenCode." },
  { type: "spacer", height: 80 },
  { type: "paragraph", text: "Version 1.1 \u2014 Septembre 2026" },
  { type: "pageBreak" },

  { type: "toc" },
  { type: "pageBreak" },

  { type: "heading", text: "1. Introduction", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Superpowers est une m\u00e9thodologie compl\u00e8te de d\u00e9veloppement logiciel pour agents de code. Au lieu de sauter directement dans l\u2019\u00e9criture de code, l\u2019agent suit un processus disciplin\u00e9 : brainstorming, planification, d\u00e9veloppement pilot\u00e9 par les tests, et revue syst\u00e9matique." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Pourquoi Superpowers pour un SaaS ?", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "bullet", items: [
    "Sp\u00e9cification claire avant code \u2014 \u00e9vite les d\u00e9rives de scope",
    "D\u00e9veloppement pilot\u00e9 par les tests \u2014 chaque fonctionnalit\u00e9 est valid\u00e9e avant d\u2019exister",
    "Subagents isol\u00e9s \u2014 chaque t\u00e2che est ex\u00e9cut\u00e9e avec un contexte frais",
    "Revue syst\u00e9matique \u2014 deux niveaux de contr\u00f4le qualit\u00e9",
    "Git worktrees \u2014 d\u00e9veloppement propre sans polluer la branche principale"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Stack technique recommand\u00e9e", level: 2 },
  { type: "spacer", height: 6 },
  { type: "table", headers: ["Couche", "Technologie", "Justification"], rows: [
    ["Front-end", "Next.js + React", "SSR/SSG, App Router, RSC"],
    ["Back-end", "Next.js API Routes", "Un seul runtime, moins de d\u00e9ploiement"],
    ["Base de donn\u00e9es", "Supabase (Postgres)", "Auth + BDD + Realtime + Stockage"],
    ["Authentification", "Supabase Auth + NextAuth", "JWT + sessions, SSO possible"],
    ["Paiements", "Stripe", "Webhooks, abonnements, facturation"],
    ["D\u00e9ploiement", "Vercel / Netlify", "Preview deploys, CI/CD automatique"],
    ["Monitoring", "Sentry + PostHog", "Erreurs + analytiques"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "2. Le workflow en 6 \u00e9tapes", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Superpowers d\u00e9compose le d\u00e9veloppement d\u2019un SaaS en 6 \u00e9tapes distinctes. Chaque \u00e9tape a un objectif clair et un livrable attendu." },
  { type: "spacer", height: 10 },
  { type: "table", headers: ["\u00c9tape", "Objectif", "Livrable"], rows: [
    ["1. Brainstorming", "Affiner l\u2019id\u00e9e, explorer les alternatives", "Document de design valid\u00e9"],
    ["2. Git Worktrees", "Isoler l\u2019espace de travail, baseline propre", "Branche + worktree pr\u00eat"],
    ["3. Planification", "D\u00e9couper en t\u00e2ches de 2 \u00e0 5 min", "Plan d\u00e9taill\u00e9 par t\u00e2che"],
    ["4. D\u00e9veloppement", "Ex\u00e9cuter les t\u00e2ches avec revue", "Code fonctionnel + test\u00e9"],
    ["5. Tests", "RED-GREEN-REFACTOR sur chaque t\u00e2che", "Tests + code valid\u00e9s"],
    ["6. Livraison", "Merge, PR, v\u00e9rification finale", "Branche mergeable"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "3. \u00c9tape 1 \u2014 Brainstorming", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Le brainstorming est l\u2019\u00e9tape la plus importante. C\u2019est ici que l\u2019on transforme une id\u00e9e vague en sp\u00e9cification pr\u00e9cise." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Processus", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "numbered", items: [
    "L\u2019agent pose des questions pour comprendre le probl\u00e8me r\u00e9solu",
    "Exploration des alternatives techniques et fonctionnelles",
    "Pr\u00e9sentation du design par sections pour validation",
    "Sauvegarde du document de design comme r\u00e9f\u00e9rence"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Questions cl\u00e9s pour un SaaS", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "bullet", items: [
    "Quel probl\u00e8me r\u00e9sout-on ? Pour qui ?",
    "Quel est le parcours utilisateur principal ?",
    "Quelles fonctionnalit\u00e9s MVP (minimum viable product) ?",
    "Quel est le mode de mon\u00e9tisation ?",
    "Quelles int\u00e9grations tierces sont n\u00e9cessaires ?",
    "Quelles sont les contraintes de scalabilit\u00e9 et de performance ?"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Livrable", level: 2 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Un document de design contenant : vision du produit, personas utilisateurs, fonctionnalit\u00e9s MVP, architecture technique propos\u00e9e, et d\u00e9cisions cl\u00e9s." },
  { type: "pageBreak" },

  { type: "heading", text: "4. \u00c9tape 2 \u2014 Architecture et worktrees", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Apr\u00e8s validation du design, l\u2019agent cr\u00e9e un espace isol\u00e9 avec un git worktree. Cela permet de travailler proprement sans polluer la branche principale." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Actions concr\u00e8tes", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "numbered", items: [
    "Cr\u00e9ation d\u2019un git worktree sur une branche d\u00e9di\u00e9e",
    "Installation des d\u00e9pendances et configuration du projet",
    "V\u00e9rification que la baseline est propre (les tests existants passent)",
    "Validation de l\u2019architecture technique avec le client"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Structure de dossiers recommand\u00e9e", level: 2 },
  { type: "spacer", height: 6 },
  { type: "table", headers: ["Dossier", "Contenu"], rows: [
    ["src/app/", "Routes Next.js (App Router)"],
    ["src/components/", "Composants React r\u00e9utilisables"],
    ["src/lib/", "Utilitaires, helpers, types"],
    ["src/hooks/", "Hooks React personnalis\u00e9s"],
    ["src/services/", "Couche service (appels API, logique m\u00e9tier)"],
    ["src/__tests__/", "Tests unitaires et d\u2019int\u00e9gration"],
    ["prisma/ ou supabase/", "Sch\u00e9ma de base de donn\u00e9es"],
    ["public/", "Assets statiques"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "5. \u00c9tape 3 \u2014 Planification d\u00e9taill\u00e9e", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "L\u2019\u00e9tape de planification est la cl\u00e9 du succ\u00e8s. Chaque t\u00e2che doit \u00eatre suffisamment petite pour \u00eatre compl\u00e9t\u00e9e en 2 \u00e0 5 minutes, avec des instructions exactes." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Format d\u2019une t\u00e2che", level: 2 },
  { type: "spacer", height: 6 },
  { type: "table", headers: ["Champ", "Description"], rows: [
    ["Titre", "Description courte et actionnable"],
    ["Fichiers", "Liste exacte des fichiers \u00e0 cr\u00e9er ou modifier"],
    ["Code", "Code complet \u00e0 ins\u00e9rer"],
    ["V\u00e9rification", "Commande ou \u00e9tape pour valider"],
    ["Dur\u00e9e", "Estimation 2 \u00e0 5 minutes"]
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Exemple de plan pour un SaaS", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "numbered", items: [
    "Installation initiale : sch\u00e9ma de BDD + migrations",
    "Module d\u2019authentification : inscription, connexion, sessions",
    "Tableau de bord : disposition + composants de base",
    "Fonctionnalit\u00e9 principale : CRUD de l\u2019entit\u00e9 centrale",
    "Int\u00e9grations : webhooks, e-mails, paiements",
    "Tests : couverture minimale de 80 %",
    "D\u00e9ploiement : CI/CD + variables d\u2019environnement"
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "6. \u00c9tape 4 \u2014 D\u00e9veloppement pilot\u00e9 par les subagents", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Le d\u00e9veloppement est ex\u00e9cut\u00e9 par des subagents \u2014 des agents sp\u00e9cialis\u00e9s qui re\u00e7oivent une t\u00e2che pr\u00e9cise et la compl\u00e8tent avec un contexte frais." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Pourquoi des subagents ?", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "bullet", items: [
    "Contexte frais = moins d\u2019erreurs de raisonnement",
    "Isolation = une t\u00e2che qui \u00e9choue n\u2019impacte pas les autres",
    "Parall\u00e9lisation = plusieurs t\u00e2ches simultan\u00e9es possibles",
    "Revue en 2 \u00e9tapes = qualit\u00e9 garantie"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Processus de revue", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "numbered", items: [
    "Revue 1 \u2014 Conformit\u00e9 au sp\u00e9c : le code correspond-il \u00e0 la t\u00e2che demand\u00e9e ?",
    "Revue 2 \u2014 Qualit\u00e9 du code : style, performances, s\u00e9curit\u00e9, bonnes pratiques",
    "Si critique : blocage et retour \u00e0 la planification",
    "Si mineur : correction int\u00e9gr\u00e9e dans la t\u00e2che suivante"
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "7. \u00c9tape 5 \u2014 D\u00e9veloppement pilot\u00e9 par les tests", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Le d\u00e9veloppement pilot\u00e9 par les tests est non-n\u00e9gociable dans Superpowers. Chaque ligne de code fonctionnelle est pr\u00e9c\u00e9d\u00e9e par un test qui \u00e9choue." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Cycle RED-GREEN-REFACTOR", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "numbered", items: [
    "RED \u2014 \u00e9crire un test qui \u00e9choue (la fonctionnalit\u00e9 n\u2019existe pas encore)",
    "GREEN \u2014 \u00e9crire le code minimal pour que le test passe",
    "REFACTOR \u2014 am\u00e9liorer le code sans casser les tests",
    "COMMIT \u2014 valider le code avec un message clair"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Outils de test recommand\u00e9s", level: 2 },
  { type: "spacer", height: 6 },
  { type: "table", headers: ["Type", "Outil", "Usage"], rows: [
    ["Unitaire", "Vitest", "Fonctions, hooks, utilitaires"],
    ["Int\u00e9gration", "Vitest + MSW", "Routes API, services"],
    ["End-to-end", "Playwright", "Parcours utilisateur complets"],
    ["Visuel", "Chromatic / Percy", "R\u00e9gressions visuelles"]
  ]},
  { type: "pageBreak" },

  { type: "heading", text: "8. \u00c9tape 6 \u2014 Livraison", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "La livraison est l\u2019\u00e9tape finale o\u00f9 l\u2019agent v\u00e9rifie que tout est pr\u00eat pour la mise en production." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Checklist de livraison", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "bullet", items: [
    "Tous les tests passent (unitaires, int\u00e9gration, end-to-end)",
    "Pas de console.log ni de code de d\u00e9bogage r\u00e9siduel",
    "Variables d\u2019environnement document\u00e9es et s\u00e9curis\u00e9es",
    "Migration de base de donn\u00e9es test\u00e9e",
    "Performance acceptable (Lighthouse > 90)",
    "Accessibilit\u00e9 de base v\u00e9rifi\u00e9e",
    "Documentation technique \u00e0 jour",
    "Pull request cr\u00e9\u00e9e avec description claire"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "D\u00e9ploiement", level: 2 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Avec Vercel ou Netlify, le d\u00e9ploiement est automatique d\u00e8s la fusion sur la branche main. Les preview deploys permettent de valider chaque pull request avant fusion." },
  { type: "pageBreak" },

  { type: "heading", text: "9. Cas pratique \u2014 SaaS de gestion de t\u00e2ches", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Illustration du workflow complet avec un exemple concret : un SaaS de gestion de t\u00e2ches avec authentification, \u00e9quipes et abonnements." },
  { type: "spacer", height: 10 },
  { type: "heading", text: "Brainstorming", level: 2 },
  { type: "spacer", height: 6 },
  { type: "list", style: "bullet", items: [
    "Probl\u00e8me : les petites \u00e9quipes n\u2019ont pas d\u2019outil simple pour organiser leur travail",
    "Utilisateurs cibles : \u00e9quipes de 2 \u00e0 10 personnes, ind\u00e9pendants, startups",
    "MVP : authentification, CRUD de t\u00e2ches, invitation d\u2019\u00e9quipe, tableau de bord",
    "Mon\u00e9tisation : plan gratuit (3 projets) + pro (8 \u20ac/mois)"
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "Plan d\u00e9taill\u00e9 (extrait)", level: 2 },
  { type: "spacer", height: 6 },
  { type: "table", headers: ["#", "T\u00e2che", "Fichiers", "Dur\u00e9e"], rows: [
    ["1", "Sch\u00e9ma BDD + migrations", "supabase/migrations/", "3 min"],
    ["2", "Inscription / connexion", "src/app/auth/", "5 min"],
    ["3", "Disposition du tableau de bord", "src/app/dashboard/", "3 min"],
    ["4", "CRUD de t\u00e2ches", "src/app/tasks/", "5 min"],
    ["5", "Invitation d\u2019\u00e9quipe", "src/app/teams/", "4 min"],
    ["6", "Abonnements Stripe", "src/app/billing/", "5 min"],
    ["7", "Tests end-to-end", "src/__tests__/e2e/", "5 min"]
  ]},
  { type: "spacer", height: 10 },
  { type: "heading", text: "R\u00e9sultat", level: 2 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Un SaaS fonctionnel, test\u00e9, avec authentification, abonnements, et d\u00e9ploiement CI/CD \u2014 construit en quelques heures gr\u00e2ce \u00e0 la discipline du workflow Superpowers." },
  { type: "pageBreak" },

  { type: "heading", text: "10. Checklist finale", level: 1 },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Utilisez cette checklist pour chaque nouveau projet SaaS." },
  { type: "spacer", height: 10 },
  { type: "table", headers: ["\u00c9tape", "Crit\u00e8re", "Fait"], rows: [
    ["Brainstorming", "Document de design valid\u00e9", "[ ]"],
    ["Brainstorming", "MVP d\u00e9fini et scope fix\u00e9", "[ ]"],
    ["Worktree", "Branche isol\u00e9e cr\u00e9\u00e9e", "[ ]"],
    ["Worktree", "Baseline tests OK", "[ ]"],
    ["Planification", "T\u00e2ches de 2\u20135 min \u00e9crites", "[ ]"],
    ["Planification", "Fichiers exacts identifi\u00e9s", "[ ]"],
    ["D\u00e9veloppement", "Chaque t\u00e2che revue (2 niveaux)", "[ ]"],
    ["D\u00e9veloppement", "Subagents avec contexte frais", "[ ]"],
    ["Tests", "Tests RED-GREEN-REFACTOR", "[ ]"],
    ["Tests", "Couverture minimale 80 %", "[ ]"],
    ["Livraison", "Tous les tests passent", "[ ]"],
    ["Livraison", "Pull request cr\u00e9\u00e9e et d\u00e9crite", "[ ]"],
    ["Livraison", "D\u00e9ploiement v\u00e9rifi\u00e9", "[ ]"]
  ]},
  { type: "spacer", height: 20 },
  { type: "paragraph", text: "Superpowers transforme le d\u00e9veloppement SaaS d\u2019un processus ad-hoc en une discipline d\u2019ing\u00e9nierie. Chaque \u00e9tape a un objectif clair, chaque t\u00e2che est v\u00e9rifiable, chaque code est test\u00e9. Le r\u00e9sultat : des applications plus robustes, livr\u00e9es plus vite, avec moins de bugs." }
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
      headerTemplate: { right: "Superpowers SaaS Workflow \u2014 page {page}/{pages}" },
      footerText: "Guide premium v1.1 \u2014 Confidentiel",
      outline: "auto",
      outputMode: "file",
      outputPath: "superpowers-saas-workflow-v2.pdf"
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
      const outPath = join(OUTPUT_DIR, "superpowers-saas-workflow-v2.pdf");
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