import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedQuestionListSkeleton() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      <li>
        <Skeleton className="h-60 rounded-xl" />
      </li>
      <li>
        <Skeleton className="h-60 rounded-xl" />
      </li>
      <li>
        <Skeleton className="h-60 rounded-xl" />
      </li>
    </ul>
  );
}
