import { Button, Container, Heading } from '@/components/ui'

export default function CategoryNotFound() {
  return (
    <Container as="section" className="py-[9.6rem] text-center">
      <Heading as="h1" variant="secondary">
        Kategorija ne postoji
      </Heading>
      <p className="mt-[1.6rem] text-[1.8rem] text-[var(--color-text-muted)]">
        Možda je premeštena. Vratite se na naslovnu i odaberite kategoriju iz ponude.
      </p>
      <div className="mt-[3.2rem]">
        <Button href="/" variant="full">
          Pogledaj kategorije
        </Button>
      </div>
    </Container>
  )
}
