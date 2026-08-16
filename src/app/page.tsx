import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Zap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  ShoppingBag,
  BookOpen,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Code,
} from 'lucide-react'
import { getProjects, getPosts, getProducts, getIdeas } from '@/sanity/lib/data'
import AvatarFrame from '@/components/AvatarFrame'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const [projects, posts, products, ideas] = await Promise.all([
    getProjects(),
    getPosts(),
    getProducts(),
    getIdeas(),
  ])

  const featuredProjects = projects.slice(0, 3)
  const recentPosts = posts.slice(0, 3)
  const topProducts = products.slice(0, 3)
  const upcomingIdeas = ideas.slice(0, 3)

  return (
    <div className="space-y-24 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plateforme Web Interactive & CMS Managed</span>
              </div> */}

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue-400 to-purple">ANDY</span> SIWA
              </h1>

              <p className="font-tech text-xl sm:text-2xl text-cyan font-semibold tracking-wide">
                INGÉNIEUR ÉLECTRICIEN & DÉVELOPPEUR DIGITAL
              </p>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Je transforme l&apos;énergie et le code en solutions intelligentes. Spécialisé en{' '}
                <strong className="text-white">coordination technique, réseaux HTA/BT, domotique IoT</strong> et{' '}
                <strong className="text-white">développement web moderne</strong>.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link href="/realisations" className="cyber-button-primary flex items-center gap-2 text-sm uppercase tracking-wider">
                  <span>Explorer mes réalisations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link href="/marketplace" className="cyber-button-secondary flex items-center gap-2 text-sm">
                  <ShoppingBag className="w-4 h-4 text-cyan" />
                  <span>Marketplace Digitale</span>
                </Link>
              </div>

              {/* Quick stats badges */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="font-display font-extrabold text-2xl text-cyan">5+ ans</div>
                  <div className="text-xs text-gray-400">Expérience Génie Électrique</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-purple">100%</div>
                  <div className="text-xs text-gray-400">Projets Livrés avec Rigueur</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-emerald-400">Sanity</div>
                  <div className="text-xs text-gray-400">Gestion dynamique</div>
                </div>
              </div>
            </div>

            {/* Right Hero Avatar / Visual Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <AvatarFrame />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES / EXPERTISES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-cyan text-xs uppercase tracking-widest font-mono">Expertises Techniques</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Services & Compétences d&apos;Ingénierie
          </h2>
          <p className="text-gray-400 text-sm">
            Une double compétence à la croisée de l&apos;électrotechnique industrielle et des technologies du web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="cyber-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Études Réseaux HTA/BT</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dimensionnement de postes de transformation, bilan de puissance, sélectivité des protections et schémas unifilaires.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple/10 border border-purple/30 flex items-center justify-center text-purple">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Domotique & IoT</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Supervision énergétique en temps réel, automatisation du bâtiment, protocoles Modbus, MQTT & ESP32.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Développement Web</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Applications React / Next.js sur mesure, dashboards d&apos;analyse de données et intégrations d&apos;APIs.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Coordination Chantier</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Suivi d&apos;exécution, normes NFC 15-100, contrôle de conformité et gestion des équipes techniques.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED REALISATIONS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-cyan text-xs uppercase tracking-widest font-mono mb-1">Portfolio</div>
            <h2 className="font-display text-3xl font-bold text-white">Réalisations Récentes</h2>
          </div>
          <Link
            href="/realisations"
            className="text-cyan text-sm font-semibold hover:underline flex items-center gap-1"
          >
            Voir tous les projets <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div key={project._id} className="cyber-card rounded-2xl overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full bg-dark-800">
                  <Image
                    src={project.mainImageUrl || '/img/image_4.png'}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-dark-900/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-cyan font-mono border border-cyan/30">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{project.summary}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/realisations/${project.slug.current}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan hover:text-white transition-colors"
                >
                  Détails de la réalisation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MARKETPLACE PREVIEW ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-dark-800 via-dark-900 to-dark-800 border border-cyan/30 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/20 text-purple text-xs font-mono border border-purple/40">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ressources Digitales Prêtes à l&apos;emploi</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-white">
                Marketplace Produit & Outils d&apos;Ingénierie
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Retrouvez mes notes de calcul Excel, guides pratiques domotiques et packs de symboles CAD.
                Paiement direct et sécurisé via <strong className="text-cyan">Chariow</strong>.
              </p>
            </div>

            <Link href="/marketplace" className="cyber-button-primary flex items-center gap-2 whitespace-nowrap text-sm">
              <span>Visiter la Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {topProducts.map((prod) => (
              <div key={prod._id} className="p-5 rounded-xl bg-dark-900/90 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan">{prod.category}</span>
                  <span className="font-display font-bold text-emerald-400 text-sm">{prod.price}</span>
                </div>
                <h4 className="font-bold text-white text-base">{prod.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{prod.shortDescription}</p>
                <a
                  href={prod.chariowLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button-secondary w-full text-center text-xs block py-2"
                >
                  Acheter via Chariow
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG PREVIEW ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-cyan text-xs uppercase tracking-widest font-mono mb-1">Publications</div>
            <h2 className="font-display text-3xl font-bold text-white">Derniers Articles du Blog</h2>
          </div>
          <Link href="/blog" className="text-cyan text-sm font-semibold hover:underline flex items-center gap-1">
            Lire tous les articles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <article key={post._id} className="cyber-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>{post.category}</span>
                  <span>{post.readTime} de lecture</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white hover:text-cyan transition-colors">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3">{post.excerpt}</p>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
                >
                  Lire <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= IDEAS & UPCOMING PROJECTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cyber-card p-8 sm:p-10 rounded-3xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-cyan text-xs uppercase tracking-widest font-mono mb-1">Laboratoire & Incubateur</div>
              <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-400" /> Idées & Projets à Venir
              </h2>
            </div>
            <Link href="/idees" className="cyber-button-secondary text-xs">
              Découvrir toutes les idées
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingIdeas.map((idea) => (
              <div key={idea._id} className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 font-mono border border-amber-400/30">
                    {idea.status === 'prototype'
                      ? 'Prototypage'
                      : idea.status === 'study'
                      ? 'Études'
                      : 'Concept'}
                  </span>
                  <span className="text-gray-400 font-mono">{idea.targetDate}</span>
                </div>
                <h4 className="font-bold text-white text-base">{idea.title}</h4>
                <p className="text-xs text-gray-400">{idea.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
