'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Menu, X, ShoppingBag, BookOpen, Lightbulb, FolderGit2, UserCheck, Shield } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Hide Navbar on Sanity Studio route
  if (pathname?.startsWith('/studio')) {
    return null
  }

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Réalisations', href: '/realisations', icon: FolderGit2 },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag, badge: '' },
    { name: 'Idées & Projets', href: '/idees', icon: Lightbulb },
  ]

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dark-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan to-purple flex items-center justify-center text-dark-900 font-bold shadow-neon-cyan group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="font-display font-extrabold text-xl tracking-wider text-white block leading-none group-hover:text-cyan transition-colors">
              ANDY SIWA
            </span>
            <span className="text-[10px] tracking-widest text-cyan uppercase font-mono">
              Ingénieur & Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  active
                    ? 'text-cyan bg-cyan/10 border border-cyan/30 shadow-neon-cyan'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${active ? 'text-cyan' : 'text-gray-400'}`} />}
                <span>{link.name}</span>
                {link.badge && (
                  <span className="bg-gradient-to-r from-cyan to-blue-500 text-dark-900 font-bold text-[10px] px-1.5 py-0.5 rounded-full uppercase">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/studio"
            className="text-xs font-mono text-gray-400 hover:text-cyan px-3 py-1.5 rounded-md border border-white/10 hover:border-cyan/40 transition-colors flex items-center gap-1.5"
            title="Accès Sanity Admin CMS"
          >
            <Shield className="w-3.5 h-3.5 text-cyan" />
            <span>Sanity Studio</span>
          </Link>
          <a
            href="https://wa.me/237691234567" // WhatsApp contact or mailto
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button-primary text-xs uppercase tracking-wider"
          >
            Me Contacter
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6 text-cyan" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-dark-800/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-2 backdrop-blur-xl">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium ${
                  active
                    ? 'text-cyan bg-cyan/10 border border-cyan/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-5 h-5 text-cyan" />}
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="bg-cyan text-dark-900 font-bold text-xs px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/studio"
              onClick={() => setIsOpen(false)}
              className="text-center py-2 text-xs font-mono text-cyan bg-cyan/10 rounded-lg border border-cyan/30"
            >
              🔒 Accès Sanity CMS Studio
            </Link>
            <a
              href="https://wa.me/237691234567"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button-primary text-center py-3 text-sm"
            >
              Me Contacter sur WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
