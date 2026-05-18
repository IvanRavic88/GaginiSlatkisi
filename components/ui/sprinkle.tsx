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
          className="animate-float-gentle absolute top-[-1.5rem] left-[10%] h-[0.5rem] w-[1.8rem]"
          rotate={-30}
          color={COLORS.pink}
        />
        <SprinkleDot
          className="animate-float-gentle absolute top-[1rem] left-[16%] h-[0.9rem] w-[0.9rem]"
          color={COLORS.caramel}
        />
        <SprinkleStick
          className="animate-float-gentle absolute top-[2.8rem] left-[22%] h-[0.5rem] w-[1.6rem]"
          rotate={40}
          color={COLORS.yellow}
        />
        <SprinkleDot
          className="animate-float-gentle absolute top-[-0.5rem] left-[28%] h-[0.6rem] w-[0.6rem]"
          color={COLORS.primary}
        />
      </>
    )
  }

  return (
    <>
      <SprinkleDot
        className="animate-float-gentle absolute top-[2rem] right-[10%] h-[0.9rem] w-[0.9rem]"
        color={COLORS.pink}
      />
      <SprinkleStick
        className="animate-float-gentle absolute top-[-1rem] right-[16%] h-[0.5rem] w-[1.8rem]"
        rotate={25}
        color={COLORS.caramel}
      />
      <HeartDecor className="animate-float-gentle absolute top-[2.5rem] right-[22%] h-[1.6rem] w-[1.6rem]" />
      <SprinkleStick
        className="animate-float-gentle absolute top-[0.5rem] right-[28%] h-[0.5rem] w-[1.4rem]"
        rotate={-50}
        color={COLORS.yellow}
      />
    </>
  )
}
