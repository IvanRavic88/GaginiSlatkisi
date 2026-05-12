import { resolve } from 'path'
import { describe, expect, it } from 'vitest'

import { findImageInDir } from './image-finder'

const fixturesDir = resolve(__dirname, '../../static/img')

describe('findImageInDir', () => {
  it('nalazi sliku po tačnom imenu', () => {
    const result = findImageInDir(fixturesDir, 'Gallery-6.png')
    expect(result).not.toBeNull()
    expect(result).toMatch(/Gallery-6\.png$/)
  })

  it('nalazi sliku u nested folderima', () => {
    const result = findImageInDir(fixturesDir, 'Gallery-21.png')
    expect(result).not.toBeNull()
  })

  it('vraća null kad slika ne postoji', () => {
    const result = findImageInDir(fixturesDir, 'NEMA-OVO.png')
    expect(result).toBeNull()
  })

  it('case-insensitive', () => {
    const result = findImageInDir(fixturesDir, 'gallery-6.PNG')
    expect(result).not.toBeNull()
  })
})
