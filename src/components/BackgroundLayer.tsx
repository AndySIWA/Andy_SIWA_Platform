'use client'

import { usePathname } from 'next/navigation'
import ParticleBackground from './ParticleBackground'
import MeshBackground from './MeshBackground'

const LIGHT_PATHS = ['/blog', '/realisations', '/marketplace', '/idees']

function DarkBackground() {
  return (
    <>
      <div className="mesh-bg">
        <div className="mesh-circle circle-1" />
        <div className="mesh-circle circle-2" />
        <div className="mesh-circle circle-3" />
      </div>
      <ParticleBackground />
    </>
  )
}

export default function BackgroundLayer() {
  const pathname = usePathname()
  const isLight = LIGHT_PATHS.some((p) => pathname.startsWith(p))
  return isLight ? <MeshBackground /> : <DarkBackground />
}
