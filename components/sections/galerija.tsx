import Image from 'next/image'

type GalleryItem = {
  num: number
  alt: string
  span?: 'big-first' | 'big-second' | 'big-third'
}

const ITEMS: GalleryItem[] = [
  { num: 1, alt: 'Bogato aranžiran poslužavnik sa raznovrsnim slatkišima', span: 'big-first' },
  { num: 2, alt: 'Detalj torte ukrašen jagodama i kremom' },
  { num: 5, alt: 'Tanjir sa mini kolačima i dekoracijom' },
  { num: 6, alt: 'Čokoladni slatkiš sa preljevom' },
  { num: 7, alt: 'Sitni kolači aranžirani u obliku rozete' },
  { num: 8, alt: 'Bele kupove sa kremom i bobicama' },
  { num: 11, alt: 'Različite vrste sitnih kolača u jednom paketu' },
  { num: 4, alt: 'Kolač sa keksom i čokoladnim preljevom' },
  { num: 9, alt: 'Glaziran kolač sa kandiranim cvećem' },
  { num: 10, alt: 'Slatki zalogaji prelepo poređani' },
  { num: 12, alt: 'Lux kolač sa zlatnim detaljima' },
  { num: 13, alt: 'Penaste bombone u obliku srca' },
  { num: 3, alt: 'Svadbena torta sa belim preljevom', span: 'big-second' },
  { num: 14, alt: 'Medenjaci sa cvetnom dekoracijom' },
  { num: 15, alt: 'Čokoladne čašice sa kremom i bobicama' },
  { num: 16, alt: 'Mini cheese kolači u različitim ukusima' },
  { num: 17, alt: 'Aranžman raznih torti za proslave' },
  { num: 18, alt: 'Mus kolač sa glazurom i bobicama' },
  { num: 19, alt: 'Tart sa svežim voćem' },
  { num: 20, alt: 'Kolač sa lešnicima i čokoladom' },
  { num: 21, alt: 'Šareni medenjaci sa motivima' },
  { num: 22, alt: 'Slatkiši aranžirani za rođendansku proslavu' },
  { num: 23, alt: 'Penaste bombone u kakaou' },
  { num: 24, alt: 'Mini torte na poslužavniku' },
  { num: 25, alt: 'Kolač sa belom čokoladom i jagodama' },
  { num: 26, alt: 'Sitne tortice sa cvetnom dekoracijom' },
  { num: 27, alt: 'Velika torta sa elegantnom dekoracijom', span: 'big-third' },
]

const spanClass: Record<NonNullable<GalleryItem['span']>, string> = {
  'big-first': 'md:col-[2/4] md:row-[1/3]',
  'big-second': 'md:col-[5/7] md:row-[2/4]',
  'big-third': 'md:col-[3/5] md:row-[3/5] lg:col-[5/7]',
}

export function Galerija() {
  return (
    <section
      id="galerija"
      className="bg-[var(--color-primary)] px-[3.2rem] py-[9.6rem]"
    >
      <div className="grid grid-cols-2 gap-[1rem] sm:grid-cols-3 md:auto-rows-[16vw] md:grid-cols-6 lg:auto-rows-[12vw] lg:grid-cols-9">
        {ITEMS.map((item) => (
          <figure
            key={item.num}
            className={[
              'relative aspect-square overflow-hidden md:aspect-auto',
              item.span ? spanClass[item.span] : '',
            ].join(' ')}
          >
            <Image
              src={`/img/Gallery/27/Gallery-${item.num}.png`}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 33vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-400 hover:scale-110"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
