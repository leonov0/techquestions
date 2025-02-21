"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { vote } from "./actions";

export function VoteButtons({
  questionId,
  rating,
  currentVote,
  isAuthorized,
}: {
  questionId: string;
  rating: number;
  currentVote: number;
  isAuthorized: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [optimisticRating, updateOptimisticRating] = useOptimistic(
    { rating, currentVote },
    (state, newCurrentVote: number) => ({
      rating: state.rating - state.currentVote + newCurrentVote,
      currentVote: newCurrentVote,
    }),
  );

  const [, startTransition] = useTransition();

  function setVote(value: number) {
    startTransition(async () => {
      updateOptimisticRating(value);

      const response = await vote(questionId, value);

      if (response.error) {
        toast.error(response.error);
      }
    });
  }

  const redirectToSignIn = useCallback(() => {
    router.push(
      `/signin?callbackUrl=${encodeURIComponent(pathname + `?${searchParams}`)}`,
    );
  }, [router, pathname, searchParams]);

  function handleUpvote() {
    if (!isAuthorized) {
      redirectToSignIn();
      return;
    }

    setVote(optimisticRating.currentVote > 0 ? 0 : 1);
  }

  function handleDownvote() {
    if (!isAuthorized) {
      redirectToSignIn();
      return;
    }

    setVote(optimisticRating.currentVote < 0 ? 0 : -1);
  }

  return (
    <div className="flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground">
      <button
        onClick={handleUpvote}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          optimisticRating.currentVote > 0 && "text-green-500",
        )}
      >
        <ChevronUpIcon />
      </button>

      <span
        className={
          optimisticRating.rating > 0
            ? "text-green-500"
            : optimisticRating.rating < 0
              ? "text-red-500"
              : undefined
        }
      >
        {optimisticRating.rating}
      </span>

      <button
        onClick={handleDownvote}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          optimisticRating.currentVote < 0 && "text-red-500",
        )}
      >
        <ChevronDownIcon />
      </button>
    </div>
  );
}
