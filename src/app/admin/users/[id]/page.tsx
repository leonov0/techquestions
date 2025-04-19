import { Suspense } from "react";

import { ManageUserSection } from "@/features/users";

export default function ManageUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto w-full max-w-xl">
      <Suspense>
        <ManageUserSection params={params} />
      </Suspense>
    </main>
  );
}
