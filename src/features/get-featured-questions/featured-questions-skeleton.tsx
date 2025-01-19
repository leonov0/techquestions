import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedQuestionsSkeleton() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {[...new Array(3)].map((_, index) => (
        <Skeleton
          key={`featured-question-loader-${index}`}
          className="flex h-48 flex-col rounded-xl"
        />
      ))}
    </ul>
  );
}
