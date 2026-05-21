import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Image as SanityImageType } from 'sanity'
import { Container, Heading, Subheading } from '@/components/ui'
import { client } from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { fetchAdminCategories, updateSweet } from '@/app/actions/admin-sweet'
import { SweetForm } from '../components/sweet-form'

export const dynamic = 'force-dynamic'

interface SweetDoc {
  _id: string
  name: string
  description: string
  categoryId: string
  image: { asset: { _ref: string }; alt?: string } | null
}

export default async function EditSweetPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [sweet, categories] = await Promise.all([
    client.fetch<SweetDoc | null>(
      `*[_type == "sweet" && _id == $id][0] {
        _id, name, description,
        "categoryId": category->_id,
        image
      }`,
      { id },
    ),
    fetchAdminCategories(),
  ])

  if (!sweet) notFound()

  // Cast to Sanity Image type: fetched shape has only { asset: { _ref }, alt? };
  // urlForImage only needs asset reference at runtime.
  const imageUrl = sweet.image?.asset
    ? urlForImage(sweet.image as unknown as SanityImageType)
        .width(800)
        .height(600)
        .fit('crop')
        .url()
    : null

  const action = updateSweet.bind(null, id)

  return (
    <Container as="section" className="py-[3.2rem] sm:py-[4.8rem]">
      <div className="mx-auto max-w-[88rem]">
        <Link
          href="/admin"
          className="mb-[1.6rem] inline-flex items-center gap-[0.6rem] text-[1.3rem] text-[var(--color-caramel)]/70 transition hover:text-[var(--color-accent)]"
        >
          <span aria-hidden="true">←</span> Nazad na slatkiše
        </Link>

        <div className="mb-[3.2rem]">
          <Subheading className="-rotate-[2deg]">Izmena slatkiša</Subheading>
          <Heading as="h1" variant="secondary" className="break-words [text-wrap:balance]">
            {sweet.name}
          </Heading>
          <p className="mt-[1.2rem] max-w-[56rem] text-[1.5rem] leading-[1.55] text-[var(--color-caramel)]/85">
            Sve promene postaju vidljive na sajtu odmah po snimanju. Sliku ostavite praznu da
            zadržite trenutnu.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(184,105,58,0.18)] bg-[#fffaf3] p-[2.4rem] shadow-[0_2rem_4rem_rgba(184,105,58,0.1),_0_0.4rem_1.2rem_rgba(0,0,0,0.04)] sm:p-[3.6rem]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[0.5rem]"
            style={{
              background:
                'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
            }}
          />
          <SweetForm
            categories={categories}
            initial={{
              name: sweet.name,
              categoryId: sweet.categoryId,
              description: sweet.description,
              imageAlt: sweet.image?.alt ?? '',
              imageUrl,
            }}
            action={action}
            submitLabel="Sačuvaj izmene"
            isEdit
          />
        </div>
      </div>
    </Container>
  )
}
