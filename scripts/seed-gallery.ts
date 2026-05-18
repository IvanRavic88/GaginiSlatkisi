import { createWriteClient } from '@/lib/sanity/write-client-factory'

type Item = { src: string; alt: string; span: string; order: number }

const items: Item[] = [
  {
    src: '/img/Gallery/27/Gallery-1.webp',
    alt: 'Bogato aranžiran poslužavnik sa raznovrsnim slatkišima',
    span: 'big-first',
    order: 10,
  },
  {
    src: '/img/Gallery/27/Gallery-2.webp',
    alt: 'Detalj torte ukrašen jagodama i kremom',
    span: 'normal',
    order: 20,
  },
  {
    src: '/img/Gallery/27/Gallery-5.webp',
    alt: 'Tanjir sa mini kolačima i dekoracijom',
    span: 'normal',
    order: 30,
  },
  {
    src: '/img/Gallery/27/Gallery-6.webp',
    alt: 'Čokoladni slatkiš sa preljevom',
    span: 'normal',
    order: 40,
  },
  {
    src: '/img/Gallery/27/Gallery-7.webp',
    alt: 'Sitni kolači aranžirani u obliku rozete',
    span: 'normal',
    order: 50,
  },
  {
    src: '/img/Gallery/27/Gallery-8.webp',
    alt: 'Bele kupove sa kremom i bobicama',
    span: 'normal',
    order: 60,
  },
  {
    src: '/img/Gallery/27/Gallery-11.webp',
    alt: 'Različite vrste sitnih kolača u jednom paketu',
    span: 'normal',
    order: 70,
  },
  {
    src: '/img/Gallery/27/Gallery-4.webp',
    alt: 'Kolač sa keksom i čokoladnim preljevom',
    span: 'normal',
    order: 80,
  },
  {
    src: '/img/Gallery/27/Gallery-9.webp',
    alt: 'Glaziran kolač sa kandiranim cvećem',
    span: 'normal',
    order: 90,
  },
  {
    src: '/img/Gallery/27/Gallery-10.webp',
    alt: 'Slatki zalogaji prelepo poređani',
    span: 'normal',
    order: 100,
  },
  {
    src: '/img/Gallery/27/Gallery-12.webp',
    alt: 'Lux kolač sa zlatnim detaljima',
    span: 'normal',
    order: 110,
  },
  {
    src: '/img/Gallery/27/Gallery-13.webp',
    alt: 'Penaste bombone u obliku srca',
    span: 'normal',
    order: 120,
  },
  {
    src: '/img/Gallery/27/Gallery-3.webp',
    alt: 'Svadbena torta sa belim preljevom',
    span: 'big-second',
    order: 130,
  },
  {
    src: '/img/Gallery/27/Gallery-14.webp',
    alt: 'Medenjaci sa cvetnom dekoracijom',
    span: 'normal',
    order: 140,
  },
  {
    src: '/img/Gallery/27/Gallery-15.webp',
    alt: 'Čokoladne čašice sa kremom i bobicama',
    span: 'normal',
    order: 150,
  },
  {
    src: '/img/Gallery/27/Gallery-16.webp',
    alt: 'Mini cheese kolači u različitim ukusima',
    span: 'normal',
    order: 160,
  },
  {
    src: '/img/Gallery/27/Gallery-17.webp',
    alt: 'Aranžman raznih torti za proslave',
    span: 'normal',
    order: 170,
  },
  {
    src: '/img/Gallery/27/Gallery-18.webp',
    alt: 'Mus kolač sa glazurom i bobicama',
    span: 'normal',
    order: 180,
  },
  {
    src: '/img/Gallery/27/Gallery-19.webp',
    alt: 'Tart sa svežim voćem',
    span: 'normal',
    order: 190,
  },
  {
    src: '/img/Gallery/27/Gallery-20.webp',
    alt: 'Kolač sa lešnicima i čokoladom',
    span: 'normal',
    order: 200,
  },
  {
    src: '/img/Gallery/27/Gallery-21.webp',
    alt: 'Šareni medenjaci sa motivima',
    span: 'normal',
    order: 210,
  },
  {
    src: '/img/Gallery/27/Gallery-22.webp',
    alt: 'Slatkiši aranžirani za rođendansku proslavu',
    span: 'normal',
    order: 220,
  },
  {
    src: '/img/Gallery/27/Gallery-23.webp',
    alt: 'Penaste bombone u kakaou',
    span: 'normal',
    order: 230,
  },
  {
    src: '/img/Gallery/27/Gallery-24.webp',
    alt: 'Mini torte na poslužavniku',
    span: 'normal',
    order: 240,
  },
  {
    src: '/img/Gallery/27/Gallery-25.webp',
    alt: 'Kolač sa belom čokoladom i jagodama',
    span: 'normal',
    order: 250,
  },
  {
    src: '/img/Gallery/27/Gallery-26.webp',
    alt: 'Sitne tortice sa cvetnom dekoracijom',
    span: 'normal',
    order: 260,
  },
  {
    src: '/img/Gallery/27/Gallery-27.webp',
    alt: 'Velika torta sa elegantnom dekoracijom',
    span: 'big-third',
    order: 270,
  },
]

async function main() {
  const c = createWriteClient()

  const doc = await c.createOrReplace({
    _type: 'gallery',
    _id: 'gallery-singleton',
    items: items.map((it) => ({ _type: 'galleryItem', _key: `g${it.order}`, ...it })),
  })

  console.log(`✓ Galerija seeded sa ${items.length} stavki (id: ${doc._id})`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
