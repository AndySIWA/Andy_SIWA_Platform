'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Menu, X, ShoppingBag, BookOpen, Lightbulb, FolderGit2 } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Réalisations', href: '/realisations', icon: FolderGit2 },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Idées & Projets', href: '/idees', icon: Lightbulb },
  ]

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06]">
      <div className="absolute inset-0 bg-[#0b0f19]/80 backdrop-blur-xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center text-dark-900 font-bold shadow-lg shadow-cyan/20 group-hover:shadow-cyan/40 transition-shadow duration-300">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[15px] tracking-wider text-white leading-none">
              ANDY SIWA
            </span>
            <span className="text-[9px] tracking-[0.2em] text-cyan/80 uppercase font-mono leading-none mt-0.5">
              Ingénieur & Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5 relative z-10">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center gap-2 ${
                  active
                    ? 'text-cyan'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-lg bg-cyan/[0.08] border border-cyan/20" />
                )}
                {Icon && (
                  <Icon className={`w-4 h-4 relative z-10 ${active ? 'text-cyan' : 'text-gray-500'}`} />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3 relative z-10">
          <a
            href="https://wa.me/237691234567"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan to-blue-600 text-dark-900 text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-cyan/25 transition-all duration-300 hover:scale-[1.02]"
          >
            Me Contacter
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors relative z-10"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0b0f19]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 pt-3 pb-5 space-y-1 relative z-50">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-cyan bg-cyan/[0.08]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.name}</span>
              </Link>
            )
          })}
          <div className="pt-3 mt-2 border-t border-white/[0.06]">
            <a
              href="https://wa.me/237691234567"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-cyan to-blue-600 text-dark-900 text-sm font-bold"
            >
              Me Contacter
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
