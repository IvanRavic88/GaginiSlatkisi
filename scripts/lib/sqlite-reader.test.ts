import { resolve } from 'path'
import { describe, expect, it } from 'vitest'

import { readAllSweets } from './sqlite-reader'

const dbPath = resolve(__dirname, '../../instance/sweetie_table.db')

describe('readAllSweets', () => {
  it('čita sve slatkiše iz svih tabela', () => {
    const rows = readAllSweets(dbPath)
    expect(rows.length).toBeGreaterThanOrEqual(8)
  })

  it('svaki red ima table, id, name, description, image', () => {
    const rows = readAllSweets(dbPath)
    for (const r of rows) {
      expect(r.table).toBeTypeOf('string')
      expect(r.originalId).toBeTypeOf('number')
      expect(r.name).toBeTypeOf('string')
      expect(r.description).toBeTypeOf('string')
      expect(r.imageFilename).toBeTypeOf('string')
    }
  })

  it('uključuje torte iz fixturea', () => {
    const rows = readAllSweets(dbPath)
    const torte = rows.filter((r) => r.table === 'torte')
    expect(torte.length).toBe(4)
  })
})
