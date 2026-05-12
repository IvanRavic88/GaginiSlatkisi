import type { NextConfig } from 'next'

const FLASK_REDIRECTS = [
  { from: 'Torte', to: 'torte' },
  { from: 'Mus', to: 'mus-kolaci' },
  { from: 'Sitni', to: 'sitni-kolaci' },
  { from: 'Mini', to: 'mini-cheese' },
  { from: 'Lux', to: 'lux-kolaci' },
  { from: 'Casice', to: 'cokoladne-casice' },
  { from: 'Tart', to: 'tart-kolaci' },
  { from: 'Medenjaci', to: 'medenjaci' },
  { from: 'Bombone', to: 'bombone' },
] as const

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''}/**`,
      },
    ],
  },
  async redirects() {
    return [
      ...FLASK_REDIRECTS.map(({ from, to }) => ({
        source: `/section/${from}`,
        destination: `/${to}`,
        permanent: true,
      })),
      { source: '/login', destination: '/', permanent: true },
      { source: '/logout', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
