import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CommentForm,
  CommentList,
  getCommentsByQuestionId,
} from "@/features/comments";
import { getQuestion } from "@/features/questions";
import { Rating, RatingSkeleton } from "@/features/rating";
import { getCapitalizedFirstLetter } from "@/lib/utils";

import { CategoryList } from "./category-list";

export async function QuestionSection({
  params,
  className,
}: {
  params: Promise<{ id: string }>;
  className?: string;
}) {
  const { id } = await params;

  const [response, getCommentsResponse] = await Promise.all([
    getQuestion(id),
    getCommentsByQuestionId(id),
  ]);

  if (!response.success) {
    return notFound();
  }

  if (response.data.isAnonymous) {
    response.data.author = null;
  }

  return (
    <section className={className}>
      <h1 className="text-3xl font-bold">{response.data.title}</h1>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <p>
          <span className="text-muted-foreground">Asked </span>

          <time dateTime={response.data.createdAt.toString()}>
            {response.data.createdAt.toLocaleString()}
          </time>
        </p>

        <p>
          <span className="text-muted-foreground">Modified </span>

          <time dateTime={response.data.updatedAt.toString()}>
            {response.data.updatedAt.toLocaleString()}
          </time>
        </p>
      </div>

      <CategoryList
        id={response.data.id}
        technologies={response.data.technologies}
        companies={response.data.companies}
        seniorityLevels={response.data.seniorityLevels}
        className="mt-4"
      />

      <div className="mt-4 flex grow gap-4">
        <Suspense fallback={<RatingSkeleton rating={response.data.rating} />}>
          <Rating questionId={response.data.id} />
        </Suspense>

        {response.data.author ? (
          <Link
            href={`/users/${response.data.author.username}`}
            className="group flex gap-2"
          >
            <Avatar className="size-10">
              {response.data.author.image && (
                <AvatarImage src={response.data.author.image} />
              )}

              <AvatarFallback>
                {getCapitalizedFirstLetter(response.data.author.username)}
              </AvatarFallback>
            </Avatar>

            <p className="group-hover:text-primary text-sm transition-colors">
              @{response.data.author.username}
            </p>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Avatar className="size-10">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <p className="text-sm">Anonymous</p>
          </div>
        )}
      </div>

      <Separator className="my-8" />

      <div className="prose dark:prose-invert prose-slate !max-w-full">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {response.data.body}
        </ReactMarkdown>
      </div>

      <div className="mt-16 space-y-8">
        <h3 className="text-2xl font-semibold tracking-tight">Comments</h3>

        <CommentForm questionId={id} />

        {getCommentsResponse.success ? (
          <CommentList comments={getCommentsResponse.data} />
        ) : (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Failed to get comments</AlertTitle>
            <AlertDescription>{getCommentsResponse.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  );
}
