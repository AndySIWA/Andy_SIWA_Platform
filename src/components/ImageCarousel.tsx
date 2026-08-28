'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  images: string[]
  alt?: string
  theme?: 'dark' | 'light'
}

export default function ImageCarousel({ images, alt = 'Image de galerie', theme = 'dark' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const goToNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  const isLight = theme === 'light'

  return (
    <div className={`relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden group ${isLight ? 'bg-gray-100' : 'bg-black'}`}>
      {/* Image */}
      <div className="relative w-full h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, i) => (
          <div key={i} className="absolute inset-0 min-w-full h-full">
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={`absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 border ${
              isLight
                ? 'bg-white/80 text-gray-700 border-gray-200 hover:bg-white hover:text-cyan-600 shadow-md'
                : 'bg-black/50 text-white border-white/20 hover:bg-black/80'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 border ${
              isLight
                ? 'bg-white/80 text-gray-700 border-gray-200 hover:bg-white hover:text-cyan-600 shadow-md'
                : 'bg-black/50 text-white border-white/20 hover:bg-black/80'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? isLight ? 'bg-cyan-600 w-7' : 'bg-white w-7'
                    : isLight ? 'bg-gray-400/50 hover:bg-gray-400 w-2.5' : 'bg-white/40 hover:bg-white/70 w-2.5'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
