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

const COLORS = {
  pink: 'var(--color-accent)',
  caramel: 'var(--color-caramel)',
  caramelLight: 'var(--color-caramel-light)',
  primary: 'var(--color-primary-shade)',
  yellow: 'var(--color-ribbon-bg)',
} as const

type ClusterSide = 'left' | 'right'

export function SprinkleCluster({ side }: { side: ClusterSide }) {
  if (side === 'left') {
    return (
      <>
        <SprinkleStick
          className="absolute left-[10%] top-[-1.5rem] h-[0.5rem] w-[1.8rem] animate-float-gentle"
          rotate={-30}
          color={COLORS.pink}
        />
        <SprinkleDot
          className="absolute left-[16%] top-[1rem] h-[0.9rem] w-[0.9rem] animate-float-gentle"
          color={COLORS.caramel}
        />
        <SprinkleStick
          className="absolute left-[22%] top-[2.8rem] h-[0.5rem] w-[1.6rem] animate-float-gentle"
          rotate={40}
          color={COLORS.yellow}
        />
        <SprinkleDot
          className="absolute left-[28%] top-[-0.5rem] h-[0.6rem] w-[0.6rem] animate-float-gentle"
          color={COLORS.primary}
        />
      </>
    )
  }

  return (
    <>
      <SprinkleDot
        className="absolute right-[10%] top-[2rem] h-[0.9rem] w-[0.9rem] animate-float-gentle"
        color={COLORS.pink}
      />
      <SprinkleStick
        className="absolute right-[16%] top-[-1rem] h-[0.5rem] w-[1.8rem] animate-float-gentle"
        rotate={25}
        color={COLORS.caramel}
      />
      <HeartDecor className="absolute right-[22%] top-[2.5rem] h-[1.6rem] w-[1.6rem] animate-float-gentle" />
      <SprinkleStick
        className="absolute right-[28%] top-[0.5rem] h-[0.5rem] w-[1.4rem] animate-float-gentle"
        rotate={-50}
        color={COLORS.yellow}
      />
    </>
  )
}
