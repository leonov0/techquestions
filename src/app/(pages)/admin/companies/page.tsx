import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { CompanyList, ListLoader } from "@/features/categories";

export default function ManageCompanies() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold tracking-tight">
          Manage Companies
        </h1>

        <Link href="/admin/technologies/new" className={buttonVariants()}>
          <Plus />
          Create Company
        </Link>
      </div>

      <Suspense fallback={<ListLoader />}>
        <CompanyList />
      </Suspense>
    </div>
  );
}
