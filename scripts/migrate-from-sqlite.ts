import { readFileSync } from 'fs'
import { basename } from 'path'
import slugify from 'slugify'

import { createWriteClient } from '@/lib/sanity/write-client-factory'

import { getAllCategoryDefs, getCategoryForTable } from './lib/category-mapper'
import { findImageInDir } from './lib/image-finder'
import { readAllSweets } from './lib/sqlite-reader'

const writeClient = createWriteClient()

const DB_PATH = 'instance/sweetie_table.db'
const IMAGES_ROOT = 'static/img'

function makeSweetId(table: string, originalId: number): string {
  return `sweet-${table}-${originalId}`
}

function makeCategoryId(slug: string): string {
  return `category-${slug}`
}

async function upsertCategories() {
  console.log('→ Upserting categories...')
  for (const cat of getAllCategoryDefs()) {
    await writeClient.createOrReplace({
      _id: makeCategoryId(cat.slug),
      _type: 'category',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
      subheading: cat.subheading,
      secondaryHeading: cat.secondaryHeading,
      order: cat.order,
    })
    console.log(`  ✓ ${cat.name} (${cat.slug})`)
  }
}

async function uploadImage(filePath: string) {
  const buffer = readFileSync(filePath)
  const asset = await writeClient.assets.upload('image', buffer, {
    filename: basename(filePath),
  })
  return asset._id
}

async function upsertSweets() {
  console.log('→ Reading sweets from SQLite...')
  const rows = readAllSweets(DB_PATH)
  console.log(`  Found ${rows.length} sweets`)

  let success = 0
  let failed = 0

  for (const row of rows) {
    const cat = getCategoryForTable(row.table)
    const imagePath = findImageInDir(IMAGES_ROOT, row.imageFilename)

    if (!imagePath) {
      console.warn(`  ⚠ Image NOT FOUND for ${row.name}: ${row.imageFilename}`)
      failed++
      continue
    }

    try {
      const assetId = await uploadImage(imagePath)
      const slug = slugify(row.name, { lower: true, locale: 'sr', strict: true })

      await writeClient.createOrReplace({
        _id: makeSweetId(row.table, row.originalId),
        _type: 'sweet',
        name: row.name,
        slug: { _type: 'slug', current: slug },
        category: { _type: 'reference', _ref: makeCategoryId(cat.slug) },
        description: row.description,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
          alt: row.name,
        },
        order: row.originalId * 10,
        featured: false,
      })
      console.log(`  ✓ ${row.name} → ${cat.slug}`)
      success++
    } catch (err) {
      console.error(`  ✗ ${row.name}:`, err)
      failed++
    }
  }

  console.log(`\nMigration done. Success: ${success}, Failed: ${failed}`)
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error('SANITY_API_WRITE_TOKEN missing. Set in .env.local')
  }
  await upsertCategories()
  await upsertSweets()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
