'use client'

import React, { useEffect, useRef } from 'react'

interface HtmlArticleRendererProps {
  html: string
}

const CONTENT_ROOT = '.html-article-content'

function scopeSelector(selector: string): string {
  return selector
    .split(',')
    .map((part) => {
      const s = part.trim()
      if (!s) return s
      if (s === '*' || s === ':root') return s === '*' ? `${CONTENT_ROOT} *` : CONTENT_ROOT
      if (/^html\s*(?:>\s*)?body\b/i.test(s)) {
        return s.replace(/^html\s*(?:>\s*)?body\b/i, CONTENT_ROOT)
      }
      if (/^html\b/i.test(s) || /^body\b/i.test(s)) {
        return s.replace(/^(html|body)\b/i, CONTENT_ROOT)
      }
      if (s === CONTENT_ROOT || s.startsWith(`${CONTENT_ROOT} `) || s.startsWith(`${CONTENT_ROOT}.`)) {
        return s
      }
      return `${CONTENT_ROOT} ${s}`
    })
    .join(', ')
}

function scopeStyles(css: string): string {
  let result = ''
  let index = 0

  while (index < css.length) {
    const open = css.indexOf('{', index)
    if (open === -1) {
      result += css.slice(index)
      break
    }

    const prelude = css.slice(index, open).trim()
    let depth = 1
    let close = open + 1
    while (close < css.length && depth > 0) {
      if (css[close] === '{') depth++
      else if (css[close] === '}') depth--
      close++
    }
    const body = css.slice(open + 1, close - 1)

    if (!prelude) {
      result += body
    } else if (prelude.startsWith('@')) {
      result += /^@(media|supports|layer|container|scope|document)/i.test(prelude)
        ? `${prelude}{${scopeStyles(body)}}`
        : `${prelude}{${body}}`
    } else {
      result += `${scopeSelector(prelude)}{${body}}`
    }

    index = close
  }

  return result
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

    const scopeStyledTags = (source: string) =>
      source.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, content) => {
        return `<style${attrs}>${scopeStyles(content)}</style>`
      })

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
      const scopedStyles = styleMatches.join('\n')

      // Extract <body> content or fallback to full document
      const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
      const bodyContent = bodyMatch ? bodyMatch[1] : rawHtml

      return `${links}\n${scopeStyledTags(scopedStyles)}\n${bodyContent}`
    }

    return scopeStyledTags(rawHtml)
  }

  const processedHtml = getProcessedHtml(html)

  return (
    <div
      ref={containerRef}
      className="html-article-content w-full rounded-none overflow-hidden bg-white text-black transition-all"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  )
}
