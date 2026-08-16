import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, Tag, User } from 'lucide-react'
import { getPostBySlug, getPosts } from '@/sanity/lib/data'
import ShareButtons from '@/components/ShareButtons'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return {
    title: `${post.title} | Blog Andy SIWA`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Andy SIWA'],
      images: [post.mainImageUrl || '/img/image_5.jpg'],
    },
  }
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Construct absolute URL for social share
  const shareUrl = `https://andysiwa.com/blog/${post.slug.current}`

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Navigation back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au blog</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyan">
          <span className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 uppercase">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-cyan" /> {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <Calendar className="w-3.5 h-3.5 text-cyan" />
            {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 pt-2 text-sm text-gray-300">
          <div className="w-8 h-8 rounded-full bg-cyan flex items-center justify-center text-dark-900 font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-white">Par Andy SIWA</p>
            <p className="text-xs text-gray-400">Ingénieur Électricien & Éditeur</p>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.mainImageUrl && (
        <div className="relative h-80 sm:h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-neon-cyan">
          <Image
            src={post.mainImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Social Share Component */}
      <ShareButtons title={post.title} url={shareUrl} />

      {/* Body Content */}
      <div className="cyber-card p-8 sm:p-10 rounded-2xl space-y-6 text-gray-200 text-base leading-relaxed">
        <p className="text-lg font-medium text-cyan border-l-4 border-cyan pl-4 py-1 bg-cyan/5 rounded-r">
          {post.excerpt}
        </p>

        <p>
          Dans le cadre d&apos;installations électriques complexes ou de systèmes domotiques communicants, la rigueur méthodologique est essentielle. Chaque choix d&apos;appareillage, de section de câble ou de protocole de communication impacte directement la continuité de service et la sécurité des utilisateurs.
        </p>

        <h3 className="font-display text-xl font-bold text-white pt-4">Points clés à retenir</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Analyse préalable des contraintes d&apos;exploitation.</li>
          <li>Validation des calculs conformément à la norme NFC 15-100.</li>
          <li>Mise en œuvre d&apos;une supervision pour anticiper les défaillances.</li>
        </ul>

        <p>
          Ce contenu peut être enrichi et mis à jour en temps réel directement depuis le Studio Sanity.
        </p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-2 pt-4">
          <Tag className="w-4 h-4 text-cyan" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Share */}
      <ShareButtons title={post.title} url={shareUrl} />
    </article>
  )
}
