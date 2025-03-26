import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { ListLoader, TechnologyList } from "@/features/categories";

export default function ManageTechnologies() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold tracking-tight">
          Manage technologies
        </h1>

        <Link href="/admin/technologies/new" className={buttonVariants()}>
          <Plus />
          Create Technology
        </Link>
      </div>

      <Suspense fallback={<ListLoader />}>
        <TechnologyList />
      </Suspense>
    </div>
  );
}
