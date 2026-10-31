'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Link2, Mail, Share2 } from 'lucide-react'
import { SiFacebook, SiReddit, SiTelegram, SiWhatsapp, SiX } from '@icons-pack/react-simple-icons'
import { LinkedinIcon } from './LinkedinIcon'

interface ShareButtonsProps {
  title: string
  url: string
}

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface ShareDestination {
  name: string
  href: string
  icon: IconComponent
  color: string
}

const menuVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.04 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.18, ease: 'easeOut' as const } },
}

const itemClass =
  'group mx-2 flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom')
  const [maxPanelHeight, setMaxPanelHeight] = useState<number>()
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openedWithKeyboard = useRef(false)
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === 'function')
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    const focusTimer = window.setTimeout(() => {
      if (openedWithKeyboard.current) {
        panelRef.current?.querySelector<HTMLElement>('[data-share-item]')?.focus()
      } else {
        panelRef.current?.focus()
      }
    }, 60)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [open])

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      setOpen(false)
      return
    }
    openedWithKeyboard.current = event.detail === 0
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      const navClearance = 76
      const spaceAbove = rect.top - navClearance
      const spaceBelow = window.innerHeight - rect.bottom - 24
      const nextPlacement = spaceAbove > spaceBelow ? 'top' : 'bottom'
      setPlacement(nextPlacement)
      setMaxPanelHeight(Math.min(Math.max(nextPlacement === 'top' ? spaceAbove : spaceBelow, 220), 560))
    }
    setOpen(true)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    setCopied(true)
    if (copiedTimer.current) clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => {
      setCopied(false)
      setOpen(false)
    }, 1500)
  }

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url })
      setOpen(false)
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Native share failed', error)
      }
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const destinations: ShareDestination[] = [
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: '#0A66C2',
    },
    {
      name: 'X',
      icon: SiX,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: '#0F172A',
    },
    {
      name: 'WhatsApp',
      icon: SiWhatsapp,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: '#25D366',
    },
    {
      name: 'Facebook',
      icon: SiFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877F2',
    },
    {
      name: 'Telegram',
      icon: SiTelegram,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#229ED9',
    },
    {
      name: 'Reddit',
      icon: SiReddit,
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: '#FF4500',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`,
      color: '#0891B2',
    },
  ]

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="share-menu"
        className="group flex w-full items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_24px_-8px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_12px_28px_-8px_rgba(99,102,241,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 active:translate-y-0"
      >
        <span className="inline-flex items-center gap-2">
          <Share2 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
          <span>Partager cet article</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="share-menu"
            role="menu"
            aria-label="Options de partage"
            tabIndex={-1}
            initial={{ opacity: 0, y: placement === 'top' ? 8 : -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === 'top' ? 8 : -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxHeight: maxPanelHeight }}
            className={`absolute right-0 z-50 flex w-[min(20rem,calc(100vw-2.75rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] focus:outline-none ${
              placement === 'top' ? 'bottom-full mb-3 origin-bottom-right' : 'top-full mt-3 origin-top-right'
            }`}
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 px-5 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Partager via
              </span>
            </div>

            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="show"
              className="min-h-0 flex-1 overflow-y-auto py-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {destinations.map((destination) => {
                const Icon = destination.icon
                return (
                  <motion.a
                    key={destination.name}
                    variants={itemVariants}
                    role="menuitem"
                    data-share-item
                    href={destination.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={itemClass}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${destination.color}14`, color: destination.color }}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-slate-700">
                      {destination.name}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </motion.a>
                )
              })}
            </motion.div>

            <div className="shrink-0 border-t border-slate-100 py-2">
              <button
                type="button"
                role="menuitem"
                data-share-item
                onClick={handleCopy}
                className={itemClass}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    copied ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'
                  }`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                </span>
                <span
                  className={`flex-1 text-sm font-medium ${
                    copied ? 'text-emerald-600' : 'text-slate-700'
                  }`}
                >
                  {copied ? 'Lien copié !' : 'Copier le lien'}
                </span>
              </button>

              {canNativeShare && (
                <button
                  type="button"
                  role="menuitem"
                  data-share-item
                  onClick={handleNativeShare}
                  className={itemClass}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <Share2 className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-slate-700">
                    Autres applications
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
