import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produits Digitaux (Marketplace)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom du produit / Ressource',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description complète',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'price',
      title: 'Prix (ex: 5000 FCFA ou $10)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de présentation',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'chariowLink',
      title: 'Lien d\'achat Chariow',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'category',
      title: 'Type de produit',
      type: 'string',
      options: {
        list: [
          { title: 'Modèle / Template', value: 'template' },
          { title: 'Guide / Ebook', value: 'ebook' },
          { title: 'Schéma / Plan Électrique', value: 'schema' },
          { title: 'Code / Script', value: 'script' },
          { title: 'Formation / Tutoriel', value: 'course' },
        ],
      },
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités & avantages',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant sur la Marketplace',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
