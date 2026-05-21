import Link from 'next/link'
import { Container, Heading, Subheading } from '@/components/ui'
import { client } from '@/lib/sanity/client'
import { requireAdmin } from '@/lib/admin/auth'
import { SweetsList } from './components/sweets-list'

export const dynamic = 'force-dynamic'

interface Row {
  _id: string
  name: string
  image: { asset: { _ref: string }; alt?: string } | null
  categoryName: string | null
}

export default async function AdminDashboard() {
  await requireAdmin()

  const sweets = await client.fetch<Row[]>(`
    *[_type == "sweet"] | order(category->name asc, name asc) {
      _id, name, image, "categoryName": category->name
    }
  `)

  const totalCount = sweets.length
  const categoryCount = new Set(sweets.map((s) => s.categoryName ?? 'Bez kategorije')).size

  return (
    <Container as="section" className="py-[3.2rem] sm:py-[4.8rem]">
      <header className="mb-[3.2rem] flex flex-col gap-[2rem] sm:flex-row sm:items-end sm:justify-between sm:gap-[3.2rem]">
        <div>
          <Subheading className="-rotate-[2deg]">Dobrodošli nazad</Subheading>
          <Heading as="h1" variant="secondary">
            Vaši slatkiši
          </Heading>
          {totalCount > 0 && (
            <p className="mt-[1.2rem] text-[1.45rem] leading-[1.5] text-[var(--color-caramel)]/85">
              <strong className="text-[var(--color-text-dark)]">{totalCount}</strong>{' '}
              {totalCount === 1 ? 'slatkiš' : 'slatkiša'} u{' '}
              <strong className="text-[var(--color-text-dark)]">{categoryCount}</strong>{' '}
              {categoryCount === 1 ? 'kategoriji' : 'kategorija'}.
            </p>
          )}
        </div>

        <Link
          href="/admin/novi"
          className="btn-shine inline-flex items-center justify-center gap-[0.8rem] self-start rounded-full bg-[var(--color-accent)] px-[2.4rem] py-[1.4rem] text-[1.5rem] font-bold text-white shadow-[0_0.4rem_1.4rem_rgba(246,80,160,0.3)] transition-all duration-300 hover:-translate-y-[0.2rem] hover:bg-[var(--color-accent-dark)] hover:shadow-[0_0.8rem_2.2rem_rgba(246,80,160,0.4)] sm:self-end"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.8rem] w-[1.8rem]">
            <path
              d="M12 5v14M5 12h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Dodaj nov slatkiš
        </Link>
      </header>

      {sweets.length === 0 ? <EmptyState /> : <SweetsList sweets={sweets} />}
    </Container>
  )
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(184,105,58,0.18)] bg-[#fffaf3] px-[2.4rem] py-[5.6rem] text-center shadow-[0_2rem_4rem_rgba(184,105,58,0.1)] sm:px-[4.8rem]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[0.5rem]"
        style={{
          background:
            'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
        }}
      />
      <div className="mx-auto mb-[2rem] flex h-[8rem] w-[8rem] items-center justify-center rounded-full bg-[var(--color-primary)]">
        <svg viewBox="0 0 64 64" aria-hidden="true" className="h-[3.6rem] w-[3.6rem] text-[var(--color-accent)]">
          <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M32 20v24M20 32h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <Subheading className="-rotate-[2deg]">Prazna vitrina</Subheading>
      <h2 className="mb-[1.2rem] text-[2.2rem] font-bold text-[var(--color-text-dark)]">
        Još nema slatkiša
      </h2>
      <p className="mx-auto mb-[2.8rem] max-w-[42rem] text-[1.45rem] leading-[1.55] text-[var(--color-caramel)]/85">
        Dodajte prvi slatkiš — popunjavate naziv, kategoriju, opis i sliku. Pojaviće se na
        sajtu čim sačuvate.
      </p>
      <Link
        href="/admin/novi"
        className="btn-shine inline-flex items-center gap-[0.8rem] rounded-full bg-[var(--color-accent)] px-[2.4rem] py-[1.4rem] text-[1.5rem] font-bold text-white shadow-[0_0.4rem_1.4rem_rgba(246,80,160,0.3)] transition-all duration-300 hover:-translate-y-[0.2rem] hover:bg-[var(--color-accent-dark)]"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.8rem] w-[1.8rem]">
          <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        Dodaj prvi slatkiš
      </Link>
    </div>
  )
}
