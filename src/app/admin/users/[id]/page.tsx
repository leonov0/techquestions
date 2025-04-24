import { Suspense } from "react";

import { ManageUserSection, ManageUserSectionSkeleton } from "@/features/users";

export default function ManageUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto w-full max-w-xl">
      <Suspense fallback={<ManageUserSectionSkeleton />}>
        <ManageUserSection params={params} />
      </Suspense>
    </main>
  );
}
