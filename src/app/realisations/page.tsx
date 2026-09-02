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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 text-xs font-mono">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Ingénierie & Développement</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900">
          Réalisations & Projets
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Découvrez une sélection de projets industriels, d&apos;études de réseaux HTA/BT, d&apos;installations domotiques et d&apos;applications web développées sur mesure.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {projects.map((project) => (
          <div key={project._id} className="blog-card rounded-2xl overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-48 w-full bg-slate-100">
                <Image
                  src={project.mainImageUrl || '/img/image_4.png'}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono text-cyan-600 uppercase border border-cyan-200">
                  {project.category}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-display font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{project.summary}</p>

                <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
              <Link
                href={`/realisations/${project.slug.current}`}
                className="blog-read-more text-xs py-2 px-4 flex items-center gap-2"
              >
                <span>Fiche Détaillée</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-300 transition-colors"
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
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-300 transition-colors"
                    title="Code source Git"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
