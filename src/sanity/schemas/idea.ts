import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'idea',
  title: 'Idées & Projets à venir',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'idée / projet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Accroche / Objectif principal',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'details',
      title: 'Explication détaillée',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'status',
      title: 'Avancement du projet',
      type: 'string',
      options: {
        list: [
          { title: '💡 Concept / Réflexion', value: 'concept' },
          { title: '📐 Etudes & Schémas', value: 'study' },
          { title: '🛠️ Prototypage / Dev', value: 'prototype' },
          { title: '🚀 Bientôt disponible', value: 'soon' },
        ],
      },
      initialValue: 'concept',
    }),
    defineField({
      name: 'targetDate',
      title: 'Horizon estimé (ex: Q3 2026)',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Secteurs d\'innovation',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
