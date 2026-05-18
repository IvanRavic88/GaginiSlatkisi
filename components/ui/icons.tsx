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
      <path d="M11.398.002C9.473.044 5.353.354 3.046 2.46 1.33 4.168.726 6.682.66 9.79c-.066 3.108-.142 8.934 5.474 10.517v2.42s-.038.97.6 1.17c.79.25 1.24-.51 1.99-1.3l1.4-1.55c3.83.32 6.78-.42 7.11-.53.77-.25 5.15-.81 5.86-6.61.74-5.98-.36-9.77-2.32-11.48v-.01c-.6-.55-2.99-2.29-8.34-2.31 0 0-.63-.04-1.6-.03zm.107 2.069c.822-.005 1.327.029 1.327.029 4.529.013 6.699 1.378 7.205 1.835 1.665 1.426 2.518 4.836 1.898 9.838-.594 4.847-4.149 5.153-4.803 5.363-.279.09-2.873.737-6.133.524 0 0-2.43 2.932-3.19 3.695-.118.12-.257.168-.35.144-.13-.033-.166-.187-.165-.412l.022-4.022c-4.754-1.32-4.475-6.276-4.424-8.875.067-2.598.555-4.728 2.005-6.158 1.95-1.751 5.443-2.011 7.082-2.022zm.535 3.32c-.27.001-.27.408 0 .411 2.075.016 3.783.722 5.121 2.04 1.218 1.21 1.815 2.85 1.842 4.916.004.27.405.265.401-.006-.029-2.232-.685-4.022-2.018-5.34-1.333-1.317-3.176-2.011-5.348-2.027zm-3.598.255a1.4 1.4 0 0 0-.815.247v.003c-.704.42-1.34 1.045-1.96 1.844-.598.78-.918 1.572-1.005 2.35-.052.464-.012.927.099 1.385l.004.022c.522 1.51 1.205 2.84 2.06 4.024.85 1.18 1.853 2.21 3.014 3.094l.022.015 1.116.785.022.01c1.16.694 2.275 1.025 3.348 1.024.71 0 1.46-.149 2.183-.469.745-.349 1.408-.819 1.99-1.41l.005-.006c.522-.601.795-1.215.864-1.808.073-.61-.107-1.156-.554-1.546l-1.45-1.04c-.323-.243-.738-.343-1.158-.273l-.022.005c-.42.114-.785.328-1.044.625l-.288.327c-.137.155-.4.144-.575-.052-.43-.486-1.244-1.61-1.572-2.066-.205-.286-.225-.578-.06-.797l.273-.32c.236-.273.434-.638.567-1.05.124-.41.118-.85-.027-1.224l-.794-1.5c-.182-.345-.477-.59-.823-.69l-.06-.014c-.378-.087-.78-.05-1.166.114zm5.288 1.045c-.27.005-.262.406.007.4.768.022 1.405.262 1.922.728.515.466.78 1.108.788 1.94.001.27.402.267.4-.003-.018-.917-.327-1.667-.92-2.246-.595-.58-1.378-.85-2.197-.825zm.617 1.696c-.279-.005-.288.404-.008.408.518.022.876.187 1.142.473.265.286.391.658.385 1.146 0 .27.4.276.4.005.006-.586-.166-1.084-.522-1.466-.357-.382-.857-.575-1.397-.566z" />
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
