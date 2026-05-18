type SprinkleProps = {
  color?: string
  rotate?: number
  className?: string
}

export function SprinkleDot({ color = 'var(--color-accent)', className = '' }: SprinkleProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ color }}
    >
      <circle cx="6" cy="6" r="3" fill="currentColor" />
    </svg>
  )
}

export function SprinkleStick({
  color = 'var(--color-caramel-light)',
  rotate = -20,
  className = '',
}: SprinkleProps) {
  return (
    <svg
      viewBox="0 0 24 8"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ color, transform: `rotate(${rotate}deg)` }}
    >
      <rect x="0" y="0" width="24" height="8" rx="4" fill="currentColor" />
    </svg>
  )
}

export function HeartDecor({ color = 'var(--color-accent)', className = '' }: SprinkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ color }}
    >
      <path
        d="M12 21s-7-4.5-9-9C1.4 8 4 4 8 4c2 0 3.2 1 4 2.5C12.8 5 14 4 16 4c4 0 6.6 4 5 8-2 4.5-9 9-9 9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}
