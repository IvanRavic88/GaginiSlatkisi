import { Container, Heading } from '@/components/ui'
import { createSweet, fetchAdminCategories } from '@/app/actions/admin-sweet'
import { SweetForm } from '../components/sweet-form'

export const dynamic = 'force-dynamic'

export default async function NewSweetPage() {
  const categories = await fetchAdminCategories()

  return (
    <Container as="section" className="py-10">
      <Heading as="h1" variant="secondary" className="mb-6">
        Novi slatkiš
      </Heading>
      <div className="mx-auto max-w-2xl">
        <SweetForm
          categories={categories}
          action={createSweet}
          submitLabel="Sačuvaj"
        />
      </div>
    </Container>
  )
}
