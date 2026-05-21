import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface MagicLinkEmailProps {
  loginUrl: string
}

export default function MagicLinkEmail({ loginUrl }: MagicLinkEmailProps) {
  return (
    <Html lang="sr">
      <Head />
      <Preview>Prijava na admin panel — GaginiSlatkiši</Preview>
      <Body
        style={{
          backgroundColor: '#fefae0',
          color: '#3a2a14',
          fontFamily: 'Poppins, Arial, sans-serif',
          margin: 0,
          padding: '32px 16px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e8d8b8',
            borderRadius: '12px',
            margin: '0 auto',
            maxWidth: '560px',
            padding: '32px',
          }}
        >
          <Heading
            as="h1"
            style={{
              color: '#7a4f1f',
              fontSize: '24px',
              marginTop: 0,
            }}
          >
            Prijava na admin panel
          </Heading>
          <Text style={{ fontSize: '15px', lineHeight: 1.6 }}>
            Pozdrav, kliknite dugme ispod da se prijavite. Link važi 15 minuta i
            može se iskoristiti samo jednom.
          </Text>
          <Section style={{ margin: '28px 0' }}>
            <Button
              href={loginUrl}
              style={{
                backgroundColor: '#f650a0',
                borderRadius: '999px',
                color: '#ffffff',
                display: 'inline-block',
                fontSize: '15px',
                fontWeight: 600,
                padding: '14px 28px',
                textDecoration: 'none',
              }}
            >
              Prijavi se
            </Button>
          </Section>
          <Text style={{ color: '#7a4f1f', fontSize: '13px', lineHeight: 1.5 }}>
            Ako dugme ne radi, otvorite ovaj link u pretraživaču:
            <br />
            <a href={loginUrl} style={{ color: '#b8693a', wordBreak: 'break-all' }}>
              {loginUrl}
            </a>
          </Text>
          <Hr style={{ borderColor: '#e8d8b8', margin: '24px 0' }} />
          <Text style={{ color: '#7a4f1f', fontSize: '12px' }}>
            Ako niste tražili prijavu, ignorišite ovu poruku — niko se ne može
            ulogovati bez klika na ovaj link.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
