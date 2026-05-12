import { Button, Container, Heading } from '@/components/ui'

export default function NotFound() {
  return (
    <Container as="section" className="py-[9.6rem] text-center">
      <Heading as="h1" variant="primary">
        404
      </Heading>
      <p className="mt-[1.6rem] text-[2rem] text-[var(--color-text-muted)]">
        Stranica koju tražite ne postoji ili je premeštena.
      </p>
      <div className="mt-[3.2rem]">
        <Button href="/" variant="full">
          Nazad na naslovnu
        </Button>
      </div>
    </Container>
  )
}
