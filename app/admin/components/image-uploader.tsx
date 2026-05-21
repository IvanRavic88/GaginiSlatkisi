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
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function acceptFile(file: File | undefined) {
    if (!file) return
    setError(null)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Format mora biti JPG, PNG ili WebP.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Slika je veća od 5MB.')
      return
    }
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
    setFileName(file.name)
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    acceptFile(file)
    if (!file) return
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (!file) return
    // Sync the file input with dropped file so form submit includes it
    const dt = new DataTransfer()
    dt.items.add(file)
    if (inputRef.current) inputRef.current.files = dt.files
    acceptFile(file)
  }

  function clearPreview(event: React.MouseEvent) {
    event.stopPropagation()
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFileName(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex h-full flex-col gap-[0.6rem]">
      <span className="font-[family-name:var(--font-caveat)] text-[2rem] leading-none text-[var(--color-caramel)]">
        Slika
        {required ? (
          <span className="text-[var(--color-accent)]"> *</span>
        ) : (
          <span className="ml-[0.6rem] font-[family-name:var(--font-poppins)] text-[1.2rem] text-[var(--color-caramel)]/60">
            (opciono — prazno = zadrži postojeću)
          </span>
        )}
      </span>

      <div
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        aria-label="Klikni ili prevuci sliku"
        className={`group relative flex h-full min-h-[24rem] cursor-pointer flex-col items-center justify-center gap-[1rem] overflow-hidden rounded-[1.4rem] border-2 border-dashed bg-white p-[1.2rem] transition-all sm:min-h-[28rem] sm:gap-[1.2rem] sm:p-[1.6rem] lg:min-h-[36rem] ${
          isDragging
            ? 'border-[var(--color-accent)] bg-[var(--color-primary)]/40 shadow-[0_0_0_0.4rem_rgba(246,80,160,0.15)]'
            : 'border-[rgba(184,105,58,0.3)] hover:border-[var(--color-accent)] hover:bg-[var(--color-primary)]/20'
        }`}
      >
        {previewUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Pregled"
              className="max-h-[28rem] max-w-full w-auto rounded-[1rem] object-contain shadow-[0_0.4rem_1.2rem_rgba(0,0,0,0.08)]"
            />
            <button
              type="button"
              onClick={clearPreview}
              className="absolute top-[1rem] right-[1rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full bg-white/95 text-[var(--color-caramel)] shadow-[0_0.3rem_0.8rem_rgba(0,0,0,0.15)] transition hover:bg-[var(--color-accent)] hover:text-white"
              aria-label="Ukloni sliku"
            >
              ✕
            </button>
            {fileName && (
              <span className="rounded-full bg-[var(--color-cream)] px-[1.2rem] py-[0.4rem] text-[1.2rem] text-[var(--color-caramel)]">
                {fileName}
              </span>
            )}
            <span className="text-[1.25rem] text-[var(--color-caramel)]/60">
              Kliknite ili prevucite za drugu sliku
            </span>
          </>
        ) : (
          <>
            <div className="flex h-[6.4rem] w-[6.4rem] items-center justify-center rounded-full bg-[var(--color-primary)]/50 transition group-hover:bg-[var(--color-primary)]">
              <svg
                viewBox="0 0 64 64"
                aria-hidden="true"
                className="h-[3.2rem] w-[3.2rem] text-[var(--color-accent)]"
              >
                <rect
                  x="8"
                  y="14"
                  width="48"
                  height="40"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle cx="22" cy="28" r="4" fill="currentColor" />
                <path
                  d="M10 48 L24 34 L38 46 L46 38 L54 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-caveat)] text-[1.9rem] leading-tight text-[var(--color-caramel)] sm:text-[2.4rem] sm:leading-none">
                Prevucite sliku ovde
              </p>
              <p className="mt-[0.6rem] text-[1.25rem] text-[var(--color-caramel)]/70 sm:text-[1.3rem]">
                ili <span className="text-[var(--color-accent)] underline underline-offset-[0.3rem]">kliknite da izaberete</span>
              </p>
            </div>
            <p className="text-center text-[1.1rem] text-[var(--color-caramel)]/50 sm:text-[1.15rem]">
              JPG, PNG ili WebP • max 5MB
            </p>
          </>
        )}

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
      {error && (
        <p
          role="alert"
          className="rounded-[0.8rem] bg-[#fdecec] px-[1.2rem] py-[0.8rem] text-[1.3rem] text-[#7a2222]"
        >
          {error}
        </p>
      )}
    </div>
  )
}
