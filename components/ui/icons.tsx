import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const baseProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 24,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 512 512',
  'aria-hidden': true,
} as const

export function FlameIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M112 320c0-93 124-165 96-272 66 0 192 96 192 272 0 70.69-57.31 128-128 128h-32c-70.69 0-128-57.31-128-128Z" />
      <path d="M320 368c0 59-39.6 80-80 80" />
    </svg>
  )
}

export function RestaurantIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M57.49 47.74S65 357.05 64 432a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16c-1-86-6.59-372.69-6.59-384.69 0-15.34-48-15.34-63.92.43ZM416 32c-29.4 0-48 27.4-48 64s14.21 64 36 64h12v272a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM246.84 33.84a8 8 0 0 0-15.68 0L208 160h-16V40a8 8 0 0 0-16 0v120h-16V40a8 8 0 0 0-16 0v120h-16V40a8 8 0 0 0-16 0v120l-3.4 80-1.8 11.06C90.79 290.42 137.05 320 191.74 320H192v112a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V320h.26c54.69 0 100.95-29.58 95.94-68.94L350.4 240Z" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160Z" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m416 128-192 192-96-96" />
    </svg>
  )
}

export function InfiniteIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M256 256s-48-96-126-96c-54.12 0-98 43-98 96s43.88 96 98 96c30 0 56.45-13.18 78-32M256 256s48 96 126 96c54.12 0 98-43 98-96s-43.88-96-98-96c-29.37 0-56.66 13.75-78 32" />
    </svg>
  )
}

export function NutritionIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M448 273c0 87.21-65.83 175-149.14 175a126.46 126.46 0 0 1-39-6.06 16.07 16.07 0 0 0-9.7 0 126.46 126.46 0 0 1-39 6.06c-83.31 0-149.16-87.79-149.16-175 0-77.4 56.13-129 127.94-129 30.92 0 53.07 10.16 66.62 18.86a16 16 0 0 0 17.27 0c13.55-8.7 35.71-18.86 66.65-18.86 71.83 0 127.52 51.61 127.52 129Z" />
      <path d="M376.59 99.46c-23.21 12.18-46.36 35-46.36 35M256 144l16-48s-6.78-32-40-64M384 64s-32 23-32 64" />
    </svg>
  )
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M161.35 242a16 16 0 0 1 9.55-15.06A176.3 176.3 0 0 1 240 213c44.89 0 82.41 19.92 108 50.79V155.13a16 16 0 0 0-10.34-15c-30.31-11.41-89.85-29.51-159.34-21.66-67.39 7.63-118.91 36.43-153.13 85.6A153.81 153.81 0 0 0 11.05 273c-7.92 32.27-12.92 100.43 11.61 124.92a17.94 17.94 0 0 0 23.43 1.51c12.6-9.91 32.05-18.59 51.27-25.7l28.43-10.42A16 16 0 0 0 134.85 354.86Z" />
    </svg>
  )
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M176 96h16v320h-16zM320 96h16v320h-16z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512 512"
      aria-hidden="true"
      {...props}
    >
      <path d="M349.33 69.33a93.62 93.62 0 0 1 93.34 93.34v186.66a93.62 93.62 0 0 1-93.34 93.34H162.67a93.62 93.62 0 0 1-93.34-93.34V162.67a93.62 93.62 0 0 1 93.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32Z" />
      <path d="M377.33 162.67a28 28 0 1 1 28-28 27.94 27.94 0 0 1-28 28Zm-121.33 22a48 48 0 1 1-48 48 48 48 0 0 1 48-48m0-32a80 80 0 1 0 80 80 80.09 80.09 0 0 0-80-80Z" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512 512"
      aria-hidden="true"
      {...props}
    >
      <path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31Z" />
    </svg>
  )
}
