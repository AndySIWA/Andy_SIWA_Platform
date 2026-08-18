import { client } from '../client'

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: string
  category: string
  tags?: string[]
  mainImageUrl?: string
  body?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  category: string
  techStack?: string[]
  mainImageUrl?: string
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
}

export interface Product {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  price: string
  chariowLink: string
  category: string
  coverImageUrl?: string
  features?: string[]
}

export interface Idea {
  _id: string
  title: string
  summary: string
  status: 'concept' | 'study' | 'prototype' | 'soon'
  targetDate?: string
  tags?: string[]
}

// Fallback Mock Data extracted from Andy's existing portfolio
export const MOCK_PROJECTS: Project[] = [
  {
    _id: 'proj-1',
    title: 'Poste de Transformation HTA/BT 630 kVA',
    slug: { current: 'poste-transformation-630kva' },
    summary: 'Dimensionnement complet, schémas unifilaires, étude de sélectivité des protections et supervision technique.',
    category: 'electrotechnique',
    techStack: ['Réseaux HTA/BT', 'AUTOCAD Electrical', 'Sélectivité', 'Norme NFC 15-100'],
    mainImageUrl: '/img/image_4.png',
    demoUrl: '#',
    featured: true,
  },
  {
    _id: 'proj-2',
    title: 'Plateforme IoT & Supervision Domotique SmartHome',
    slug: { current: 'iot-supervision-domotique' },
    summary: 'Système intelligent de gestion de l’énergie domestique avec télémétrie en temps réel et commandes sécurisées.',
    category: 'domotique',
    techStack: ['ESP32', 'MQTT', 'Next.js', 'WebSockets', 'Modbus'],
    mainImageUrl: '/img/image_8.png',
    demoUrl: '#',
    featured: true,
  },
  {
    _id: 'proj-3',
    title: 'Étude d\'Exécution & Coordination Réseau BT',
    slug: { current: 'etude-execution-coordination-bt' },
    summary: 'Planification, note de calcul de bilan de puissance, équilibrage des phases et dossier d\'exécution technique.',
    category: 'ingenierie',
    techStack: ['Caneco BT', 'Coordination Chantier', 'Bilan de Puissance'],
    mainImageUrl: '/img/image_6.jpg',
    demoUrl: '#',
    featured: true,
  },
]

export const MOCK_POSTS: Post[] = [
  {
    _id: 'post-1',
    title: 'Optimiser la sélectivité des protections dans un réseau HTA/BT',
    slug: { current: 'optimiser-selectivite-protections-hta-bt' },
    excerpt: 'Comment concevoir un plan de protection sans déclenchement intempestif et garantir la continuité de service industrielle.',
    publishedAt: '2026-02-01T10:00:00Z',
    readTime: '6 min',
    category: 'Génie Électrique',
    tags: ['HTA/BT', 'Sélectivité', 'Protection Électrique'],
    mainImageUrl: '/img/image_5.jpg',
    body: `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sélectivité HTA/BT — Démo interactive</title>
<style>
  * { margin: 0; box-sizing: border-box; }
  body { font-family: system-ui, sans-serif; background: #0b1220; color: #e2e8f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .card { background: #111a2e; border: 1px solid #22d3ee; border-radius: 16px; padding: 40px; max-width: 420px; text-align: center; box-shadow: 0 0 40px rgba(34, 211, 238, .25); }
  h1 { font-size: 1.3rem; color: #22d3ee; margin-bottom: 12px; }
  p { color: #94a3b8; line-height: 1.6; margin-bottom: 20px; }
  button { background: #22d3ee; color: #0b1220; border: 0; border-radius: 10px; padding: 12px 24px; font-weight: 700; cursor: pointer; font-size: 1rem; }
  button:hover { background: #67e8f9; }
  .count { font-size: 2.5rem; font-weight: 800; color: #22d3ee; margin: 16px 0 4px; }
  .bar { height: 8px; background: #1e293b; border-radius: 99px; overflow: hidden; margin-top: 16px; }
  .fill { height: 100%; width: 0; background: linear-gradient(90deg, #22d3ee, #a78bfa); transition: width .3s; }
</style>
</head>
<body>
<div class="card">
  <h1>Sélectivité des protections</h1>
  <p>Chaque déclenchement est mesuré : cliquez pour simuler une contrainte sur le réseau.</p>
  <div class="count" id="count">0</div>
  <div class="bar"><div class="fill" id="fill"></div></div>
  <button onclick="trigger()">Simuler une contrainte</button>
</div>
<script>
  let n = 0
  function trigger() {
    n = (n + 1) % 6
    document.getElementById('count').textContent = n + ' déclenchement' + (n > 1 ? 's' : '')
    document.getElementById('fill').style.width = (n / 5) * 100 + '%'
  }
</script>
</body>
</html>`,
  },
  {
    _id: 'post-2',
    title: 'Intégrer le protocole Modbus & MQTT dans un Dashboard Next.js',
    slug: { current: 'integrer-modbus-mqtt-dashboard-nextjs' },
    excerpt: 'Guide pratique pour remonter des métriques d\'un automate ou compteur d\'énergie vers une interface web moderne.',
    publishedAt: '2026-01-20T14:30:00Z',
    readTime: '8 min',
    category: 'Domotique & IoT',
    tags: ['IoT', 'MQTT', 'Next.js', 'Smart Grid'],
    mainImageUrl: '/img/image_7.png',
  },
  {
    _id: 'post-3',
    title: 'Bilan de puissance & Dimensionnement de TGBT : Les erreurs à éviter',
    slug: { current: 'bilan-de-puissance-dimensionnement-tgbt' },
    excerpt: 'Analyse des facteurs de foisonnement et de simultanéité dans les grands bâtiments tertiaires.',
    publishedAt: '2026-01-10T09:15:00Z',
    readTime: '5 min',
    category: 'Génie Électrique',
    tags: ['NFC 15-100', 'TGBT', 'Ingénierie'],
    mainImageUrl: '/img/image_4.png',
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: 'prod-1',
    title: 'Template Excel & Note de Bilan de Puissance HTA/BT',
    slug: { current: 'template-excel-bilan-de-puissance' },
    shortDescription: 'Outil de calcul automatisé du bilan de puissance, facteurs de simultanéité et dimensionnement de transformateur.',
    price: '5 000 FCFA',
    chariowLink: 'https://chariow.com/p/bilan-puissance-excel',
    category: 'template',
    coverImageUrl: '/img/image_4.png',
    features: [
      'Calculs automatiques normalisés NFC 15-100',
      'Matrice des facteurs de foisonnement',
      'Format de présentation prêt à imprimer pour client',
    ],
  },
  {
    _id: 'prod-2',
    title: 'Guide Pratique : Schémas & Raccordements Domotiques',
    slug: { current: 'guide-pratique-schemas-domotiques' },
    shortDescription: 'Ebook complet avec schémas filaires et programmation des modules de mesure et d\'automatisation.',
    price: '7 500 FCFA',
    chariowLink: 'https://chariow.com/p/guide-schemas-domotiques',
    category: 'ebook',
    coverImageUrl: '/img/image_8.png',
    features: [
      'Plus de 30 schémas d\'installation commentés',
      'Exemples de code ESP32 & Home Assistant',
      'Checklist de sécurité réseau électrique',
    ],
  },
  {
    _id: 'prod-3',
    title: 'Pack de Symboles CAD Electrical & Unifilaires',
    slug: { current: 'pack-symboles-cad-electrical' },
    shortDescription: 'Bibliothèque complète de bloc DWG/DXF pour schémas unifilaires d\'armoires et TGBT.',
    price: '10 000 FCFA',
    chariowLink: 'https://chariow.com/p/pack-cad-electrical',
    category: 'schema',
    coverImageUrl: '/img/image_2.jpg',
    features: [
      'Conforme aux normes CEI / NFC',
      'Format vectoriel DWG, DXF & PNG',
      'Mise à jour gratuite à vie',
    ],
  },
]

export const MOCK_IDEAS: Idea[] = [
  {
    _id: 'idea-1',
    title: 'Simulateur Web de Sélectivité pour Protections BT',
    summary: 'Application web interactive permettant de tracer les courbes temps-courant de disjoncteurs et vérifier la sélectivité en direct.',
    status: 'prototype',
    targetDate: 'Q3 2026',
    tags: ['Web Application', 'Électrotechnique', 'Outil Gratuit'],
  },
  {
    _id: 'idea-2',
    title: 'Boîtier Domotique de Monitoring Énergétique Solaire',
    summary: 'Module basé sur microcontrôleur mesurant la production photovoltaïque et commutant automatiquement les charges prioritaires.',
    status: 'study',
    targetDate: 'Q4 2026',
    tags: ['Hardware', 'Énergie Renouvelable', 'IoT'],
  },
  {
    _id: 'idea-3',
    title: 'Plateforme de Télé-assistance pour Techniciens de Chantier',
    summary: 'Assistant digital guidant les inspections d\'armoires électriques et l\'édition de rapports de conformité sur smartphone.',
    status: 'concept',
    targetDate: '2027',
    tags: ['Mobile/Web', 'Maintenance', 'SaaS'],
  },
]

function hasValidSanityConfig(): boolean {
  const pId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return Boolean(pId && pId !== 'your-sanity-project-id' && pId !== 'demo-id')
}

// Fetchers with fallback
export async function getProjects(): Promise<Project[]> {
  if (!hasValidSanityConfig()) return MOCK_PROJECTS
  try {
    const data = await client.fetch(`*[_type == "project"]{
      _id,
      title,
      slug,
      summary,
      category,
      techStack,
      "mainImageUrl": mainImage.asset->url,
      demoUrl,
      githubUrl,
      featured
    }`)
    if (data && data.length > 0) return data
  } catch (err) {
    console.warn('Using mock projects fallback:', err)
  }
  return MOCK_PROJECTS
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!hasValidSanityConfig()) return MOCK_PROJECTS.find((p) => p.slug.current === slug) || MOCK_PROJECTS[0]
  try {
    const data = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      summary,
      description,
      category,
      techStack,
      "mainImageUrl": mainImage.asset->url,
      demoUrl,
      githubUrl,
      featured
    }`, { slug })
    if (data) return data
  } catch (err) {
    console.warn('Using mock project detail fallback:', err)
  }
  return MOCK_PROJECTS.find((p) => p.slug.current === slug) || MOCK_PROJECTS[0]
}

export async function getPosts(): Promise<Post[]> {
  if (!hasValidSanityConfig()) return MOCK_POSTS
  try {
    const data = await client.fetch(`*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      category,
      tags,
      "mainImageUrl": mainImage.asset->url
    }`)
    if (data && data.length > 0) return data
  } catch (err) {
    console.warn('Using mock posts fallback:', err)
  }
  return MOCK_POSTS
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!hasValidSanityConfig()) return MOCK_POSTS.find((p) => p.slug.current === slug) || MOCK_POSTS[0]
  try {
    const data = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      category,
      tags,
      "mainImageUrl": mainImage.asset->url,
      body
    }`, { slug })
    if (data) return data
  } catch (err) {
    console.warn('Using mock post detail fallback:', err)
  }
  return MOCK_POSTS.find((p) => p.slug.current === slug) || MOCK_POSTS[0]
}

export async function getProducts(): Promise<Product[]> {
  if (!hasValidSanityConfig()) return MOCK_PRODUCTS
  try {
    const data = await client.fetch(`*[_type == "product"]{
      _id,
      title,
      slug,
      shortDescription,
      price,
      chariowLink,
      category,
      "coverImageUrl": coverImage.asset->url,
      features
    }`)
    if (data && data.length > 0) return data
  } catch (err) {
    console.warn('Using mock products fallback:', err)
  }
  return MOCK_PRODUCTS
}

export async function getIdeas(): Promise<Idea[]> {
  if (!hasValidSanityConfig()) return MOCK_IDEAS
  try {
    const data = await client.fetch(`*[_type == "idea"]{
      _id,
      title,
      summary,
      status,
      targetDate,
      tags
    }`)
    if (data && data.length > 0) return data
  } catch (err) {
    console.warn('Using mock ideas fallback:', err)
  }
  return MOCK_IDEAS
}
