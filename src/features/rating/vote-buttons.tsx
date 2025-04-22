"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { getCurrentVote } from "./actions/get-current-vote";
import { vote } from "./actions/vote";
import { VoteButton } from "./vote-button";

export function VoteButtons({
  questionId,
  rating,
}: {
  questionId: string;
  rating: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const redirectToSignIn = useCallback(() => {
    const query = searchParams.toString();

    const redirectUrl = `/auth/sign-in?redirectTo=${encodeURIComponent(
      `${pathname}${query ? "?" + query : ""}`,
    )}`;

    router.push(redirectUrl);
  }, [router, pathname, searchParams]);

  const [optimisticRating, updateOptimisticRating] = useOptimistic(
    rating,
    (_, optimisticValue: number) => optimisticValue,
  );

  const session = authClient.useSession();

  const [currentVote, setCurrentVote] = useState(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!session) {
      setCurrentVote(0);
      return;
    }

    startTransition(async () => {
      const response = await getCurrentVote(questionId);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      setCurrentVote(response.data);
    });
  }, [questionId, session]);

  function handleVote(voteValue: number) {
    if (session.data === null) {
      redirectToSignIn();
      return;
    }

    const previousValue = currentVote;
    const newValue = previousValue === voteValue ? 0 : voteValue;

    setCurrentVote(newValue);

    startTransition(async () => {
      updateOptimisticRating(optimisticRating - previousValue + newValue);

      const response = await vote(questionId, voteValue);

      if (!response.success) {
        toast.error(response.error);
        setCurrentVote(previousValue);
        return;
      }
    });
  }

  return (
    <div className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-full">
      <VoteButton
        onClick={() => handleVote(1)}
        variant="upvote"
        isActive={currentVote > 0}
        disabled={session.isPending}
      />

      <span
        className={
          optimisticRating > 0
            ? "text-green-500"
            : optimisticRating < 0
              ? "text-red-500"
              : undefined
        }
      >
        {optimisticRating}
      </span>

      <VoteButton
        onClick={() => handleVote(-1)}
        variant="downvote"
        isActive={currentVote < 0}
        disabled={session.isPending}
      />
    </div>
  );
}
