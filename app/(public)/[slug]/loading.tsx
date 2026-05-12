import { Container } from '@/components/ui'

export default function CategoryLoading() {
  return (
    <Container as="section" className="py-[6.4rem] text-center">
      <div className="mx-auto h-[3rem] w-[20rem] animate-pulse rounded bg-[var(--color-primary-tint)]" />
      <div className="mx-auto mt-[1.6rem] h-[5rem] w-[40rem] animate-pulse rounded bg-[var(--color-primary-tint)]" />
      <div className="mt-[4.8rem] grid grid-cols-1 gap-[3.2rem] sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[36rem] animate-pulse rounded-[var(--radius-default)] bg-[var(--color-primary-tint)]"
          />
        ))}
      </div>
    </Container>
  )
}
