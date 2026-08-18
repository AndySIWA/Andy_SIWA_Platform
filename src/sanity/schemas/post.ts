import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Articles du Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
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
      name: 'excerpt',
      title: 'Résumé / Extrait',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture (ex: 5 min)',
      type: 'string',
      initialValue: '5 min',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Génie Électrique', value: 'genie-electrique' },
          { title: 'Développement Web', value: 'web-dev' },
          { title: 'Domotique & IoT', value: 'domotique' },
          { title: 'Systèmes Embarqués', value: 'embarque' },
          { title: 'Carrière & Inno', value: 'carriere' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Code HTML + CSS + JS (page SPA single-file)',
      type: 'text',
      rows: 30,
      description: 'Collez ici le code complet d\'une page web autonome (HTML + CSS + JS dans un seul fichier). Elle sera rendue en plein écran dans l\'article.',
    }),
  ],
})
