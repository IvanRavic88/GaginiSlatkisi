import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const lineProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const

const fillProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const

/* ============================================================
   CATEGORY GRID — atributi proizvoda (slatkisi-grid)
   ============================================================ */

export function FlameIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M12 2.5c3.5 3.5 5.5 6.5 5.5 11.5a5.5 5.5 0 0 1-11 0c0-4.5 2-7.5 5.5-11.5z" />
      <path d="M12 11c1.5 1.5 2 2.5 2 4a2 2 0 0 1-4 0c0-1 .5-2 2-4z" />
    </svg>
  )
}

export function CakeIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M6 11h12l-1.5 9h-9z" />
      <path d="M6 11c0-3.5 2.5-6 6-6s6 2.5 6 6" />
      <circle cx="12" cy="4" r="1" />
    </svg>
  )
}

export function RibbonIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 9 2 2 4-4" />
      <path d="m8.5 13.5-2 7.5L12 19l5.5 2-2-7.5" />
    </svg>
  )
}

/* Back-compat aliase za stari API (RestaurantIcon = cake, StarIcon = ribbon) */
export function RestaurantIcon(props: IconProps) {
  return <CakeIcon {...props} />
}

export function StarIcon(props: IconProps) {
  return <RibbonIcon {...props} />
}

/* ============================================================
   PRICING FEATURES — 4 benefita
   ============================================================ */

/* "Prepustite nama" — sparkle (poseban dodir) */
export function SparkleIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M10 3c0 4 1 5 5 5-4 0-5 1-5 5 0-4-1-5-5-5 4 0 5-1 5-5z" />
      <path d="M18.5 13c0 2 .5 2.5 2.5 2.5-2 0-2.5.5-2.5 2.5 0-2-.5-2.5-2.5-2.5 2 0 2.5-.5 2.5-2.5z" />
    </svg>
  )
}

/* "Vrhunskog kvaliteta" — pšenica (premium sastojci) */
export function WheatIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M12 22V9" />
      <path d="M12 9c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5z" />
      <path d="M12 9c0-2-1.5-3.5-3.5-3.5 0 2 1.5 3.5 3.5 3.5z" />
      <path d="M12 13.5c0-1.8 1.5-3 3.5-3 0 1.8-1.5 3-3.5 3z" />
      <path d="M12 13.5c0-1.8-1.5-3-3.5-3 0 1.8 1.5 3 3.5 3z" />
      <path d="M12 18c0-1.8 1.5-3 3.5-3 0 1.8-1.5 3-3.5 3z" />
      <path d="M12 18c0-1.8-1.5-3-3.5-3 0 1.8 1.5 3 3.5 3z" />
    </svg>
  )
}

/* "Bez brige" — štit sa kvačicom (rok, pouzdanost) */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M12 22c-1-.5-8-4-8-10V5l8-3 8 3v7c0 6-7 9.5-8 10z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  )
}

/* "Šta izabrati?" — chat sa srcem (savet) */
export function ChatHeartIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.5A8 8 0 1 1 21 12z" />
      <path d="M12 15s-3-1.7-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.3-3 4-3 4z" />
    </svg>
  )
}

/* Modernizovani check za listu cena */
export function CheckIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="m5 12 4.5 4.5L20 6" />
    </svg>
  )
}

/* Back-compat aliase */
export function InfiniteIcon(props: IconProps) {
  return <SparkleIcon {...props} />
}

export function NutritionIcon(props: IconProps) {
  return <WheatIcon {...props} />
}

export function LeafIcon(props: IconProps) {
  return <ShieldCheckIcon {...props} />
}

export function PauseIcon(props: IconProps) {
  return <ChatHeartIcon {...props} />
}

/* ============================================================
   KONTAKT / UI
   ============================================================ */

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.99.35 1.95.65 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.86.3 1.82.52 2.81.65A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.75" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

/* ============================================================
   SOCIAL — brand glyphs (filled)
   ============================================================ */

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...fillProps} {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...fillProps} {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06z" />
    </svg>
  )
}
