# Light UI Theme Skill

Standard UI specifications for all public-facing pages (Blog, Réalisations, Marketplace).
Pages must use `blog-light` wrapper to override the dark `mesh-bg` layout background.

## Required Structure

```tsx
<div className="blog-light">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
    {/* Header + Content */}
  </div>
</div>
```

## Grid

```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5
```

## Card (`.blog-card`)

| Property | Value |
|----------|-------|
| Background | `#ffffff` |
| Border | `1px solid #e2e8f0` |
| Border-radius | `0.75rem` |
| Shadow | `0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.04)` |
| Hover transform | `translateY(-6px)` |
| Hover shadow | `0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(6,182,212,0.1), 0 20px 48px rgba(0,0,0,0.08)` |
| Hover border | `rgba(6,182,212,0.3)` |
| Transition | `all 0.35s cubic-bezier(0.4, 0, 0.2, 1)` |

Card wrapper class: `blog-card rounded-2xl overflow-hidden flex flex-col justify-between group`

## Card Image

| Property | Value |
|----------|-------|
| Height | `h-48` |
| Background | `bg-slate-100` |
| Hover zoom | `group-hover:scale-105 transition-transform duration-300` |

Category badge on image:
```
absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono text-cyan-600 uppercase border border-cyan-200
```

## Card Content

| Property | Value |
|----------|-------|
| Padding | `p-5` |
| Layout | `flex flex-col flex-1` |
| Title | `font-display font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors` |
| Description | `text-sm text-slate-600 leading-relaxed` |
| Tags container | `flex flex-wrap gap-1.5 pt-2 mt-auto` |

## Card Footer

```
p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4
```

## Badge (Category Pill)

```
inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 text-xs font-mono
```

## Tag

```
text-xs px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600
```

## Button (Read More / CTA)

```
inline-flex items-center gap-2 font-bold text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all text-xs
```

## Icon Action Buttons

```
p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-300 transition-colors
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Cyan primary | `#0891b2` | Accent, links, badges |
| Cyan light | `#06b6d4` | Icons, decorative |
| Cyan hover | `#0e7490` | Button hover |
| Slate 900 | `#0f172a` | Titles |
| Slate 600 | `#475569` | Body text |
| Slate 500 | `#64748b` | Meta text |
| Slate 400 | `#94a3b8` | Muted text |
| Slate 200 | `#e2e8f0` | Borders |
| Slate 100 | `#f1f5f9` | Dividers, tag bg |
| Slate 50 | `#f8fafc` | Subtle bg |
| White | `#ffffff` | Card bg |
| Purple | `#8b5cf6` | Secondary accent |

## Hero Section (optional)

```css
.blog-hero {
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(241,245,249,0.95) 50%, rgba(240,253,250,0.9) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(6,182,212,0.15);
}
```

## Animated Background (body level, already in layout)

The dark `mesh-bg` with floating circles is applied globally. The `blog-light` wrapper covers it with a solid `#f1f5f9` background via `::before` pseudo-element. No need to add background animations per page.

## Trust Badges Banner (Marketplace)

```
p-6 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600
```

Icon containers:
- Cyan: `w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600`
- Emerald: `w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600`
- Purple: `w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600`

## Price Badge (Marketplace)

```
absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-emerald-500 text-white font-display font-extrabold text-sm shadow-lg
```

## Features List (Marketplace)

```
space-y-2 pt-2 border-t border-slate-100 mt-auto
```

Feature row:
```
flex items-start gap-2 text-xs text-slate-600
```

Check icon: `w-4 h-4 text-emerald-500 shrink-0 mt-0.5`

## CSS Classes Reference (globals.css)

All classes are prefixed `blog-` and defined in `globals.css`:
- `.blog-light` — page wrapper, white bg
- `.blog-hero` — hero section gradient
- `.blog-card` — card container
- `.blog-card-img` — image wrapper with gradient fade
- `.blog-badge` — category pill
- `.blog-tag` — tag chip
- `.blog-read-more` — CTA link
- `.blog-meta` — date/read time
- `.blog-back` — back navigation
- `.blog-title` — page title
- `.blog-divider` — horizontal rule
