import { notFound } from 'next/navigation'
import type { Image as SanityImageType } from 'sanity'
import { Container, Heading } from '@/components/ui'
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
        .width(400)
        .height(300)
        .fit('crop')
        .url()
    : null

  const action = updateSweet.bind(null, id)

  return (
    <Container as="section" className="py-10">
      <Heading as="h1" variant="secondary" className="mb-6">
        Edit: {sweet.name}
      </Heading>
      <div className="mx-auto max-w-2xl">
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
    </Container>
  )
}
