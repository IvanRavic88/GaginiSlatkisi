import { defineField, defineType } from 'sanity'

export const sweet = defineType({
  name: 'sweet',
  title: 'Slatkiš',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv',
      type: 'string',
      validation: (R) => R.required().min(2).max(150),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'name', maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 4,
      validation: (R) => R.required().min(10),
    }),
    defineField({
      name: 'image',
      title: 'Slika',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt tekst (za pristupačnost)',
          type: 'string',
          validation: (R) => R.required(),
        }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Redosled u kategoriji',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuti na početnoj',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Redosled', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Po nazivu', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'image',
    },
  },
})
