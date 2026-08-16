import type { Metadata } from 'next'
import { Inter, Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://andysiwa.com'),
  title: 'Andy SIWA | Ingénieur Électricien & Développeur Web',
  description:
    'Plateforme interactive d\'Andy SIWA - Ingénieur Électricien spécialisé en coordination technique, réseaux HTA/BT, domotique, blog et marketplace de produits digitaux.',
  keywords: [
    'Andy SIWA',
    'Ingénieur Électricien',
    'HTA/BT',
    'Domotique',
    'IoT',
    'Next.js',
    'Sanity CMS',
    'Marketplace Digitale',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable} dark`}>
      <body className="bg-dark-900 text-gray-100 min-h-screen flex flex-col antialiased">
        {/* Background Mesh */}
        <div className="mesh-bg">
          <div className="mesh-circle circle-1"></div>
          <div className="mesh-circle circle-2"></div>
          <div className="mesh-circle circle-3"></div>
        </div>
        <ParticleBackground />

        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
