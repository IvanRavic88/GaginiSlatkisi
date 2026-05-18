import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/ui/icons'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

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
      className="fixed top-1/2 right-[1.6rem] z-[60] hidden -translate-y-1/2 flex-col gap-[1rem] md:flex"
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
