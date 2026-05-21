'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  name: string
  existingUrl?: string | null
  required?: boolean
}

export function ImageUploader({ name, existingUrl, required }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingUrl ?? null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setError(null)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Format mora biti JPG, PNG ili WebP.')
      event.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Slika je veća od 5MB.')
      event.target.value = ''
      return
    }
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
    setFileName(file.name)
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-caramel">
        Slika {required ? '*' : '(opciono — ostavite prazno da zadržite postojeću)'}
      </span>
      <div
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-caramel/30 bg-white p-6 transition hover:border-accent"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        role="button"
        tabIndex={0}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Pregled" className="max-h-48 rounded-lg object-contain" />
        ) : (
          <span className="text-sm text-caramel/70">Kliknite da izaberete sliku</span>
        )}
        {fileName && <span className="text-xs text-caramel/60">{fileName}</span>}
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/jpeg,image/png,image/webp"
          onChange={onChange}
          className="hidden"
          required={required && !existingUrl}
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
