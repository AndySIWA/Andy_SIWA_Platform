import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profil & Services',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      initialValue: 'Andy SIWA',
    }),
    defineField({
      name: 'headline',
      title: 'Titre professionnel',
      type: 'string',
      initialValue: 'Ingénieur Électricien & Développeur',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie / Présentation',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'email',
      title: 'Adresse email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone / WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'string',
    }),
    defineField({
      name: 'skills',
      title: 'Compétences clés',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Nom de la compétence' },
            { name: 'level', type: 'number', title: 'Niveau (%)' },
            { name: 'category', type: 'string', title: 'Catégorie' },
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Offres de services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre du service' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Nom de l\'icône Lucide (ex: Zap, Code, Shield, Cpu)' },
          ],
        },
      ],
    }),
  ],
})
