/**
 * Client-side image optimization for admin uploads.
 *
 * Strategy: resize so the longest side fits within MAX_DIMENSION while preserving
 * aspect ratio, then re-encode as WebP (or JPEG fallback) at high quality. The
 * goal is "looks professional" — not aggressive compression. Phone photos
 * (typically 3-8 MB at 4000×3000) drop to ~300-700 KB without visible quality
 * loss, making the Sanity asset upload 5-15× faster.
 *
 * If the source is already small (< MIN_BYTES_TO_COMPRESS) AND its dimensions
 * are within bounds, returns it untouched.
 */

const MAX_DIMENSION = 2400
const QUALITY = 0.88
const MIN_BYTES_TO_COMPRESS = 600 * 1024 // 600 KB

interface CompressResult {
  blob: Blob
  file: File
  ratio: number
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Slika nije validna ili je oštećena.'))
    img.src = src
  })
}

function supportsWebP(): boolean {
  if (typeof document === 'undefined') return false
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  return canvas.toDataURL('image/webp').startsWith('data:image/webp')
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Konverzija slike nije uspela.'))),
      mimeType,
      quality,
    )
  })
}

export async function compressImage(file: File): Promise<CompressResult> {
  // Probe dimensions cheaply
  const objectUrl = URL.createObjectURL(file)
  try {
    const img = await loadImage(objectUrl)
    const { width, height } = img

    const longest = Math.max(width, height)
    const needsResize = longest > MAX_DIMENSION
    const needsRecompress = file.size > MIN_BYTES_TO_COMPRESS

    if (!needsResize && !needsRecompress) {
      return { blob: file, file, ratio: 1 }
    }

    const scale = needsResize ? MAX_DIMENSION / longest : 1
    const targetW = Math.round(width * scale)
    const targetH = Math.round(height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = targetW
    canvas.height = targetH
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) throw new Error('Canvas nije dostupan.')

    // High-quality downscale
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, targetW, targetH)
    ctx.drawImage(img, 0, 0, targetW, targetH)

    const outputMime = supportsWebP() ? 'image/webp' : 'image/jpeg'
    const outputExt = outputMime === 'image/webp' ? 'webp' : 'jpg'

    const blob = await canvasToBlob(canvas, outputMime, QUALITY)

    // If compressed version is actually bigger (rare, but possible for already-tiny images),
    // bail and return the original.
    if (blob.size >= file.size) {
      return { blob: file, file, ratio: 1 }
    }

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'slika'
    const compressedFile = new File([blob], `${baseName}.${outputExt}`, {
      type: outputMime,
      lastModified: Date.now(),
    })

    return { blob, file: compressedFile, ratio: blob.size / file.size }
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}
