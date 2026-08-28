'use client'

import React, { useState } from 'react'
import { Share2, Link as LinkIcon, Check, Facebook, MessageSquare, Twitter } from 'lucide-react'
import { LinkedinIcon } from './LinkedinIcon'

interface ShareButtonsProps {
  title: string
  url: string
  theme?: 'dark' | 'light'
}

export default function ShareButtons({ title, url, theme = 'dark' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const isLight = theme === 'light'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {
      console.error('Failed to copy', e)
    }
  }

  const shares = [
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: isLight ? 'hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50' : 'hover:text-blue-400 hover:border-blue-400/50',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: isLight ? 'hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50' : 'hover:text-cyan hover:border-cyan/50',
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: isLight ? 'hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50' : 'hover:text-emerald-400 hover:border-emerald-400/50',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: isLight ? 'hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50' : 'hover:text-blue-500 hover:border-blue-500/50',
    },
  ]

  return (
    <div className={`flex flex-wrap items-center gap-2 ${isLight ? 'border-t border-gray-100 pt-4' : 'border-t border-white/10 pt-4'} my-4`}>
      <span className={`text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 mr-2 ${isLight ? 'text-gray-400' : 'text-gray-400'}`}>
        <Share2 className={`w-3.5 h-3.5 ${isLight ? 'text-cyan-600' : 'text-cyan'}`} /> Partager l&apos;article :
      </span>

      {shares.map((item) => {
        const Icon = item.icon
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Partager sur ${item.name}`}
            className={`p-2 rounded-lg transition-all ${
              isLight
                ? `bg-gray-100 border border-gray-200 text-gray-500 ${item.color}`
                : `bg-white/5 border border-white/10 text-gray-300 ${item.color}`
            }`}
          >
            <Icon className="w-4 h-4" />
          </a>
        )
      })}

      <button
        onClick={handleCopy}
        title="Copier le lien"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          isLight
            ? 'bg-gray-100 border border-gray-200 text-gray-500 hover:border-cyan-300 hover:text-cyan-600'
            : 'bg-white/5 border border-white/10 text-gray-300 hover:border-cyan hover:text-cyan'
        }`}
      >
        {copied ? (
          <>
            <Check className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
            <span className={`font-semibold ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>Lien copié !</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copier le lien</span>
          </>
        )}
      </button>
    </div>
  )
}
