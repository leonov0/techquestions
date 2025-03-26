import { Suspense } from "react";

import { ListLoader, TechnologyList } from "@/features/categories";

export default function ManageTechnologies() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Manage technologies
      </h1>

      <section className="mt-8">
        <Suspense fallback={<ListLoader />}>
          <TechnologyList />
        </Suspense>
      </section>
    </div>
  );
}
