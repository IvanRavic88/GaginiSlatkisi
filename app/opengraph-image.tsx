import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const imageUrl = new URL(
    '/img/Gallery-65-hero.webp',
    'https://www.gaginislatkisi.com',
  ).toString()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        <img
          src={imageUrl}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(247,141,167,0.85) 0%, rgba(249,175,193,0.55) 50%, rgba(98,32,64,0.85) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: '#fff',
            padding: 40,
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: '-1px',
              textShadow: '0 4px 16px rgba(0,0,0,0.35)',
            }}
          >
            GaginiSlatkiši
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 36,
              fontWeight: 500,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              opacity: 0.95,
            }}
          >
            Domaći kolači i torte • po porudžbini • Lazarevac
          </div>
        </div>
      </div>
    ),
    size,
  )
}
