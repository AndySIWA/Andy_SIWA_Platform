'use client'

import React, { useEffect, useRef } from 'react'

interface HtmlArticleRendererProps {
  html: string
}

function scopeStyles(css: string): string {
  return css
    .replace(/\b(body|html)\b/gi, '.html-article-content')
    .replace(/:root\b/gi, '.html-article-content')
}

export default function HtmlArticleRenderer({ html }: HtmlArticleRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Execute scripts if any exist in the injected HTML
    const scripts = Array.from(container.querySelectorAll('script'))
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script')
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value)
      })
      newScript.textContent = oldScript.textContent
      oldScript.parentNode?.replaceChild(newScript, oldScript)
    })
  }, [html])

  const getProcessedHtml = (rawHtml: string) => {
    if (!rawHtml) return ''

    const isFullDoc =
      rawHtml.includes('<html') ||
      rawHtml.includes('<!DOCTYPE') ||
      rawHtml.includes('<body') ||
      rawHtml.includes('<head')

    if (isFullDoc) {
      // Extract <link rel="stylesheet"> tags
      const links = (rawHtml.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).join('\n')

      // Extract and scope <style> tags
      const styleMatches = rawHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []
      const scopedStyles = styleMatches
        .map((tag) => {
          return tag.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, content) => {
            return `<style${attrs}>${scopeStyles(content)}</style>`
          })
        })
        .join('\n')

      // Extract <body> content or fallback to full document
      const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
      const bodyContent = bodyMatch ? bodyMatch[1] : rawHtml

      return `${links}\n${scopedStyles}\n${bodyContent}`
    }

    return rawHtml
  }

  const processedHtml = getProcessedHtml(html)

  return (
    <div
      ref={containerRef}
      className="html-article-content w-full rounded-none overflow-hidden bg-white text-black shadow-2xl transition-all"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  )
}
