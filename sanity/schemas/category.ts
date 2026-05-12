import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Kategorija',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv',
      type: 'string',
      validation: (R) => R.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'name', maxLength: 60 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Podnaslov',
      type: 'string',
    }),
    defineField({
      name: 'secondaryHeading',
      title: 'Sekundarni naslov',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
      description: 'Manji broj = ranije u meniju',
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: 'Redosled', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'subheading' },
  },
})
