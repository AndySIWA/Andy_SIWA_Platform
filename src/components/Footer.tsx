'use client'

import React from 'react'
import Link from 'next/link'
import { Zap, Mail, Heart } from 'lucide-react'
import { SiGithub, SiWhatsapp } from '@icons-pack/react-simple-icons'
import { LinkedinIcon } from './LinkedinIcon'

export default function Footer() {
  return (
    <footer className="relative bg-dark-900 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Bio */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan flex items-center justify-center text-dark-900 font-bold">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">ANDY SIWA</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ingénieur Électricien spécialisé en coordination technique, réseaux HTA/BT, domotique et développement web moderne.
            </p>
          </div>

          {/* Col 2: Navigation rapide */}
          <div>
            <h4 className="font-display font-bold text-sm text-cyan uppercase tracking-wider mb-4">
              Plateforme
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/realisations" className="hover:text-white transition-colors">Réalisations & Projets</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Articles</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace Digitale</Link></li>
              <li><Link href="/idees" className="hover:text-white transition-colors">Idées & Projets futurs</Link></li>
            </ul>
          </div>

          {/* Col 3: Services & Expertises */}
          <div>
            <h4 className="font-display font-bold text-sm text-cyan uppercase tracking-wider mb-4">
              Expertises
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Études Réseaux HTA/BT</li>
              <li>Supervision Domotique & IoT</li>
              <li>Développement Web & Dashboards</li>
              <li>Note de Calcul Caneco & CAD</li>
            </ul>
          </div>

          {/* Col 4: Réseaux & Contact */}
          <div>
            <h4 className="font-display font-bold text-sm text-cyan uppercase tracking-wider mb-4">
              Réseaux & Contact
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://github.com/AndySIWA/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan/40 transition-colors"
                title="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/andy-siwa-180283199/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan/40 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/237691234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors"
                title="WhatsApp"
              >
                <SiWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@blendy03ing@gmail.com"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan/40 transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500">
              Géré avec <strong className="text-gray-300">Sanity CMS</strong> & hébergé sur <strong className="text-gray-300">Netlify</strong>.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Andy SIWA. Tous droits réservés.</p>
          <div className="flex items-center gap-1 text-gray-400">
            Conçu avec <Heart className="w-3.5 h-3.5 text-cyan fill-cyan inline mx-1" /> par Andy SIWA
          </div>
        </div>
      </div>
    </footer>
  )
}
