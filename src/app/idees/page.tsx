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
        return { label: '🛠️ Prototypage / Dev', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' }
      case 'study':
        return { label: '📐 Études & Conception', color: 'bg-purple-50 text-purple-600 border-purple-200' }
      case 'soon':
        return { label: '🚀 Bientôt disponible', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' }
      default:
        return { label: '💡 Concept / Réflexion', color: 'bg-amber-50 text-amber-600 border-amber-200' }
    }
  }

  return (
    <div className="blog-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-mono">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Laboratoire & Incubateur</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900">
          Idées & Projets à Venir
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Un aperçu transparent des concepts, idées et prototypes sur lesquels je travaille. N&apos;hésitez pas à me contacter si vous souhaitez collaborer ou apporter votre retour !
        </p>
      </div>

      {/* Ideas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.map((idea) => {
          const badge = getStatusBadge(idea.status)
          return (
            <div key={idea._id} className="blog-card rounded-2xl p-6 flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={`px-2.5 py-1 rounded-full border ${badge.color}`}>
                    {badge.label}
                  </span>
                  {idea.targetDate && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-cyan-600" /> {idea.targetDate}
                    </span>
                  )}
                </div>

                <h2 className="font-display font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {idea.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {idea.summary}
                </p>

                {idea.tags && idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {idea.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {/* <span className="text-xs text-slate-400 font-mono">ID: {idea._id}</span> */}
                <a
                  href="https://wa.me/237691234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-700 hover:underline flex items-center gap-1"
                >
                  Proposer une idée / Collaboration
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}
