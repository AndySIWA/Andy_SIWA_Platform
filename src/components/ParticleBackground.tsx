'use client'

import React, { useEffect, useRef } from 'react'

const DARK_COLORS = ['rgba(0, 240, 255,', 'rgba(59, 130, 246,', 'rgba(139, 92, 246,']
const LIGHT_COLORS = ['rgba(6, 182, 212,', 'rgba(79, 70, 229,', 'rgba(124, 58, 237,']

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isLight = !!document.querySelector('.blog-light')
    const COLORS = isLight ? LIGHT_COLORS : DARK_COLORS
    const MAX_LINK = isLight ? 160 : 140
    const PARTICLE_OPACITY = isLight ? 0.65 : 0.8
    const LINE_BASE = isLight ? 0.5 : 0.4
    const LINE_WIDTH = isLight ? 1 : 0.6
    const SPEED = isLight ? 0.35 : 0.5

    let raf = 0
    let particles: { x: number; y: number; vx: number; vy: number; r: number; c: string }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      const count = Math.min(90, Math.floor(window.innerWidth / 16))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * (isLight ? 2 : 1.8) + (isLight ? 1 : 0.8),
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        if (isLight) {
          ctx.shadowBlur = 6
          ctx.shadowColor = `${p.c} 0.3)`
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${p.c} ${PARTICLE_OPACITY})`
        ctx.fill()

        if (isLight) {
          ctx.shadowBlur = 0
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < MAX_LINK) {
            const alpha = (1 - d / MAX_LINK) * (isLight ? LINE_BASE + 0.2 : LINE_BASE)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `${a.c} ${alpha})`
            ctx.lineWidth = LINE_WIDTH
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    init()
    step()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden
    />
  )
}
