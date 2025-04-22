import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function VoteButton({
  variant,
  isActive,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant: "upvote" | "downvote";
  isActive: boolean;
}) {
  return (
    <button
      {...props}
      className={cn(
        "hover:bg-foreground/10 focus-visible:ring-ring inline-flex size-10 items-center justify-center rounded-full transition-colors focus-visible:ring-1 focus-visible:outline-hidden",
        isActive && (variant === "upvote" ? "text-green-500" : "text-red-500"),
        className,
      )}
    >
      {variant === "upvote" ? (
        <ChevronUpIcon className="pointer-events-none size-4 shrink-0" />
      ) : (
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0" />
      )}
    </button>
  );
}
