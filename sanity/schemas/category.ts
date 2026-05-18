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
      name: 'tag',
      title: 'Tag (na home grid kartici)',
      description: 'Kratak tag iznad naslova, npr. "Torte", "Kolači"',
      type: 'string',
    }),
    defineField({
      name: 'homepageImageSrc',
      title: 'Slika za home grid (putanja)',
      description: 'Npr. /img/Groups-img/Gallery-92.webp',
      type: 'string',
    }),
    defineField({
      name: 'homepageImageAlt',
      title: 'Alt tekst slike na home grid-u',
      type: 'string',
    }),
    defineField({
      name: 'attributes',
      title: 'Atributi (tri bullet-a)',
      description: 'Tri kratke linije teksta koje se prikazuju u home kartici',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (R) => R.max(3),
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Prikaži na početnoj strani',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'homepageOrder',
      title: 'Redosled na početnoj strani',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'order',
      title: 'Redosled (legacy)',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Redosled (home)',
      name: 'homepageOrderAsc',
      by: [{ field: 'homepageOrder', direction: 'asc' }],
    },
    { title: 'Redosled (legacy)', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'tag' },
  },
})
