'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Mail, Heart } from 'lucide-react'
import { SiGithub, SiWhatsapp } from '@icons-pack/react-simple-icons'
import { LinkedinIcon } from './LinkedinIcon'

export default function Footer() {
  const pathname = usePathname()
  const isBlog = pathname.startsWith('/blog')

  const linkClass = isBlog
    ? 'text-slate-500 hover:text-cyan-600 transition-colors'
    : 'text-gray-400 hover:text-white transition-colors'

  const headingClass = isBlog
    ? 'font-display font-bold text-xs text-cyan-600 uppercase tracking-[0.15em] mb-4'
    : 'font-display font-bold text-xs text-cyan uppercase tracking-[0.15em] mb-4'

  const socialBtnClass = isBlog
    ? 'w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-cyan-600 hover:border-cyan-300 hover:shadow-md hover:shadow-cyan-100 transition-all duration-200'
    : 'w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/10 transition-all duration-200'

  return (
    <footer className={`relative pt-16 pb-10 overflow-hidden ${
      isBlog
        ? 'bg-white border-t border-slate-100'
        : 'bg-[#0b0f19] border-t border-white/[0.06]'
    }`}>
      {/* Subtle mesh for dark footer */}
      {!isBlog && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple/10 rounded-full blur-[120px]" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-200/10">
          {/* Col 1: Bio */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                isBlog
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-200'
                  : 'bg-gradient-to-br from-cyan to-blue-600 text-dark-900 shadow-lg shadow-cyan/20'
              }`}>
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className={`font-display font-extrabold text-base ${
                isBlog ? 'text-slate-800' : 'text-white'
              }`}>
                ANDY SIWA
              </span>
            </Link>
            <p className={`text-sm leading-relaxed ${
              isBlog ? 'text-slate-500' : 'text-gray-400'
            }`}>
              Ingénieur Électricien spécialisé en coordination technique, réseaux HTA/BT, domotique et développement web moderne.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className={headingClass}>Plateforme</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className={linkClass}>Accueil</Link></li>
              <li><Link href="/realisations" className={linkClass}>Réalisations & Projets</Link></li>
              <li><Link href="/blog" className={linkClass}>Blog & Articles</Link></li>
              <li><Link href="/marketplace" className={linkClass}>Marketplace Digitale</Link></li>
              <li><Link href="/idees" className={linkClass}>Idées & Projets futurs</Link></li>
            </ul>
          </div>

          {/* Col 3: Expertises */}
          <div>
            <h4 className={headingClass}>Expertises</h4>
            <ul className={`space-y-2.5 text-sm ${isBlog ? 'text-slate-500' : 'text-gray-400'}`}>
              <li>Études Réseaux HTA/BT</li>
              <li>Supervision Domotique & IoT</li>
              <li>Développement Web & Dashboards</li>
              <li>Note de Calcul Caneco & CAD</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className={headingClass}>Réseaux & Contact</h4>
            <div className="flex gap-2.5 mb-4">
              <a href="https://github.com/AndySIWA/" target="_blank" rel="noopener noreferrer" className={socialBtnClass} title="GitHub">
                <SiGithub className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/andy-siwa-180283199/" target="_blank" rel="noopener noreferrer" className={socialBtnClass} title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://wa.me/237691234567" target="_blank" rel="noopener noreferrer" className={`${socialBtnClass} ${isBlog ? '!text-emerald-500 hover:!text-emerald-600 hover:!border-emerald-300' : '!text-emerald-400 hover:!text-emerald-400 hover:!border-emerald-400/40'}`} title="WhatsApp">
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <a href="mailto:contact@blendy03ing@gmail.com" className={socialBtnClass} title="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className={`text-xs ${isBlog ? 'text-slate-400' : 'text-gray-500'}`}>
              Géré avec <strong className={isBlog ? 'text-slate-600' : 'text-gray-300'}>Sanity CMS</strong> & hébergé sur{' '}
              <strong className={isBlog ? 'text-slate-600' : 'text-gray-300'}>Netlify</strong>.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs gap-3">
          <p className={isBlog ? 'text-slate-400' : 'text-gray-500'}>
            © {new Date().getFullYear()} Andy SIWA. Tous droits réservés.
          </p>
          <div className={`flex items-center gap-1 ${isBlog ? 'text-slate-400' : 'text-gray-400'}`}>
            Conçu avec <Heart className={`w-3.5 h-3.5 inline mx-0.5 fill-current ${isBlog ? 'text-cyan-500' : 'text-cyan'}`} /> par Andy SIWA
          </div>
        </div>
      </div>
    </footer>
  )
}
