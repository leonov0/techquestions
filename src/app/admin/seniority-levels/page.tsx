import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { LevelList, ListLoader } from "@/features/categories";

export default function ManageSeniorityLevels() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold tracking-tight">
          Manage Seniority Levels
        </h1>

        <Link href="/admin/seniority-levels/new" className={buttonVariants()}>
          <Plus />
          Create Level
        </Link>
      </div>

      <Suspense fallback={<ListLoader />}>
        <LevelList />
      </Suspense>
    </div>
  );
}
