import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function RatingSkeleton({ rating }: { rating: number }) {
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
