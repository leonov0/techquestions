import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedQuestionListLoader() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {[...new Array(3)].map((_, index) => (
        <Skeleton
          key={`featured-question-loader-${index}`}
          className="h-60 rounded-xl"
        />
      ))}
    </ul>
  );
}
