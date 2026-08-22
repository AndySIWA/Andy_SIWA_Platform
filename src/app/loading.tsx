import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="w-12 h-12 rounded-full border-2 border-cyan/20 border-t-cyan animate-spin shadow-neon-cyan" />
      <span className="text-xs font-mono uppercase tracking-widest text-cyan/70">Chargement...</span>
    </div>
  )
}
