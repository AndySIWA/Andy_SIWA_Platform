'use client'

import React, { useState } from 'react'
import { Share2, Link as LinkIcon, Check, Facebook, MessageSquare, Twitter } from 'lucide-react'
import { LinkedinIcon } from './LinkedinIcon'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

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
      color: 'hover:text-blue-400 hover:border-blue-400/50',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-cyan hover:border-cyan/50',
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:text-emerald-400 hover:border-emerald-400/50',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-500 hover:border-blue-500/50',
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 my-6">
      <span className="text-xs uppercase font-mono tracking-wider text-gray-400 flex items-center gap-1.5 mr-2">
        <Share2 className="w-3.5 h-3.5 text-cyan" /> Partager l'article :
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
            className={`p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 transition-all ${item.color}`}
          >
            <Icon className="w-4 h-4" />
          </a>
        )
      })}

      <button
        onClick={handleCopy}
        title="Copier le lien"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:border-cyan hover:text-cyan transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Lien copié !</span>
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
