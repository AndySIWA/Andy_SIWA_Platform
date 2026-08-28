import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { getPosts } from '@/sanity/lib/data'

export const revalidate = 60

export const metadata = {
  title: 'Blog & Publications | Andy SIWA',
  description: 'Articles techniques, retours d\'expérience et guides sur le génie électrique, la domotique IoT et le développement web.',
}

export default async function BlogPage() {
  const posts = await getPosts()
  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,200,200,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-semibold tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Partage de connaissances & REX</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Blog & Articles{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Techniques
              </span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Analyses, retours d&apos;expérience du terrain, guides pratiques sur la sélectivité électrique, les réseaux HTA/BT, le Modbus/MQTT et les technologies web modernes.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Article à la une</span>
          </div>
          <Link href={`/blog/${featured.slug.current}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:border-cyan-200 transition-all duration-300">
              {/* Image */}
              <div className="relative h-72 sm:h-80 lg:h-full min-h-[320px] bg-gray-100 overflow-hidden">
                <Image
                  src={featured.mainImageUrl || '/img/image_5.jpg'}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10 flex flex-col justify-center space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-cyan-600">
                  <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 uppercase tracking-wide">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug group-hover:text-cyan-700 transition-colors">
                  {featured.title}
                </h2>

                <p className="text-gray-500 leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featured.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-500 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.publishedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-sm font-bold text-cyan-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Lire l&apos;article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <article
              key={post._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-cyan-200 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={post.mainImageUrl || '/img/image_4.png'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-cyan-700 border border-cyan-100 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 space-y-3">
                <div className="flex items-center gap-3 text-[11px] font-medium text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <h2 className="font-display font-bold text-lg text-gray-900 leading-snug group-hover:text-cyan-700 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 mt-auto border-t border-gray-100">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-sm font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  >
                    <span>Lire l&apos;article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
