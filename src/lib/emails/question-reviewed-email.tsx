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
  Tailwind,
  Text,
} from "@react-email/components";

interface QuestionReviewedEmailProps {
  status: "approved" | "rejected";
  questionUrl: string;
  username: string;
  questionTitle: string;
  comment?: string;
}

export function QuestionReviewedEmail({
  status,
  questionUrl,
  username,
  questionTitle,
  comment,
}: QuestionReviewedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your question has been reviewed - {questionTitle}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Heading>Your question has been reviewed</Heading>
            <Text>Hi {username},</Text>
            <Text>
              Your question <strong>{questionTitle}</strong> has been{" "}
              {status === "approved" ? "approved" : "rejected"}.
            </Text>
            {comment && (
              <Text>
                <strong>Comment from the reviewer:</strong> {comment}
              </Text>
            )}
            <Text>
              {status === "approved"
                ? "You can now view it on our platform."
                : "If you have any questions, please contact us."}
            </Text>
            <Section>
              <Button href={questionUrl}>View your question</Button>
            </Section>
            <Hr />
            <Text>
              If you have any questions, feel free to reply to this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function renderQuestionReviewedEmail(props: QuestionReviewedEmailProps) {
  return <QuestionReviewedEmail {...props} />;
}
