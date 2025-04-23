import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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

  const response = await getQuestion(id);

  if (!response.success) {
    return notFound();
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
    </section>
  );
}

export function QuestionSectionLoader() {
  return (
    <section>
      <Skeleton className="h-9 w-full" />

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-6 w-56" />
      </div>

      {
        <ul className="mt-4 flex flex-wrap gap-2">
          {[...new Array(5)].map((_, index) => (
            <Skeleton key={`badge-skeleton-${index}`} className="h-6 w-16" />
          ))}
        </ul>
      }

      <Skeleton className="mt-4 h-10 w-56" />

      <Separator className="my-8" />

      <Skeleton className="h-64 w-full" />
    </section>
  );
}
