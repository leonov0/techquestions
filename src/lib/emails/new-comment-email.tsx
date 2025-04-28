import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface NewCommentEmailProps {
  comment: string;
  questionTitle: string;
  questionUrl: string;
  username: string;
}

export function NewCommentEmail({
  comment,
  questionTitle: postTitle,
  questionUrl: postUrl,
  username,
}: NewCommentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New comment on your question</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Heading>New Comment on Your Question</Heading>
            <Text>Hello {username},</Text>
            <Text>
              You have received a new comment on your question:{" "}
              <Link href={postUrl}>{postTitle}</Link>.
            </Text>
            <Text>Comment:</Text>
            <Text>{comment}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function reactNewCommentEmail(props: NewCommentEmailProps) {
  return <NewCommentEmail {...props} />;
}
