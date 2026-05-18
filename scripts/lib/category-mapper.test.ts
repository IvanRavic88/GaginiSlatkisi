import { describe, expect, it } from 'vitest'

import { getCategoryForTable } from './category-mapper'

describe('getCategoryForTable', () => {
  it('mapira torte → torte slug', () => {
    const cat = getCategoryForTable('torte')
    expect(cat.slug).toBe('torte')
    expect(cat.name).toBe('Torte')
    expect(cat.subheading).toBe('Torte')
  })

  it('mapira casice → cokoladne-casice slug', () => {
    const cat = getCategoryForTable('casice')
    expect(cat.slug).toBe('cokoladne-casice')
  })

  it('mapira mus → mus-kolaci slug', () => {
    const cat = getCategoryForTable('mus')
    expect(cat.slug).toBe('mus-kolaci')
  })

  it('baca grešku za nepoznatu tabelu', () => {
    expect(() => getCategoryForTable('nepostojeca')).toThrow(/Unknown table/)
  })

  it('pokriva svih 9 kategorija', () => {
    const tables = [
      'torte',
      'mus',
      'sitni',
      'mini',
      'lux',
      'casice',
      'tart',
      'medenjaci',
      'bombone',
    ]
    const slugs = tables.map((t) => getCategoryForTable(t).slug)
    expect(new Set(slugs).size).toBe(9)
  })
})
