import { createWriteClient } from '@/lib/sanity/write-client-factory'

const LEGACY_SLUGS = ['bombone', 'tart-kolaci']

async function main() {
  const c = createWriteClient()

  for (const slug of LEGACY_SLUGS) {
    const doc = await c.fetch<{ _id: string; name: string | null } | null>(
      `*[_type == "category" && slug.current == $slug][0]{ _id, name }`,
      { slug },
    )
    if (!doc) {
      console.log(`- ${slug}: ne postoji, preskačem`)
      continue
    }
    const refs = await c.fetch<number>(`count(*[references($id)])`, { id: doc._id })
    if (refs > 0) {
      console.warn(
        `✗ ${slug} (${doc.name}): ${refs} dokumenat(a) referenciraju ovu kategoriju — neće biti obrisano`,
      )
      continue
    }
    await c.delete(doc._id)
    console.log(`✓ ${slug} (${doc.name}) obrisana`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
