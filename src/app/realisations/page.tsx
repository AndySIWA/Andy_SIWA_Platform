import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FolderGit2, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { getProjects } from '@/sanity/lib/data'

export const revalidate = 60

export const metadata = {
  title: 'Réalisations & Projets | Andy SIWA',
  description: 'Galerie des projets et réalisations techniques en ingénierie électrique, domotique et développement web par Andy SIWA.',
}

export default async function RealisationsPage() {
  const projects = await getProjects()

  return (
    <div className="blog-light">
      <BlogMeshBackground />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Ingénierie & Développement</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Réalisations & Projets
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Découvrez une sélection de projets industriels, d&apos;études de réseaux HTA/BT, d&apos;installations domotiques et d&apos;applications web développées sur mesure.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/realisations/${project.slug.current}`}
              className="blog-card flex flex-col group"
            >
              <div>
                <div className="relative h-56 w-full bg-white rounded-2xl overflow-hidden">
                  <Image
                    src={project.mainImageUrl || '/img/image_4.png'}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono text-cyan uppercase border border-cyan/30">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="font-display font-bold text-xl text-slate-800 group-hover:text-cyan transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{project.summary}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-200 mt-4">
                <Link
                  href={`/realisations/${project.slug.current}`}
                  className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
                >
                  Détails de la réalisation <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-cyan hover:border-cyan transition-colors"
                      title="Lien démo / document"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-cyan hover:border-cyan transition-colors"
                      title="Code source Git"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
