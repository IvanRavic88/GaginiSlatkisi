import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export function findImageInDir(rootDir: string, filename: string): string | null {
  const target = filename.toLowerCase()

  function walk(dir: string): string | null {
    const entries = readdirSync(dir)
    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        const hit = walk(fullPath)
        if (hit) return hit
      } else if (entry.toLowerCase() === target) {
        return fullPath
      }
    }
    return null
  }

  return walk(rootDir)
}
