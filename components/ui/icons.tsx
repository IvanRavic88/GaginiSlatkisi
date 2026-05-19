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

export function ViberIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Viber"
    >
      <g transform="translate(-30 -74) scale(0.58)">
        <path
          fill="currentColor"
          d="m 85.58,134.21 c -0.82,-0.76 -4.14,-3.17 -11.53,-3.2 0,0 -8.72,-0.53 -13,3.37 -2.37,2.37 -3.2,5.83 -3.29,10.12 -0.09,4.29 -0.2,12.33 7.55,14.51 v 0 3.33 c 0,0 0,1.35 0.84,1.62 1.07,0.34 1.7,-0.69 2.73,-1.79 0.56,-0.61 1.34,-1.5 1.92,-2.18 a 29.82,29.82 0 0 0 9.84,-0.72 c 1.07,-0.35 7.13,-1.12 8.12,-9.17 1.05,-8.29 -0.46,-13.53 -3.18,-15.89 z m 0.9,15.3 c -0.84,6.71 -5.75,7.13 -6.65,7.42 a 27.41,27.41 0 0 1 -8.47,0.73 c 0,0 -3.36,4 -4.41,5.1 a 0.57,0.57 0 0 1 -0.48,0.2 c -0.18,-0.05 -0.23,-0.26 -0.23,-0.57 0,-0.31 0,-5.53 0,-5.53 v 0 c -6.56,-1.83 -6.18,-8.67 -6.1,-12.25 0.08,-3.58 0.75,-6.52 2.75,-8.5 3.59,-3.25 11,-2.77 11,-2.77 6.25,0 9.25,1.91 9.94,2.54 2.33,1.98 3.5,6.7 2.65,13.63 z"
        />
        <path
          fill="currentColor"
          d="m 74.68,149.91 a 1.14,1.14 0 0 0 0.9,-0.34 l 0.62,-0.78 a 1.34,1.34 0 0 1 1.71,-0.23 17.43,17.43 0 0 1 1.54,1 c 0.47,0.35 1.42,1.14 1.42,1.15 a 1.17,1.17 0 0 1 0.25,1.54 v 0 a 6.44,6.44 0 0 1 -1.28,1.58 v 0 a 2.55,2.55 0 0 1 -1.31,0.63 0.56,0.56 0 0 1 -0.19,0 1.75,1.75 0 0 1 -0.55,-0.08 v 0 a 19.51,19.51 0 0 1 -3.58,-1.66 20.94,20.94 0 0 1 -3,-2 15.77,15.77 0 0 1 -1.35,-1.2 v 0 0 0 0 h -0.05 a 17.75,17.75 0 0 1 -1.2,-1.36 21.81,21.81 0 0 1 -2,-3 18.92,18.92 0 0 1 -1.65,-3.58 v 0 a 1.82,1.82 0 0 1 -0.09,-0.56 1,1 0 0 1 0,-0.19 2.49,2.49 0 0 1 0.63,-1.3 v 0 A 6.49,6.49 0 0 1 66.91,138 v 0 a 1.18,1.18 0 0 1 1.55,0.25 c 0,0 0.8,1 1.14,1.42 0.34,0.42 0.76,1.15 1,1.54 a 1.37,1.37 0 0 1 -0.24,1.72 l -0.78,0.61 a 1.16,1.16 0 0 0 -0.34,0.91 8.09,8.09 0 0 0 5.44,5.46 z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m 77.09,144.31 a 2.39,2.39 0 0 0 -2.5,-2.58 M 79.23,145 A 5.24,5.24 0 0 0 77.88,141.17 5.65,5.65 0 0 0 74,139.49 m 7.43,6.4 a 8.45,8.45 0 0 0 -2.37,-6.26 8.08,8.08 0 0 0 -5.84,-2.31"
        />
      </g>
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
