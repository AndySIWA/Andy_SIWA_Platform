import React from 'react'
import { Lightbulb, Compass, Rocket, Code2, Clock } from 'lucide-react'
import { getIdeas } from '@/sanity/lib/data'

export const revalidate = 60

export const metadata = {
  title: 'Idées & Projets à venir | Andy SIWA',
  description: 'Projets en incubation, recherches et idées d\'innovations technologiques par Andy SIWA.',
}

export default async function IdeesPage() {
  const ideas = await getIdeas()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'prototype':
        return { label: '🛠️ Prototypage / Dev', color: 'bg-cyan/10 text-cyan border-cyan/40' }
      case 'study':
        return { label: '📐 Études & Schémas', color: 'bg-purple/10 text-purple border-purple/40' }
      case 'soon':
        return { label: '🚀 Bientôt disponible', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' }
      default:
        return { label: '💡 Concept / Réflexion', color: 'bg-amber-400/10 text-amber-400 border-amber-400/40' }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Laboratoire & Incubateur</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
          Idées & Projets à Venir
        </h1>
        <p className="text-gray-300 text-base leading-relaxed">
          Un aperçu transparent des concepts, outils et prototypes sur lesquels je travaille. N&apos;hésitez pas à me contacter si vous souhaitez collaborer ou apporter votre retour !
        </p>
      </div>

      {/* Ideas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.map((idea) => {
          const badge = getStatusBadge(idea.status)
          return (
            <div key={idea._id} className="cyber-card rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={`px-2.5 py-1 rounded-full border ${badge.color}`}>
                    {badge.label}
                  </span>
                  {idea.targetDate && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3.5 h-3.5 text-cyan" /> {idea.targetDate}
                    </span>
                  )}
                </div>

                <h2 className="font-display font-bold text-xl text-white">
                  {idea.title}
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {idea.summary}
                </p>

                {idea.tags && idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {idea.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">ID: {idea._id}</span>
                <a
                  href="https://wa.me/237691234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
                >
                  Proposer une idée / Partenariat
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
