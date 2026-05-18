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

export function ViberIcon(props: IconProps) {
  return (
    <svg {...fillProps} {...props}>
      <path d="M11.4 0C9.473.044 5.353.354 3.046 2.46 1.33 4.168.726 6.682.66 9.79c-.066 3.108-.142 8.934 5.474 10.517v2.42s-.038.97.6 1.17c.79.25 1.24-.51 1.99-1.3l1.4-1.55c3.83.32 6.78-.42 7.11-.53.77-.25 5.15-.81 5.86-6.61.74-5.98-.36-9.77-2.32-11.48v-.01c-.6-.55-2.99-2.29-8.34-2.31 0 0-.63-.04-1.6-.03zM11.5 2.07c.83 0 1.34.04 1.34.04 4.52.01 6.69 1.37 7.2 1.83 1.66 1.43 2.52 4.84 1.9 9.84-.59 4.85-4.15 5.15-4.8 5.36-.28.09-2.87.74-6.13.52 0 0-2.43 2.94-3.19 3.7-.12.12-.26.17-.35.14-.13-.03-.16-.18-.16-.41l.02-4.03C2.61 17.6 2.88 12.65 2.93 10.05c.07-2.6.55-4.73 2-6.16 1.95-1.75 5.44-2.01 7.08-2.02zm.04 3.3c-.27 0-.27.42 0 .42 2.07 0 3.78.66 5.13 1.98 1.35 1.32 2.04 3.08 2.04 5.27 0 .27.42.27.42 0 0-2.32-.74-4.19-2.18-5.59-1.43-1.4-3.28-2.1-5.41-2.08zm.7 1.65c-.28-.01-.29.4 0 .41 1.36.07 2.45.5 3.27 1.31.83.8 1.27 1.93 1.28 3.4 0 .27.41.27.4 0-.02-1.57-.5-2.83-1.4-3.7-.89-.87-2.1-1.34-3.55-1.42zm.65 1.7c-.28 0-.28.41 0 .42.62.03 1.1.21 1.45.55.34.34.52.84.55 1.47 0 .27.41.27.4 0-.03-.69-.24-1.27-.66-1.69-.42-.42-1.04-.71-1.74-.75zm-3.59.13c-.28-.05-.46.05-.62.23-.06.07-.34.36-.85 1.18-.24.39-.34.86-.18 1.43.13.39.34.78.62 1.17l.02.03c.55.81 1.32 1.49 1.95 1.95.24.18.45.36.65.5.41.32.86.59 1.32.78.04.02.08.04.13.04.18.04.39.07.6.07.49 0 1.05-.16 1.6-.5.04-.03.09-.05.13-.07.11-.05.21-.13.31-.18.55-.31 1.07-.74 1.5-1.2.12-.13.23-.27.31-.4.13-.21.22-.43.27-.66.08-.42-.07-.83-.39-1.16l-1.31-1.18c-.37-.34-.85-.32-1.21-.04-.18.13-.36.27-.55.4-.13.09-.22.13-.37.13-.13 0-.24-.05-.36-.14-.4-.28-.8-.6-1.17-.97-.36-.36-.69-.76-.96-1.16-.09-.13-.13-.24-.13-.36 0-.13.04-.23.13-.36.13-.18.27-.36.4-.55.27-.36.29-.84-.05-1.21l-1.18-1.31c-.21-.21-.46-.34-.74-.36z" />
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
