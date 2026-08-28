import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, Tag, User, Share2 } from 'lucide-react'
import { getPostBySlug, getPosts } from '@/sanity/lib/data'
import ShareButtons from '@/components/ShareButtons'
import HtmlArticleRenderer from '@/components/HtmlArticleRenderer'
import ImageCarousel from '@/components/ImageCarousel'

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

  const shareUrl = `https://andysiwa.com/blog/${post.slug.current}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au blog</span>
          </Link>
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-3xl space-y-5">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 uppercase tracking-wide">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Andy SIWA</p>
                <p className="text-xs text-gray-400">Ingénieur Électricien & Éditeur</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Carousel */}
      {(() => {
        const validGallery = post.galleryUrls?.filter((url): url is string => !!url) ?? []
        const images = validGallery.length > 0 ? validGallery : [post.mainImageUrl]
        return images.length > 0 ? (
          <ImageCarousel
            images={images as string[]}
            alt={post.title}
            theme="light"
          />
        ) : null
      })()}

      {/* Share Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ShareButtons title={post.title} url={shareUrl} theme="light" />
        </div>
      </div>

      {/* Body Content */}
      {post.body ? (
        <HtmlArticleRenderer html={post.body} />
      ) : (
        <div className="bg-white">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 space-y-6 text-gray-700 text-base leading-relaxed">
              <p className="text-lg font-medium text-cyan-700 border-l-4 border-cyan-500 pl-5 py-2 bg-cyan-50 rounded-r-lg">
                {post.excerpt}
              </p>

              <p>
                Dans le cadre d&apos;installations électriques complexes ou de systèmes domotiques communicants, la rigueur méthodologique est essentielle. Chaque choix d&apos;appareillage, de section de câble ou de protocole de communication impacte directement la continuité de service et la sécurité des utilisateurs.
              </p>

              <h3 className="font-display text-xl font-bold text-gray-900 pt-4">Points clés à retenir</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Analyse préalable des contraintes d&apos;exploitation.</li>
                <li>Validation des calculs conformément à la norme NFC 15-100.</li>
                <li>Mise en œuvre d&apos;une supervision pour anticiper les défaillances.</li>
              </ul>

              <p>
                Ce contenu peut être enrichi et mis à jour en temps réel directement depuis le Studio Sanity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tags & Bottom Share */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-300" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Share */}
          <ShareButtons title={post.title} url={shareUrl} theme="light" />
        </div>
      </div>
    </div>
  )
}
