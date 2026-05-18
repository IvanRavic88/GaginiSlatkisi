import { createWriteClient } from '@/lib/sanity/write-client-factory'

type CategoryUpdate = {
  slug: string
  tag: string
  homepageImageSrc: string
  homepageImageAlt: string
  attributes: [string, string, string]
  homepageOrder: number
  seoCopy: string
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
    seoCopy:
      'Naručite domaću tortu iz Lazarevca za rođendane, svadbe, krštenja i sve posebne prilike. Spremamo torte od pažljivo odabranih sastojaka, po proverenim receptima — sa filovima koje birate Vi.\n\nSvaka torta se pravi po porudžbini i dogovara unapred. Dostavljamo na području Lazarevca i Beograda. Pošaljite upit i predložićemo ukus, veličinu i dekoraciju u skladu sa Vašim događajem.',
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
    seoCopy:
      'Mus kolači — lagani, kremasti i savršeni za svečane prilike u Lazarevcu i Beogradu. Pripremamo ih u individualnim porcijama, sa filovima koje Vi birate (čokolada, voće, lešnik, vanila).\n\nIdealni za rođendanske proslave, slavlja i kandidat su za posebne dane kada želite nešto rafinirano. Naručuju se pojedinačno, najmanje dva dana unapred.',
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
    seoCopy:
      'Čokoladne čašice su omiljeni lux detalj na svakom slatkom poslužavniku — krem u jestivoj čokoladnoj čašici, ručno rađene u Lazarevcu.\n\nNaručuju se kao deo paketa sa drugim sitnim kolačima ili lux kolačima, za svadbe, korporativne događaje i posebne proslave u Beogradu i okolini.',
  },
  {
    slug: 'sitni-kolaci',
    tag: 'Kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-11.webp',
    homepageImageAlt: 'Slika sitnih kolača, različitih vrsta.',
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se u paketu'],
    homepageOrder: 40,
    seoCopy:
      'Sitni kolači — domaći asortiman raznovrsnih sitnih slatkiša, po kilogramu, idealni za svaku proslavu u Lazarevcu i Beogradu. U paketu kombinujemo različite vrste i ukuse.\n\nSavršeni izbor za rođendane, slave, krštenja, slavlja i poslovne događaje. Naručuju se u paketu, najmanje dva dana unapred.',
  },
  {
    slug: 'mini-cheese',
    tag: 'Kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-26.webp',
    homepageImageAlt: 'Slika mini cheese-a.',
    attributes: ['Različitih ukusa', 'Idealni za sve prilike', 'Naručuju se na kilogram'],
    homepageOrder: 50,
    seoCopy:
      'Mini cheese — domaći mini cheesecake-evi u različitim ukusima (jagoda, šumsko voće, čokolada, klasik). Pripremamo ih ručno u Lazarevcu, sa kremastim filom i mekom koricom.\n\nNaručuju se na kilogram, idealan dodatak slatkom stolu za sve prilike u Lazarevcu i Beogradu.',
  },
  {
    slug: 'lux-kolaci',
    tag: 'Lux kolači',
    homepageImageSrc: '/img/Groups-img/Gallery-103.webp',
    homepageImageAlt: 'Slika Lux kolača.',
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se u paketu'],
    homepageOrder: 60,
    seoCopy:
      'Lux kolači — premium izbor za posebne događaje. Ručno rađeni u Lazarevcu, sa premium sastojcima i pažnjom na svaki detalj.\n\nIdealni za svadbe, godišnjice, korporativne proslave i sve prilike gde želite da napravite vrhunski utisak. Naručuju se u paketu, dogovor i isporuka u Lazarevcu i Beogradu.',
  },
  {
    slug: 'tart-torte',
    tag: 'Torte',
    homepageImageSrc: '/img/Groups-img/Gallery-82.webp',
    homepageImageAlt: 'Slika Tart Torte od čokolade i plazme.',
    attributes: ['Sa kremastim filom', 'Idealni za sve Vaše prilike', 'Naručuju se pojedinačno'],
    homepageOrder: 70,
    seoCopy:
      'Tart torte sa kremastim filom — domaće torte u tart formi, ručno rađene u Lazarevcu. Kombinacija hrskave podloge i bogatog kremastog fila po Vašoj želji (čokolada, plazma, lešnik, voće).\n\nNaručuju se pojedinačno, savršeno za rođendane i sva posebna slavlja u Lazarevcu i Beogradu.',
  },
  {
    slug: 'medenjaci',
    tag: 'Medenjaci',
    homepageImageSrc: '/img/Groups-img/Gallery-60.webp',
    homepageImageAlt: 'Medenjak sa likom Deda Mraza.',
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se pojedinačno'],
    homepageOrder: 80,
    seoCopy:
      'Domaći medenjaci — tradicionalni ukrasni kolači sa medom i začinima, ručno glazirani i dekorisani. Idealni za Božić, Novu godinu, Uskrs, dečije rođendane i kao slatki pokloni.\n\nPripremamo ih u Lazarevcu po porudžbini, sa motivima i porukama po Vašoj želji. Mogu se naručiti pojedinačno ili u paketu.',
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
    seoCopy:
      'Penaste bombone — omiljena dečija poslastica, u obliku medvedića sa srcem, potopljena u kakao i ručno dekorisana. Bezbedne za decu, bez veštačkih boja.\n\nIdealne za dečije rođendane i tematske proslave u Lazarevcu i Beogradu. Naručuju se u paketu, najmanje dva dana unapred.',
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
        seoCopy: update.seoCopy,
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
        seoCopy: update.seoCopy,
      })
      .commit()
    console.log(`✓ ${update.slug} updated`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
