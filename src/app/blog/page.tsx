import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar, Clock, Sparkles } from 'lucide-react'
import { getPosts } from '@/sanity/lib/data'
import BlogMeshBackground from '@/components/BlogMeshBackground'

export const revalidate = 60

export const metadata = {
  title: 'Blog & Publications | Andy SIWA',
  description: 'Articles techniques, retours d\'expérience et guides sur le génie électrique, la domotique IoT et le développement web.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="blog-light">
      <BlogMeshBackground />

      {/* Hero Section */}
      <div className="blog-hero py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="blog-badge">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Blog & Publications</span>
              </div>
              <div className="blog-badge" style={{ background: 'rgba(99, 102, 241, 0.08)', color: '#6366f1', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>REX & Guides</span>
              </div>
            </div>

            <h1 className="blog-title text-4xl sm:text-5xl md:text-6xl">
              Blog & Articles{' '}
              <span className="blog-gradient-text">Techniques</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Analyses approfondies, retours d&apos;expérience du terrain et guides pratiques sur la{' '}
              <strong className="text-slate-800">sélectivité électrique</strong>, les{' '}
              <strong className="text-slate-800">réseaux HTA/BT</strong>,{' '}
              <strong className="text-slate-800">Modbus/MQTT</strong> et les technologies web modernes.
            </p>

            <div className="flex items-center gap-6 pt-2 text-sm text-slate-500">
              <span className="blog-meta">
                <BookOpen className="w-4 h-4" />
                {posts.length} articles
              </span>
              <span className="blog-meta">
                <Clock className="w-4 h-4" />
                Mis à jour régulièrement
              </span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="blog-deco-dot" style={{ top: '20%', right: '15%' }}></div>
        <div className="blog-deco-dot" style={{ top: '60%', right: '8%', background: '#8b5cf6' }}></div>
        <div className="blog-deco-line" style={{ top: '35%', right: '20%', transform: 'rotate(-15deg)' }}></div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="blog-card flex flex-col group"
            >
              {/* Card Image */}
              <div className="blog-card-img">
                <Image
                  src={post.mainImageUrl || '/img/image_5.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="blog-badge text-[10px] px-2 py-0.5">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Meta row */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                  <span className="blog-meta">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-300"></span>
                  <span className="blog-meta">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-display font-bold text-[15px] text-slate-800 group-hover:text-cyan-600 transition-colors leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="blog-tag text-[10px] px-1.5 py-0">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-slate-700 mb-2">Aucun article pour le moment</h3>
            <p className="text-slate-500 text-sm">Les premiers articles arrivent bientôt.</p>
          </div>
        )}
      </div>
    </div>
  )
}
