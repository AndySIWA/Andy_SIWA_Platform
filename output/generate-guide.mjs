import { spawn } from "node:child_process";
import { mkdirSync, unlinkSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = join(import.meta.dirname, "pdfs");
mkdirSync(OUTPUT_DIR, { recursive: true });

const OUTPUT_FILENAME = "superpowers-saas-guide-premium.pdf";
const targetPdf = join(OUTPUT_DIR, OUTPUT_FILENAME);
if (existsSync(targetPdf)) {
  try { unlinkSync(targetPdf); } catch (e) {}
}

const blocks = [
  // --- PAGE 1 : COUVERTURE ---
  { type: "spacer", height: 80 },
  { type: "heading", text: "Superpowers", level: 1 },
  { type: "heading", text: "Guide Pratique : Création de SaaS", level: 2 },
  { type: "spacer", height: 15 },
  { type: "paragraph", text: "Manuel opérationnel pas-à-pas pour concevoir, implémenter et livrer un produit SaaS complet avec la méthodologie Superpowers et OpenCode." },
  { type: "spacer", height: 25 },
  { type: "list", style: "bullet", items: [
    "Version 3.0 — Septembre 2026",
    "Structure : Actions Utilisateur / Comportement Agent / Livrables",
    "Format A4 — 12 pages"
  ]},
  { type: "pageBreak" },

  // --- PAGE 2 : SOMMAIRE ---
  { type: "heading", text: "Sommaire", level: 1 },
  { type: "spacer", height: 10 },
  { type: "toc" },
  { type: "pageBreak" },

  // --- 1. INTRODUCTION ---
  { type: "heading", text: "1. Introduction et Mode d'Emploi", level: 1 },
  { type: "paragraph", text: "Superpowers est un plugin pour OpenCode qui transforme un générateur de code en un véritable ingénieur logiciel discipliné. Le plugin applique la « règle des 1 % » : dès qu'une tâche nécessite une conception, une analyse ou un test, le skill approprié est activé automatiquement." },
  { type: "spacer", height: 6 },
  { type: "heading", text: "Le triptyque opérationnel", level: 2 },
  { type: "list", style: "bullet", items: [
    "Ce que vous devez faire : prompts, décisions et validations humaines",
    "Ce qui se passe : exécution interne, déclenchement des skills, contraintes",
    "Ce qui est produit : code, spécifications, tests, branches Git"
  ]},
  { type: "spacer", height: 8 },
  { type: "heading", text: "Pile technique recommandée", level: 2 },
  { type: "table", headers: ["Module", "Technologie", "Raison"], rows: [
    ["Frontend", "Next.js 15 App Router", "SSR/SSG, RSC, performance SEO"],
    ["API", "Route Handlers", "TypeScript de bout en bout"],
    ["Base de données", "Supabase PostgreSQL", "RLS, temps réel, stockage"],
    ["Authentification", "Supabase Auth", "Magic Link, OAuth, JWT"],
    ["Paiements", "Stripe", "Abonnements, webhooks"],
    ["Déploiement", "Vercel / Netlify", "Preview deploys, CI/CD"],
    ["Tests", "Vitest + Playwright", "Unitaires, E2E, visuels"]
  ], wrap: "auto", clipCells: true },
  { type: "pageBreak" },

  // --- 2. LE CYCLE EN 6 ÉTAPES ---
  { type: "heading", text: "2. Le Cycle en 6 Étapes", level: 1 },
  { type: "paragraph", text: "Chaque étape suit un contrat strict. L'agent ne passe jamais à l'étape suivante sans votre validation formelle." },
  { type: "spacer", height: 8 },
  { type: "table", headers: ["Étape", "Skill", "Votre rôle", "Résultat"], rows: [
    ["1. Cadrage", "brainstorming", "Décrivez votre idée, répondez aux questions", "Spécification technique validée"],
    ["2. Isolation", "worktrees", "Confirmez le lancement", "Branche Git isolée"],
    ["3. Plan", "writing-plans", "Validez le découpage", "Plan en micro-tâches"],
    ["4. Exécution", "subagent-dev", "Observez ou intervenez", "Code implémenté"],
    ["5. Tests", "test-driven-dev", "Vérifiez les preuves", "Suite RED-GREEN-REFACTOR"],
    ["6. Livraison", "finishing-branch", "Choisissez l'option", "PR prête à merger"]
  ], wrap: "auto", clipCells: true },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Ce processus vous permet de déléguer la construction de fonctionnalités complexes tout en conservant une traçabilité totale sur chaque ligne de code." },
  { type: "pageBreak" },

  // --- 3. ÉTAPE 1 : CADRAGE ---
  { type: "heading", text: "3. Étape 1 : Cadrage et Spécification", level: 1 },
  { type: "paragraph", text: "Le skill brainstorming s'active dès que vous formulez une intention de création. Il empêche l'agent d'écrire du code prématurément." },
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce que vous devez faire", level: 2 },
  { type: "list", style: "bullet", items: [
    "Formulez votre idée : par exemple « Je veux un SaaS de gestion de tâches pour petites équipes »",
    "Répondez aux questions socratiques (modèles de données, règles d'accès, MVP)",
    "Validez les sections de conception présentées une à une"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui se passe", level: 2 },
  { type: "list", style: "bullet", items: [
    "L'agent explore les cas limites : permissions, multi-tenant, webhooks",
    "Il évalue 2 à 3 approches architecturales et recommande la plus adaptée",
    "Il découpe la spécification en blocs courts pour éviter l'effet tunnel"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui est produit", level: 2 },
  { type: "list", style: "bullet", items: [
    "docs/spec-saas.md : personas, parcours utilisateurs, schéma DB, API endpoints",
    "docs/architecture.md : flux de données, rôles RLS, intégrations tierces"
  ]},
  { type: "pageBreak" },

  // --- 4. ÉTAPE 2 : ISOLATION ---
  { type: "heading", text: "4. Étape 2 : Isolation et Worktrees", level: 1 },
  { type: "paragraph", text: "Le skill using-git-worktrees garantit un environnement de travail isolé de la branche de production." },
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce que vous devez faire", level: 2 },
  { type: "list", style: "bullet", items: [
    "Donnez votre feu vert : tapez « Valider et démarrer »",
    "Vérifiez les variables d'environnement si nécessaire"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui se passe", level: 2 },
  { type: "list", style: "bullet", items: [
    "L'agent exécute git worktree add pour un répertoire dédié",
    "Il installe les dépendances et configure le projet",
    "Il lance les tests existants pour s'assurer d'une base saine"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui est produit", level: 2 },
  { type: "list", style: "bullet", items: [
    "Branche feature/nom-du-projet avec code source isolé",
    "Rapport de base confirmant 100 % de tests au vert"
  ]},
  { type: "pageBreak" },

  // --- 5. ÉTAPE 3 : PLANIFICATION ---
  { type: "heading", text: "5. Étape 3 : Planification Granulaire", level: 1 },
  { type: "paragraph", text: "Le skill writing-plans convertit la spécification en un plan d'action composé de tâches atomiques de 2 à 5 minutes." },
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce que vous devez faire", level: 2 },
  { type: "list", style: "bullet", items: [
    "Examinez la liste des tâches proposées par l'agent",
    "Vérifiez que chaque tâche est bien dimensionnée (2 à 5 min)",
    "Confirmez le plan en répondant « Go pour l'exécution »"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui se passe", level: 2 },
  { type: "list", style: "bullet", items: [
    "L'agent rédige les chemins d'accès absolus des fichiers à créer ou modifier",
    "Il inclut le code complet exact à insérer (pas de pseudo-code)",
    "Il définit la commande précise de test associée à chaque tâche"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui est produit", level: 2 },
  { type: "list", style: "bullet", items: [
    "docs/plans/nom-du-plan.md : feuille de route séquentielle",
    "Liste de contrôle dynamique dans todowrite"
  ]},
  { type: "pageBreak" },

  // --- 6. ÉTAPE 4 : EXÉCUTION ---
  { type: "heading", text: "6. Étape 4 : Exécution par Sous-Agents", level: 1 },
  { type: "paragraph", text: "Le skill subagent-driven-development distribue chaque tâche à un sous-agent spécialisé avec un contexte vierge." },
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce que vous devez faire", level: 2 },
  { type: "list", style: "bullet", items: [
    "Laissez l'agent superviseur orchestrer les itérations",
    "Intervenez uniquement si un arbitrage métier est nécessaire"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui se passe", level: 2 },
  { type: "list", style: "bullet", items: [
    "Chaque sous-agent démarre avec un contexte vierge",
    "Le sous-agent lit la tâche, applique le code et teste",
    "L'agent superviseur fait une double revue : conformité puis qualité",
    "En cas d'échec, le sous-agent corrige avant de clore"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui est produit", level: 2 },
  { type: "list", style: "bullet", items: [
    "Fichiers source modifiés et validés par revue Niveau 1",
    "Code nettoyé et sécurisé par revue Niveau 2",
    "Commits Git atomiques, un par tâche"
  ]},
  { type: "pageBreak" },

  // --- 7. ÉTAPE 5 : TDD ---
  { type: "heading", text: "7. Étape 5 : Développement Piloté par les Tests", level: 1 },
  { type: "paragraph", text: "Le skill test-driven-development applique le cycle RED-GREEN-REFACTOR sans exception. Aucun code n'est écrit sans test préalable." },
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce que vous devez faire", level: 2 },
  { type: "list", style: "bullet", items: [
    "Exigez la preuve du test en échec (phase RED) avant le code",
    "Consultez les rapports de test fournis par l'agent"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Le cycle en 4 phases", level: 2 },
  { type: "list", style: "numbered", items: [
    "RED : le test est écrit et échoue avec l'erreur attendue",
    "GREEN : le code minimal est écrit et le test passe",
    "REFACTOR : le code est nettoyé sans casser les tests",
    "COMMIT : le code validé est enregistré sur la branche"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui est produit", level: 2 },
  { type: "list", style: "bullet", items: [
    "Fichiers *.test.ts ou *.spec.ts pour chaque fonctionnalité",
    "Suite de tests automatisés couvrant le code de production",
    "Protection contre toute régression future"
  ]},
  { type: "pageBreak" },

  // --- 8. ÉTAPE 6 : LIVRAISON ---
  { type: "heading", text: "8. Étape 6 : Revue et Livraison", level: 1 },
  { type: "paragraph", text: "Le skill finishing-a-development-branch finalise le développement lorsque toutes les tâches sont complétées." },
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce que vous devez faire", level: 2 },
  { type: "list", style: "bullet", items: [
    "Choisissez parmi 4 options : PR, Merge, Conserver, Abandonner",
    "L'option recommandée est la création d'une Pull Request"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui se passe", level: 2 },
  { type: "list", style: "bullet", items: [
    "Ré-exécution de tous les tests (unitaires, intégration, E2E)",
    "Vérification du typage TypeScript strict et du linting",
    "Nettoyage du worktree et de la branche temporaires",
    "Rédaction de la description complète de la PR"
  ]},
  { type: "spacer", height: 6 },
  { type: "heading", text: "Ce qui est produit", level: 2 },
  { type: "list", style: "bullet", items: [
    "Pull Request documentée sur GitHub ou GitLab",
    "URL de preview du déploiement Vercel / Netlify",
    "Dépôt propre sans branches temporaires orphelines"
  ]},
  { type: "pageBreak" },

  // --- 9. CAS PRATIQUE ---
  { type: "heading", text: "9. Cas Pratique : SaaS de Gestion de Tâches", level: 1 },
  { type: "paragraph", text: "Nous allons construire TaskFlow, un SaaS de gestion de tâches pour petites équipes (2 à 10 personnes), indépendants et startups." },
  { type: "spacer", height: 8 },

  // --- 9.1 Le Projet ---
  { type: "heading", text: "9.1 Présentation du Projet", level: 2 },
  { type: "list", style: "bullet", items: [
    "Cible : équipes agiles de 2 à 10 collaborateurs",
    "Besoin : outil simple pour organiser le travail sans la lourdeur de Jira",
    "Authentification : Magic Link et Google OAuth via Supabase Auth",
    "Espaces de travail : créer un workspace, inviter des membres, définir des rôles",
    "Tâches : tableau Kanban (À faire, En cours, Terminé), assignation, échéances",
    "Abonnements : Starter gratuit (3 projets) + Pro à 8 €/mois par siège"
  ]},
  { type: "spacer", height: 8 },

  // --- 9.2 Etape 1 : Cadrage ---
  { type: "heading", text: "9.2 Étape 1 : Cadrage", level: 2 },
  { type: "paragraph", text: "Prompt à envoyer à l'agent : « Je veux créer un SaaS de gestion de tâches pour petites équipes avec authentification, workspaces et abonnements Stripe »." },
  { type: "list", style: "bullet", items: [
    "L'agent pose des questions sur le modèle de données (users, orgs, tasks)",
    "Il propose un schéma PostgreSQL avec Row Level Security",
    "Il définit les deux formules d'abonnement Stripe",
    "Livrable : docs/spec-saas.md avec personas et parcours utilisateurs"
  ]},
  { type: "spacer", height: 8 },

  // --- 9.3 Etape 2 : Isolation ---
  { type: "heading", text: "9.3 Étape 2 : Isolation", level: 2 },
  { type: "paragraph", text: "Prompt : « Valider et démarrer ». L'agent crée un espace de travail propre." },
  { type: "list", style: "bullet", items: [
    "Exécution de git worktree add sur la branche feature/taskflow",
    "Installation de Next.js 15, Supabase et Vitest",
    "Exécution des tests existants pour vérifier la base"
  ]},
  { type: "spacer", height: 8 },

  // --- 9.4 Etape 3 : Plan ---
  { type: "heading", text: "9.4 Étape 3 : Plan d'Exécution", level: 2 },
  { type: "paragraph", text: "L'agent propose un plan de 7 tâches atomiques. Le tableau suivant montre le découpage :" },
  { type: "table", headers: ["Tâche", "Description", "Durée"], rows: [
    ["1. Schéma DB", "Tables users, orgs, tasks + RLS", "3 min"],
    ["2. Authentification", "Magic Link + Google OAuth", "4 min"],
    ["3. Workspaces", "CRUD des espaces et invitations", "4 min"],
    ["4. Tâches", "CRUD Kanban avec statuts", "5 min"],
    ["5. UI Kanban", "Composant drag-and-drop", "4 min"],
    ["6. Stripe", "Webhooks et portail abonnement", "5 min"],
    ["7. Tests E2E", "Parcours complet onboarding", "5 min"]
  ], wrap: "auto", clipCells: true },
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Chaque tâche inclut les fichiers exacts à créer, le code complet et la commande de test. Vous validez en répondant « Go pour l'exécution »." },
  { type: "spacer", height: 8 },

  // --- 9.5 Etape 4 : Exécution ---
  { type: "heading", text: "9.5 Étape 4 : Exécution", level: 2 },
  { type: "paragraph", text: "L'agent délègue chaque tâche à un sous-agent spécialisé avec un contexte vierge." },
  { type: "list", style: "numbered", items: [
    "Tâche 1 : le sous-agent génère la migration SQL et les politiques RLS",
    "Tâche 2 : il implémente le flux d'authentification avec callback route",
    "Tâche 3 : il crée le CRUD workspaces avec gestion des membres",
    "Tâche 4 : il développe le gestionnaire de tâches avec statuts Kanban",
    "Tâche 5 : il construit l'interface Kanban avec drag-and-drop React",
    "Tâche 6 : il intègre les webhooks Stripe et le portail client",
    "Tâche 7 : il écrit les tests E2E du parcours complet"
  ]},
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Chaque tâche est doublement revue : conformité à la spécification, puis qualité du code. En cas de bug, le sous-agent corrige immédiatement." },
  { type: "spacer", height: 8 },

  // --- 9.6 Etape 5 : Tests ---
  { type: "heading", text: "9.6 Étape 5 : Tests", level: 2 },
  { type: "paragraph", text: "Le cycle RED-GREEN-REFACTOR est appliqué sur chaque tâche :" },
  { type: "list", style: "numbered", items: [
    "RED : test de la création de workspace qui échoue (pas encore de code)",
    "GREEN : code minimal de création de workspace qui fait passer le test",
    "REFACTOR : nettoyage du code sans casser les tests",
    "COMMIT : enregistrement du code validé"
  ]},
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "À la fin des 7 tâches, la couverture de tests est supérieure à 90 %." },
  { type: "spacer", height: 8 },

  // --- 9.7 Etape 6 : Livraison ---
  { type: "heading", text: "9.7 Étape 6 : Livraison", level: 2 },
  { type: "paragraph", text: "L'agent finalise en exécutant les étapes suivantes :" },
  { type: "list", style: "numbered", items: [
    "Ré-exécution de tous les tests (0 échec toléré)",
    "Vérification du typage TypeScript strict",
    "Nettoyage du worktree et de la branche temporaires",
    "Création d'une Pull Request avec description complète",
    "Déploiement automatique sur Vercel avec URL de preview"
  ]},
  { type: "spacer", height: 6 },
  { type: "paragraph", text: "Résultat : en une demi-journée, TaskFlow est un SaaS fonctionnel avec authentification, workspaces, Kanban, paiements Stripe et tests E2E." },
  { type: "pageBreak" },

  // --- 10. CHECKLIST ---
  { type: "heading", text: "10. Checklist de Contrôle", level: 1 },
  { type: "paragraph", text: "Points de contrôle obligatoires à chaque étape pour garantir la qualité du produit livré." },
  { type: "spacer", height: 8 },
  { type: "table", headers: ["Étape", "Critère", "Statut"], rows: [
    ["Cadrage", "Spécification technique validée", "[ ]"],
    ["Cadrage", "MVP défini et scope fixé", "[ ]"],
    ["Isolation", "Worktree créé, base saine", "[ ]"],
    ["Plan", "Tâches atomiques (2 à 5 min)", "[ ]"],
    ["Exécution", "Chaque tâche doublement revue", "[ ]"],
    ["Tests", "Cycle RED-GREEN-REFACTOR appliqué", "[ ]"],
    ["Tests", "Couverture > 80 %", "[ ]"],
    ["Livraison", "Tous les tests au vert", "[ ]"],
    ["Livraison", "PR documentée et déployée", "[ ]"]
  ], wrap: "auto", clipCells: true },
  { type: "spacer", height: 10 },
  { type: "paragraph", text: "Ce processus transforme la création d'un SaaS en une discipline reproductible. Vous passez d'une idée brute à un produit monétisable et testé en quelques sessions de travail cadrées." }
];

const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "generate_basic_pdf",
    arguments: {
      title: "Guide Pratique Superpowers SaaS",
      blocks,
      pageSize: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      embedFonts: true,
      headerTemplate: {
        left: "GUIDE MÉTHODOLOGIQUE",
        right: "Superpowers SaaS"
      },
      footerTemplate: {
        left: "Confidentiel",
        right: "Page {page} / {pages}"
      },
      outline: "auto",
      outputMode: "file",
      outputPath: OUTPUT_FILENAME
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
      const outPath = join(OUTPUT_DIR, OUTPUT_FILENAME);
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