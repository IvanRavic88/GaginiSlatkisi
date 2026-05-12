import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fefae0',
          color: '#4a3a1f',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700 }}>GaginiSlatkiši</div>
        <div style={{ marginTop: 24, fontSize: 36, color: '#6f6f6f' }}>
          Domaći kolači i torte • Lazarevac
        </div>
      </div>
    ),
    size,
  )
}
