import { Skeleton } from "@/components/ui/skeleton";

export function QuestionListSkeleton() {
  return (
    <ul className="space-y-4">
      {[...Array(10)].map((_, index) => (
        <li
          key={`question-loader-${index}`}
          className="border-t pt-4 first:border-none first:pt-0"
        >
          <Skeleton className="h-40" />
        </li>
      ))}

      <Skeleton className="mx-auto h-9 max-w-[19rem] lg:col-span-2 xl:col-span-3" />
    </ul>
  );
}
