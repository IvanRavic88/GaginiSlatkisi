import { DatabaseSync } from 'node:sqlite'

export interface SweetRow {
  table: string
  originalId: number
  name: string
  description: string
  imageFilename: string
}

const TABLES = ['torte', 'mus', 'sitni', 'mini', 'lux', 'casice', 'tart', 'medenjaci', 'bombone']

interface SweetRecord {
  id: number
  sweetie_name: string
  description_text: string
  sweetie_img: string
}

export function readAllSweets(dbPath: string): SweetRow[] {
  const db = new DatabaseSync(dbPath, { readOnly: true })
  const rows: SweetRow[] = []

  for (const table of TABLES) {
    const stmt = db.prepare(
      `SELECT id, sweetie_name, description_text, sweetie_img FROM "${table}"`,
    )
    const results = stmt.all() as unknown as SweetRecord[]
    for (const r of results) {
      rows.push({
        table,
        originalId: r.id,
        name: r.sweetie_name,
        description: r.description_text,
        imageFilename: r.sweetie_img,
      })
    }
  }

  db.close()
  return rows
}
