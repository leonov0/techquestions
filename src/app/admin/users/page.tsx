import { Suspense } from "react";

import { UsersTableView, UsersTableViewSkeleton } from "@/features/users";

export default function ManageUsers() {
  return (
    <main className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold tracking-tight">Manage Users</h1>
      </div>

      <Suspense fallback={<UsersTableViewSkeleton />}>
        <UsersTableView />
      </Suspense>
    </main>
  );
}
