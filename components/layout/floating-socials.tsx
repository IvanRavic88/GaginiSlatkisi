import { FacebookIcon, InstagramIcon } from '@/components/ui/icons'
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

  return (
    <aside
      className="fixed right-[0.1rem] top-1/2 z-[9999] hidden -translate-y-1/2 flex-col rounded-[9px] bg-[var(--color-accent)] p-[0.2rem] opacity-90 md:flex"
      aria-label="Društvene mreže"
    >
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="block max-w-[4rem] p-[0.6rem] text-white"
      >
        <InstagramIcon className="h-full w-full" />
      </a>
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="block max-w-[4rem] p-[0.6rem] text-white"
      >
        <FacebookIcon className="h-full w-full" />
      </a>
    </aside>
  )
}
