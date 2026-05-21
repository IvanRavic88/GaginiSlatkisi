import Link from 'next/link'
import { Container, Heading, Subheading } from '@/components/ui'
import { createSweet, fetchAdminCategories } from '@/app/actions/admin-sweet'
import { SweetForm } from '../components/sweet-form'

export const dynamic = 'force-dynamic'

export default async function NewSweetPage() {
  const categories = await fetchAdminCategories()

  return (
    <Container as="section" className="py-[3.2rem] sm:py-[4.8rem]">
      <div className="mx-auto max-w-[88rem]">
        {/* Breadcrumb */}
        <Link
          href="/admin"
          className="mb-[1.6rem] inline-flex items-center gap-[0.6rem] text-[1.3rem] text-[var(--color-caramel)]/70 transition hover:text-[var(--color-accent)]"
        >
          <span aria-hidden="true">←</span> Nazad na slatkiše
        </Link>

        {/* Header */}
        <div className="mb-[3.2rem]">
          <Subheading className="-rotate-[2deg]">Nova poslastica</Subheading>
          <Heading as="h1" variant="secondary">
            Dodajte nov slatkiš
          </Heading>
          <p className="mt-[1.2rem] max-w-[56rem] text-[1.5rem] leading-[1.55] text-[var(--color-caramel)]/85">
            Popunite naziv, kategoriju, opis i dodajte sliku. Klijenti će ga videti na sajtu
            čim sačuvate.
          </p>
        </div>

        {/* Form card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(184,105,58,0.18)] bg-[#fffaf3] p-[2.4rem] shadow-[0_2rem_4rem_rgba(184,105,58,0.1),_0_0.4rem_1.2rem_rgba(0,0,0,0.04)] sm:p-[3.6rem]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[0.5rem]"
            style={{
              background:
                'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
            }}
          />
          <SweetForm categories={categories} action={createSweet} submitLabel="Sačuvaj slatkiš" />
        </div>
      </div>
    </Container>
  )
}
