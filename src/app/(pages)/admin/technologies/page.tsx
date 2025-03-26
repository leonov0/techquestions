import { Suspense } from "react";

import { ListLoader, TechnologyList } from "@/features/categories";

export default function ManageTechnologies() {
  return (
    <Suspense fallback={<ListLoader />}>
      <TechnologyList />
    </Suspense>
  );
}
