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

interface ResetPasswordEmailProps {
  username: string;
  resetLink: string;
}

export function ResetPasswordEmail({
  username,
  resetLink,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Heading>Reset your password</Heading>
            <Text>Hi {username},</Text>
            <Text>
              We received a request to reset your password. Click the button
              below to choose a new one.
            </Text>
            <Section>
              <Button href={resetLink}>Reset Password</Button>
            </Section>
            <Text>
              Or copy and paste the following link into your browser:{" "}
              <Link href={resetLink}>{resetLink}</Link>
            </Text>
            <Hr />
            <Text>
              If you did not request a password reset, please ignore this email.
              No changes will be made.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function reactResetPasswordEmail(props: ResetPasswordEmailProps) {
  return <ResetPasswordEmail {...props} />;
}
