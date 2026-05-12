import { defineQuery } from 'next-sanity'

export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    subheading,
    secondaryHeading,
    order
  }
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    subheading,
    secondaryHeading
  }
`)

export const SWEETS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "sweet" && category->slug.current == $slug] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    order,
    featured
  }
`)

export const FEATURED_SWEETS_QUERY = defineQuery(`
  *[_type == "sweet" && featured == true] | order(order asc) [0...8] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "categorySlug": category->slug.current
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]
`)
