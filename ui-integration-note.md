# Mesh Background Integration Note

Added the "Mesh canvas + dots/lines décoratifs" animated background from the Blog page to the other three pages:

## Pages Updated

1. **Réalisations** (`src/app/realisations/page.tsx:14,21`)
   - Added `import MeshBackground from '@/components/MeshBackground'`
   - Added `<MeshBackground />` as first child inside `blog-light` div

2. **Marketplace** (`src/app/marketplace/page.tsx:13,20`)
   - Added `import MeshBackground from '@/components/MeshBackground'`
   - Added `<MeshBackground />` as first child inside `blog-light` div

3. **Idées & Projets** (`src/app/idees/page.tsx:12,31-32`)
   - Changed outer `div` class from `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12` to `blog-light`
   - Added `import MeshBackground from '@/components/MeshBackground'`
   - Added `<MeshBackground />` as first child

## Technical Details

- **`blog-light` class** (`src/app/globals.css:314-319`): Provides `position: relative; min-height: 100vh; color: #1e293b; isolation: isolate;`
- **`MeshBackground` component** (`src/components/MeshBackground.tsx`): Client-side canvas with 50 moving nodes in cyan/indigo/purple colors, creating a mesh network with connections and glowing nodes
- **Z-index stacking**: Canvas at `z-index: 0` appears above the `::before` pseudo-element (`z-index: -1`) but below the content flow inside `blog-light`
- **All 4 pages now have consistent decorative background**: Blog, Réalisations, Marketplace, & Idées & Projets