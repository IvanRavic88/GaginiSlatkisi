import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sadržaj')
    .items([
      S.listItem()
        .title('Postavke sajta')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('category').title('Kategorije'),
      S.documentTypeListItem('sweet').title('Slatkiši'),
    ])
