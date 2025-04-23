import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function UsersTableView() {
  const { users } = await auth.api.listUsers({ query: {} });

  return <DataTable columns={columns} data={users} />;
}

export function UsersTableViewSkeleton() {
  return <Skeleton className="h-96" />;
}
