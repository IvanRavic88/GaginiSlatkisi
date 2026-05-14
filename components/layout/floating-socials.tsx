import { FacebookIcon, InstagramIcon } from '@/components/ui/icons'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}

export async function FloatingSocials() {
  const settings = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })

  const instagram = settings?.instagramUrl ?? 'https://instagram.com/gaginislatkisi'
  const facebook =
    settings?.facebookUrl ?? 'https://m.facebook.com/Gagini-slatkisi-101539355408806/'
  const phone = settings?.phone ?? '065/5593-678'
  const waNumber = phone.replace(/[^0-9]/g, '').replace(/^0/, '381')

  return (
    <aside
      className="fixed right-[1.6rem] top-1/2 z-[60] hidden -translate-y-1/2 flex-col gap-[1rem] md:flex"
      aria-label="Društvene mreže"
    >
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp poruka"
        className="group relative grid h-[4.6rem] w-[4.6rem] place-items-center overflow-hidden rounded-full bg-white text-[#25D366] shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-x-[0.4rem] hover:shadow-[0_8px_22px_rgba(37,211,102,0.45)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#25D366] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <WhatsAppIcon className="relative h-[2.4rem] w-[2.4rem] transition-colors duration-300 group-hover:text-white" />
      </a>

      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="group relative grid h-[4.6rem] w-[4.6rem] place-items-center overflow-hidden rounded-full bg-white text-[var(--color-accent)] shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-x-[0.4rem] hover:shadow-[0_8px_22px_rgba(225,48,108,0.45)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <InstagramIcon className="relative h-[2.4rem] w-[2.4rem] transition-colors duration-300 group-hover:text-white" />
      </a>

      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="group relative grid h-[4.6rem] w-[4.6rem] place-items-center overflow-hidden rounded-full bg-white text-[var(--color-accent)] shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-x-[0.4rem] hover:shadow-[0_8px_22px_rgba(24,119,242,0.45)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#1877f2] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <FacebookIcon className="relative h-[2.4rem] w-[2.4rem] transition-colors duration-300 group-hover:text-white" />
      </a>
    </aside>
  )
}
