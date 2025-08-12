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

interface VerificationEmailProps {
  username: string;
  verifyLink: string;
}

export function VerificationEmail({
  username,
  verifyLink: resetLink,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Heading>Verify your email address</Heading>
            <Text>Hello {username},</Text>
            <Text>
              We received a request to verify your email address. Click the
              button below to complete the verification process.
            </Text>
            <Section>
              <Button href={resetLink}>Verify Email</Button>
            </Section>
            <Text>
              Or copy and paste the following link into your browser:{" "}
              <Link href={resetLink}>{resetLink}</Link>
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

export function reactVerificationEmail(props: VerificationEmailProps) {
  return <VerificationEmail {...props} />;
}
