import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function RatingLoader({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground">
      <Skeleton className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        <ChevronUpIcon />
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

      <Skeleton className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        <ChevronDownIcon />
      </Skeleton>
    </div>
  );
}
