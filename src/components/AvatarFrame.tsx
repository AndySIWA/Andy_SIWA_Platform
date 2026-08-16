'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AvatarFrame() {
  return (
    <motion.div
      className="relative w-full max-w-md aspect-square"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Rotating glow ring */}
      <motion.div
        className="absolute -inset-3 rounded-full opacity-60"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(0,240,255,0.8), rgba(59,130,246,0.3), rgba(139,92,246,0.8), rgba(0,240,255,0.8))',
          filter: 'blur(24px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Frame */}
      <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-b from-cyan/30 via-purple/20 to-transparent border border-white/20 shadow-neon-cyan">
        <motion.div
          className="w-full h-full rounded-full overflow-hidden relative bg-dark-800"
          animate={{ boxShadow: [
            '0 0 25px rgba(0, 240, 255, 0.35)',
            '0 0 45px rgba(139, 92, 246, 0.45)',
            '0 0 25px rgba(0, 240, 255, 0.35)',
          ] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/img/Andy_SIWA.jpg"
            alt="Andy SIWA - Ingénieur"
            fill
            className="object-cover object-center filter contrast-105"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
