import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export type ContactMessageEmailProps = {
  name: string
  email: string
  message: string
  sentAt?: Date
}

export default function ContactMessageEmail({
  name,
  email,
  message,
  sentAt = new Date(),
}: ContactMessageEmailProps) {
  const formattedDate = new Intl.DateTimeFormat('sr-Latn-RS', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Belgrade',
  }).format(sentAt)

  return (
    <Html lang="sr">
      <Head />
      <Preview>{`Nova poruka sa sajta — ${name}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Nova poruka sa sajta</Heading>

          <Section style={metaTable}>
            <Row label="Od" value={name} />
            <Row label="Email" value={email} />
            <Row label="Vreme" value={formattedDate} />
          </Section>

          <Hr style={divider} />

          <Heading as="h2" style={subheading}>
            Poruka
          </Heading>
          <Text style={messageText}>{message}</Text>

          <Hr style={divider} />
          <Text style={footer}>
            Odgovor ide na adresu pošiljaoca (Reply-To je postavljen).
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text style={rowText}>
      <strong style={rowLabel}>{label}:</strong> {value}
    </Text>
  )
}

const body: React.CSSProperties = {
  backgroundColor: '#fefae0',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  margin: 0,
  padding: '24px 0',
}

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  margin: '0 auto',
  maxWidth: '560px',
  padding: '32px',
}

const heading: React.CSSProperties = {
  color: '#7a4f1f',
  fontSize: '22px',
  fontWeight: 700,
  margin: '0 0 24px 0',
}

const subheading: React.CSSProperties = {
  color: '#333333',
  fontSize: '16px',
  fontWeight: 600,
  margin: '24px 0 8px 0',
}

const metaTable: React.CSSProperties = {
  backgroundColor: '#fdf2e9',
  borderLeft: '4px solid #d4a373',
  borderRadius: '6px',
  padding: '12px 16px',
}

const rowText: React.CSSProperties = {
  color: '#333333',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '4px 0',
}

const rowLabel: React.CSSProperties = {
  color: '#7a4f1f',
}

const divider: React.CSSProperties = {
  borderColor: '#fae5d3',
  margin: '24px 0',
}

const messageText: React.CSSProperties = {
  color: '#333333',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: 0,
  whiteSpace: 'pre-wrap',
}

const footer: React.CSSProperties = {
  color: '#6f6f6f',
  fontSize: '12px',
  margin: 0,
  textAlign: 'center',
}
