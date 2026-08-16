import React from 'react'
import Link from 'next/link'
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react'
import { getPosts } from '@/sanity/lib/data'

export const revalidate = 60

export const metadata = {
  title: 'Blog & Publications | Andy SIWA',
  description: 'Articles techniques, retours d\'expérience et guides sur le génie électrique, la domotique IoT et le développement web.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Partage de connaissances & REX</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
          Blog & Articles Techniques
        </h1>
        <p className="text-gray-300 text-base leading-relaxed">
          Mes analyses, retours d&apos;expérience du terrain, guides pratiques sur la sélectivité électrique, les réseaux HTA/BT, le Modbus/MQTT et les technologies web modernes.
        </p>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="cyber-card rounded-2xl p-6 flex flex-col justify-between space-y-6 group hover:border-cyan/50 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-cyan">
                <span>{post.category}</span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              </div>

              <h2 className="font-display font-bold text-xl text-white group-hover:text-cyan transition-colors leading-snug">
                <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>

              <Link
                href={`/blog/${post.slug.current}`}
                className="text-xs font-bold text-cyan hover:underline flex items-center gap-1"
              >
                <span>Lire l&apos;article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
