import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { getUsers } from "../actions/get-users";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function UsersTableView() {
  const response = await getUsers();

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>An error occurred while fetching users.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return <DataTable columns={columns} data={response.data} />;
}

export function UsersTableViewSkeleton() {
  return <Skeleton className="h-96" />;
}
