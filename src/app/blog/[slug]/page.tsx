import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, Tag, User, Share2 } from 'lucide-react'
import { getPostBySlug, getPosts } from '@/sanity/lib/data'
import ShareButtons from '@/components/ShareButtons'
import HtmlArticleRenderer from '@/components/HtmlArticleRenderer'
import ImageCarousel from '@/components/ImageCarousel'
import BlogMeshBackground from '@/components/BlogMeshBackground'

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
    <div className="blog-light">
      <BlogMeshBackground />

      <article className="relative z-10">
        {/* Header Section */}
        <div className="blog-detail-header">
          <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            {/* Back link */}
            <Link href="/blog" className="blog-back mb-8 inline-flex">
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au blog</span>
            </Link>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="blog-badge">{post.category}</span>
              <span className="blog-meta">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="blog-meta">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="blog-title text-3xl sm:text-4xl md:text-5xl mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="blog-author inline-flex">
              <div className="blog-author-avatar">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Par Andy SIWA</p>
                <p className="text-xs text-slate-400">Ingénieur Électricien & Éditeur</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Gallery Carousel */}
        {(() => {
          const validGallery = post.galleryUrls?.filter((url): url is string => !!url) ?? []
          const images = validGallery.length > 0 ? validGallery : [post.mainImageUrl]
          return images.length > 0 ? (
            <ImageCarousel
              images={images as string[]}
              alt={post.title}
            />
          ) : null
        })()}

        {/* Share Bar */}
        <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="blog-share flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Share2 className="w-4 h-4 text-cyan-500" />
              <span className="font-medium">Partager cet article</span>
            </div>
            <ShareButtons title={post.title} url={shareUrl} />
          </div>
        </div>

        {/* Body Content - Edge to Edge */}
        {post.body ? (
          <HtmlArticleRenderer html={post.body} />
        ) : (
          <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 text-slate-700 text-base leading-relaxed shadow-sm">
              <p className="text-lg font-medium text-cyan-600 border-l-4 border-cyan-400 pl-4 py-1 bg-cyan-50 rounded-r">
                {post.excerpt}
              </p>

              <p>
                Dans le cadre d&apos;installations électriques complexes ou de systèmes domotiques communicants, la rigueur méthodologique est essentielle. Chaque choix d&apos;appareillage, de section de câble ou de protocole de communication impacte directement la continuité de service et la sécurité des utilisateurs.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-800 pt-4">Points clés à retenir</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Analyse préalable des contraintes d&apos;exploitation.</li>
                <li>Validation des calculs conformément à la norme NFC 15-100.</li>
                <li>Mise en œuvre d&apos;une supervision pour anticiper les défaillances.</li>
              </ul>

              <p>
                Ce contenu peut être enrichi et mis à jour en temps réel directement depuis le Studio Sanity.
              </p>
            </div>
          </div>
        )}

        {/* Tags & Bottom Share */}
        <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <hr className="blog-divider" />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-cyan-500 shrink-0" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Share */}
          <div className="blog-share flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Share2 className="w-4 h-4 text-cyan-500" />
              <span className="font-medium">Partager cet article</span>
            </div>
            <ShareButtons title={post.title} url={shareUrl} />
          </div>
        </div>
      </article>
    </div>
  )
}
