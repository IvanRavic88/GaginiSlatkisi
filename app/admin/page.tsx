import Link from 'next/link'
import type { Image as SanityImageType } from 'sanity'
import { Container, Heading } from '@/components/ui'
import { client } from '@/lib/sanity/client'
import { requireAdmin } from '@/lib/admin/auth'
import { SweetCard } from './components/sweet-card'

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

  const grouped = new Map<string, Row[]>()
  for (const s of sweets) {
    const key = s.categoryName ?? 'Bez kategorije'
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(s)
  }

  return (
    <Container as="section" className="py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Heading as="h1" variant="secondary">
          Slatkiši
        </Heading>
        <Link
          href="/admin/novi"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-accent/90"
        >
          + Dodaj nov
        </Link>
      </div>

      {sweets.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-caramel">
          Nema slatkiša. Dodajte prvi klikom na „Dodaj nov&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {[...grouped.entries()].map(([categoryName, rows]) => (
            <section key={categoryName}>
              <h2 className="mb-3 text-lg font-semibold text-caramel">
                {categoryName}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {rows.map((s) => (
                  <SweetCard
                    key={s._id}
                    id={s._id}
                    name={s.name}
                    image={
                      s.image as unknown as
                        | (SanityImageType & { alt?: string })
                        | null
                    }
                    imageAlt={s.image?.alt ?? s.name}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Container>
  )
}
