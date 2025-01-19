import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <Skeleton className="h-9 w-full" />

      <div className="mt-4 grid flex-1 gap-x-4 gap-y-1 md:grid-cols-[auto,_1fr,_auto]">
        <Skeleton className="h-6 w-56" />

        <Skeleton className="h-6 w-56" />

        <Skeleton className="row-span-2 mt-2 flex h-[3.375rem] w-48 gap-2 rounded-md px-3 py-1.5 md:mt-0" />

        {
          <ul className="row-start-3 mt-2 flex flex-wrap gap-x-2 gap-y-1 md:col-span-2 md:row-start-2">
            {[...new Array(5)].map((_, index) => (
              <Skeleton
                key={`badge-skeleton-${index}`}
                className="h-[1.375rem] w-16"
              />
            ))}
          </ul>
        }
      </div>

      <Separator className="my-8" />

      <Skeleton className="h-64 w-full" />
    </section>
  );
}
