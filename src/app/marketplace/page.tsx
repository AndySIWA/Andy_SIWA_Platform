import React from 'react'
import Image from 'next/image'
import { ShoppingBag, CheckCircle, ExternalLink, ShieldCheck, Zap } from 'lucide-react'
import { getProducts } from '@/sanity/lib/data'

export const revalidate = 60

export const metadata = {
  title: 'Marketplace Produit & Outils Digitaux | Andy SIWA',
  description: 'Achetez en ligne mes notes de calcul Excel HTA/BT, guides pratiques domotiques et packs de symboles CAD. Paiement sécurisé via Chariow.',
}

export default async function MarketplacePage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 text-xs font-mono">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Produits Digitaux & Outillage Électrique</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900">
          Marketplace d&apos;Ingénierie
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Accédez directement à mes modèles Excel de bilan de puissance, mes guides de raccordement domotique et mes bibliothèques de schémas CAD. Achat rapide avec paiement sécurisé par <strong className="text-cyan-600">Chariow</strong>.
        </p>
      </div>

      {/* Trust Badges Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Téléchargement Instantané</p>
            <p className="text-slate-500">Accès immédiat après paiement Chariow</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Contenus Conformes NFC</p>
            <p className="text-slate-500">Élaborés par un ingénieur qualifié</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Paiement Sécurisé Chariow</p>
            <p className="text-slate-500">Cartes bancaires, Mobile Money</p>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="blog-card rounded-2xl overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="relative h-52 w-full bg-slate-100">
                <Image
                  src={product.coverImageUrl || '/img/image_4.png'}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono text-cyan-600 uppercase border border-cyan-200">
                  {product.category}
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-emerald-500 text-white font-display font-extrabold text-sm shadow-lg">
                  {product.price}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {product.features && product.features.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-mono text-cyan-600 uppercase tracking-wider">Inclus :</p>
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0 mt-4">
              <a
                href={product.chariowLink}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-read-more w-full text-center flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                <span>Obtenir via Chariow</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
