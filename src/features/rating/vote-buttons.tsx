"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { vote } from "./actions/vote";

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

      if (!response.success) {
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
    <div className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-full">
      <button
        onClick={handleUpvote}
        className={cn(
          "hover:bg-foreground/10 focus-visible:ring-ring inline-flex size-10 items-center justify-center rounded-full transition-colors focus-visible:ring-1 focus-visible:outline-hidden",
          optimisticRating.currentVote > 0 && "text-green-500",
        )}
      >
        <ChevronUpIcon className="pointer-events-none size-4 shrink-0" />
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
          "hover:bg-foreground/10 focus-visible:ring-ring inline-flex size-10 items-center justify-center rounded-full transition-colors focus-visible:ring-1 focus-visible:outline-hidden",
          optimisticRating.currentVote < 0 && "text-red-500",
        )}
      >
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0" />
      </button>
    </div>
  );
}
