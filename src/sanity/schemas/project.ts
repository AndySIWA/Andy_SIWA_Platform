import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Réalisations / Projets',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
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
      name: 'summary',
      title: 'Court résumé',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description détaillée',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
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
      name: 'techStack',
      title: 'Technologies / Domaines',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Électrotechnique & Réseaux', value: 'electrotechnique' },
          { title: 'Développement Web & Apps', value: 'web' },
          { title: 'Domotique & IoT', value: 'domotique' },
          { title: 'Ingénierie & Etudes', value: 'ingenierie' },
        ],
      },
    }),
    defineField({
      name: 'demoUrl',
      title: 'Lien de démonstration ou fiche PDF',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'Lien du dépôt Git (si applicable)',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant sur l\'accueil',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
