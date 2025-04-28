import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, type NewComment, schema } from "@/database";
import { NewCommentEmail } from "@/lib/emails/new-comment-email";
import { sendEmail } from "@/lib/resend";

const from =
  process.env.FROM_EMAIL || "TechQuestions <noreply@techquestions.works>";

export async function createComment(values: NewComment) {
  revalidateTag("comments");

  await database.insert(schema.comments).values(values);

  const questionAuthors = await database
    .select({
      username: schema.users.username,
      email: schema.users.email,
    })
    .from(schema.questions)
    .innerJoin(schema.users, eq(schema.questions.userId, schema.users.id))
    .where(eq(schema.questions.id, values.questionId))
    .limit(1);

  if (
    questionAuthors.length > 0 &&
    questionAuthors[0].email &&
    questionAuthors[0].username
  ) {
    const questionUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/questions/${values.questionId}`;

    const questions = await database
      .select({
        title: schema.questions.title,
      })
      .from(schema.questions)
      .where(eq(schema.questions.id, values.questionId))
      .limit(1);

    sendEmail({
      from,
      to: questionAuthors[0].email,
      subject: "New comment on your question",
      react: NewCommentEmail({
        comment: values.message,
        questionTitle: questions[0].title,
        questionUrl,
        username: questionAuthors[0].username,
      }),
    });
  }
}
