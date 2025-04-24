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
            <Heading>Login with your magic link</Heading>
            <Text>Hello there,</Text>
            <Text>
              You requested a magic link to sign in. Click the button below to
              log in securely.
            </Text>
            <Section>
              <Button href={magicLink}>Login Now</Button>
            </Section>
            <Text>
              Or copy and paste the following link into your browser:{" "}
              <Link href={magicLink}>{magicLink}</Link>
            </Text>
            <Hr />
            <Text>
              If you did not request this email, you can safely ignore it.
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
