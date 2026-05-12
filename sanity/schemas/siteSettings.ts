import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Postavke sajta',
  type: 'document',
  fields: [
    defineField({
      name: 'contactEmail',
      title: 'Kontakt email',
      type: 'string',
      validation: (R) => R.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'object',
      fields: [
        { name: 'street', title: 'Ulica i broj', type: 'string' },
        { name: 'city', title: 'Grad', type: 'string' },
        { name: 'postalCode', title: 'Poštanski broj', type: 'string' },
        { name: 'country', title: 'Država', type: 'string', initialValue: 'Srbija' },
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Radno vreme',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Dan', type: 'string' },
            { name: 'opens', title: 'Otvaranje (HH:mm)', type: 'string' },
            { name: 'closes', title: 'Zatvaranje (HH:mm)', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Postavke sajta' }),
  },
})
