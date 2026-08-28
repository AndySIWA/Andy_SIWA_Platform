import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react'
import { getProjectBySlug, getProjects } from '@/sanity/lib/data'
import ImageCarousel from '@/components/ImageCarousel'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug.current }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const validGallery = project.galleryUrls?.filter((url): url is string => !!url) ?? []
  const images = validGallery.length > 0
    ? validGallery
    : [project.mainImageUrl || '/img/image_4.png']

  return (
    <article>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* Back button */}
        <Link
          href="/realisations"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux réalisations</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono uppercase">
            {project.category}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">{project.summary}</p>
        </div>
      </div>

      {/* Carousel - Full Width */}
      {images.length > 1 ? (
        <ImageCarousel images={images} alt={project.title} />
      ) : (
        <div className="relative h-80 sm:h-96 w-full">
          <Image
            src={images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-10">
        {/* Tech Stack */}
        <div className="cyber-card p-6 rounded-2xl space-y-3">
          <h3 className="font-display font-bold text-sm text-cyan uppercase tracking-wider">
            Technologies & Domaines D&apos;application
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description Content */}
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4 leading-relaxed">
          <h3 className="font-display text-xl text-white font-bold">Aperçu & Objectifs Techniques</h3>
          <p>
            Ce projet s&apos;inscrit dans une démarche globale d&apos;optimisation et de sécurité. Les études préalables ont permis de valider les contraintes réglementaires et de concevoir une architecture fiable et pérenne.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Respect strict des normes et exigences de sécurité.</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Documentation technique complète pour exploitation.</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Intégration d&apos;outils modernes de mesure et de contrôle.</span>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button-primary flex items-center gap-2 text-sm"
            >
              <span>Consulter la Fiche / Démo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button-secondary flex items-center gap-2 text-sm"
            >
              <Github className="w-4 h-4" />
              <span>Dépôt GitHub</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
