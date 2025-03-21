import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/features/auth";

import { getRating } from "./actions";
import { VoteButtons } from "./vote-buttons";

export async function Rating({ questionId }: { questionId: string }) {
  const session = await auth();

  const response = await getRating(questionId);

  if (!response.success) {
    toast.error(response.error);
    return null;
  }

  return (
    <VoteButtons
      questionId={questionId}
      isAuthorized={!!session?.user.id}
      rating={response.data.rating}
      currentVote={response.data.currentVote}
    />
  );
}

export function RatingLoader({ rating }: { rating: number }) {
  return (
    <div className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-full">
      <Skeleton className="text-muted-foreground inline-flex size-10 items-center justify-center rounded-full">
        <ChevronUpIcon className="pointer-events-none size-4 shrink-0" />
      </Skeleton>

      <span
        className={
          rating > 0
            ? "text-green-500"
            : rating < 0
              ? "text-red-500"
              : undefined
        }
      >
        {rating}
      </span>

      <Skeleton className="text-muted-foreground inline-flex size-10 items-center justify-center rounded-full">
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0" />
      </Skeleton>
    </div>
  );
}
