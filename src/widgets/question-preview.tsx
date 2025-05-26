import { UserAvatar } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { Suspense } from "react";

import type { Question } from "@/features/questions";
import { Rating, RatingSkeleton } from "@/features/rating";
import { cn } from "@/lib/utils";

import { CategoryList } from "./category-list";

export async function QuestionPreview({
  id,
  title,
  body,
  technologies,
  companies,
  seniorityLevels,
  rating,
  author,
  createdAt,
  updatedAt,
  className,
}: Question & {
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h3>
        <Link
          href={`/questions/${id}`}
          className="text-primary line-clamp-1 text-lg font-medium underline-offset-4 hover:underline"
        >
          {title}
        </Link>
      </h3>

      <p className="line-clamp-2 text-sm">{body}</p>

      <CategoryList
        id={id}
        technologies={technologies}
        companies={companies}
        seniorityLevels={seniorityLevels}
        className="mt-4 grow"
      />

      <div className="mt-4 flex gap-4">
        <Suspense fallback={<RatingSkeleton rating={rating} />}>
          <Rating questionId={id} />
        </Suspense>

        {author ? (
          <Link href={`/users/${author.username}`} className="group flex gap-2">
            <UserAvatar className="size-10" user={author} />

            <div className="text-sm">
              <p className="group-hover:text-primary transition-colors">
                @{author.username}
              </p>

              <p className="text-muted-foreground">
                {updatedAt.toLocaleDateString("en-GB")}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex gap-2">
            <UserAvatar className="size-10" />

            <div className="text-sm">
              <p>Anonymous</p>

              <p className="text-muted-foreground">
                {createdAt.toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
