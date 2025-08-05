import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface MagicLinkEmailProps {
  magicLink: string;
}

export function MagicLinkEmail({ magicLink }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your magic login link</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Heading>Sign in with your magic link</Heading>
            <Text>Hello,</Text>
            <Text>
              We received a request to sign you in. Click the button below to
              access your account securely.
            </Text>
            <Section>
              <Button href={magicLink}>Sign In</Button>
            </Section>
            <Text>
              Or copy and paste the following link into your browser:{" "}
              <Link href={magicLink}>{magicLink}</Link>
            </Text>
            <Hr />
            <Text>
              If you did not request this email, please ignore it. No changes
              will be made to your account.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function reactMagicLinkEmail(props: MagicLinkEmailProps) {
  return <MagicLinkEmail {...props} />;
}
