'use client'

import { Button, Container, Heading } from '@/components/ui'

export default function CategoryError({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container as="section" className="py-[9.6rem] text-center">
      <Heading as="h1" variant="secondary">
        Ups, nešto je pošlo po zlu
      </Heading>
      <p className="mt-[1.6rem] text-[1.8rem] text-[var(--color-text-muted)]">
        Probajte ponovo, ili nas direktno kontaktirajte ako problem ne nestane.
      </p>
      <div className="mt-[3.2rem]">
        <Button onClick={reset} variant="full">
          Probaj ponovo
        </Button>
      </div>
    </Container>
  )
}
