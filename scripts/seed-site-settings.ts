import { createWriteClient } from '@/lib/sanity/write-client-factory'

async function main() {
  const c = createWriteClient()

  await c.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    contactEmail: 'gaginislatkisi@gmail.com',
    phone: '065/5593-678',
    instagramUrl: 'https://instagram.com/gaginislatkisi',
    facebookUrl: 'https://m.facebook.com/Gagini-slatkisi-101539355408806/',
    address: {
      _type: 'object',
      street: '',
      city: 'Lazarevac',
      postalCode: '11550',
      country: 'Srbija',
    },
    openingHours: [
      { _type: 'object', _key: 'mon', day: 'Monday', opens: '09:00', closes: '20:00' },
      { _type: 'object', _key: 'tue', day: 'Tuesday', opens: '09:00', closes: '20:00' },
      { _type: 'object', _key: 'wed', day: 'Wednesday', opens: '09:00', closes: '20:00' },
      { _type: 'object', _key: 'thu', day: 'Thursday', opens: '09:00', closes: '20:00' },
      { _type: 'object', _key: 'fri', day: 'Friday', opens: '09:00', closes: '20:00' },
      { _type: 'object', _key: 'sat', day: 'Saturday', opens: '09:00', closes: '18:00' },
      { _type: 'object', _key: 'sun', day: 'Sunday', opens: '09:00', closes: '14:00' },
    ],
  })

  console.log('✓ siteSettings seeded')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
