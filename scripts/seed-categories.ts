import { createWriteClient } from '@/lib/sanity/write-client-factory'

type CategoryUpdate = {
  slug: string
  tag: string
  homepageImageSrc: string
  homepageImageAlt: string
  attributes: [string, string, string]
  homepageOrder: number
}

const updates: CategoryUpdate[] = [
  {
    slug: 'torte',
    tag: 'Torte',
    homepageImageSrc: '/img/Groups-img/Gallery-92.webp',
    homepageImageAlt: 'Slika čokoladne torte, ukrašena sa jagodama.',
    attributes: [
      'Po proverenim receptima',
      'Idealne za sve Vaše prilike',
      'Mogu se naručiti pojedinačno',
    ],
    homepageOrder: 10,
  },
  {
    slug: 'mus-kolaci',
    tag: 'Kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-81.webp',
    homepageImageAlt: 'Slika prelepo serviranih mus kolača.',
    attributes: [
      'Mogućnost izbora ukusa',
      'Idealni za svečane prilike',
      'Mogu se naručiti pojedinačno',
    ],
    homepageOrder: 20,
  },
  {
    slug: 'cokoladne-casice',
    tag: 'Lux kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-44.webp',
    homepageImageAlt: 'Slika čokoladnih čašica',
    attributes: [
      'Omiljeni slatkiš u čokoladnoj čaši',
      'Idealne za sve Vaše proslave',
      'Ne mogu se naručiti zasebno',
    ],
    homepageOrder: 30,
  },
  {
    slug: 'sitni-kolaci',
    tag: 'Kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-11.webp',
    homepageImageAlt: 'Slika sitnih kolača, različitih vrsta.',
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se u paketu'],
    homepageOrder: 40,
  },
  {
    slug: 'mini-cheese',
    tag: 'Kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-26.webp',
    homepageImageAlt: 'Slika mini cheese-a.',
    attributes: ['Različitih ukusa', 'Idealni za sve prilike', 'Naručuju se na kilogram'],
    homepageOrder: 50,
  },
  {
    slug: 'lux-kolaci',
    tag: 'Lux kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-103.webp',
    homepageImageAlt: 'Slika Lux kolača.',
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se u paketu'],
    homepageOrder: 60,
  },
  {
    slug: 'tart-torte',
    tag: 'Torte',
    homepageImageSrc: '/img/Groups-img/Gallery-82.webp',
    homepageImageAlt: 'Slika Tart Torte od čokolade i plazme.',
    attributes: ['Sa kremastim filom', 'Idealni za sve Vaše prilike', 'Naručuju se pojedinačno'],
    homepageOrder: 70,
  },
  {
    slug: 'medenjaci',
    tag: 'Medenjaci',
    homepageImageSrc: '/img/Groups-img/Gallery-60.webp',
    homepageImageAlt: 'Medenjak sa likom Deda Mraza.',
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se pojedinačno'],
    homepageOrder: 80,
  },
  {
    slug: 'penaste-bombone',
    tag: 'Bombone',
    homepageImageSrc: '/img/Groups-img/Gallery-83.webp',
    homepageImageAlt: 'Slika bombone u obliku mede sa srcem, potopljena u kakao.',
    attributes: [
      'Omiljena dečija poslastica',
      'Idealni za dečije rođendane',
      'Naručuju se u paketu',
    ],
    homepageOrder: 90,
  },
]

const nameBySlug: Record<string, string> = {
  torte: 'Torte',
  'mus-kolaci': 'Mus kolači',
  'cokoladne-casice': 'Čokoladne čašice',
  'sitni-kolaci': 'Sitni kolači',
  'mini-cheese': 'Mini cheese',
  'lux-kolaci': 'Lux kolači',
  'tart-torte': 'Tart Torte',
  medenjaci: 'Medenjaci',
  'penaste-bombone': 'Penaste Bombone',
}

async function main() {
  const c = createWriteClient()

  for (const update of updates) {
    const doc = await c.fetch<{ _id: string } | null>(
      `*[_type == "category" && slug.current == $slug][0]{ _id }`,
      { slug: update.slug },
    )

    if (!doc) {
      await c.create({
        _type: 'category',
        name: nameBySlug[update.slug] ?? update.slug,
        slug: { _type: 'slug', current: update.slug },
        tag: update.tag,
        homepageImageSrc: update.homepageImageSrc,
        homepageImageAlt: update.homepageImageAlt,
        attributes: update.attributes,
        showOnHomepage: true,
        homepageOrder: update.homepageOrder,
        order: update.homepageOrder,
      })
      console.log(`+ ${update.slug} created`)
      continue
    }

    await c
      .patch(doc._id)
      .set({
        tag: update.tag,
        homepageImageSrc: update.homepageImageSrc,
        homepageImageAlt: update.homepageImageAlt,
        attributes: update.attributes,
        showOnHomepage: true,
        homepageOrder: update.homepageOrder,
      })
      .commit()
    console.log(`✓ ${update.slug} updated`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
