import { defineField, defineType } from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Galerija',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Stavke galerije',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          fields: [
            defineField({
              name: 'src',
              title: 'Putanja slike',
              description: 'npr. /img/Gallery/27/Gallery-1.webp',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt tekst (za pristupačnost)',
              type: 'string',
              validation: (R) => R.required().min(3),
            }),
            defineField({
              name: 'span',
              title: 'Veličina u grid-u',
              type: 'string',
              options: {
                list: [
                  { title: 'Normalna', value: 'normal' },
                  { title: 'Veliki (prvi)', value: 'big-first' },
                  { title: 'Veliki (drugi)', value: 'big-second' },
                  { title: 'Veliki (treći)', value: 'big-third' },
                ],
                layout: 'radio',
              },
              initialValue: 'normal',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'order',
              title: 'Redosled',
              type: 'number',
              initialValue: 100,
            }),
          ],
          preview: {
            select: { title: 'alt', subtitle: 'src' },
            prepare({ title, subtitle }) {
              return { title: title ?? 'Bez alt teksta', subtitle: subtitle ?? '' }
            },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Galerija' }) },
})
