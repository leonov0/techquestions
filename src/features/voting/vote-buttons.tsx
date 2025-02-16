"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { vote } from "./actions";

export function VoteButtons({
  questionId,
  rating,
  currentVote,
}: {
  questionId: string;
  rating: number;
  currentVote: number;
}) {
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

  function handleUpvote() {
    setVote(optimisticRating.currentVote > 0 ? 0 : 1);
  }

  function handleDownvote() {
    setVote(optimisticRating.currentVote < 0 ? 0 : -1);
  }

  return (
    <div
      className={
        "flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground"
      }
    >
      <button
        onClick={handleUpvote}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          optimisticRating.currentVote > 0 && "text-green-400",
        )}
      >
        <ChevronUpIcon />
      </button>

      <span>{optimisticRating.rating}</span>

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
