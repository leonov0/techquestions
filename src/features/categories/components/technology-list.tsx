import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getTechnologies } from "../actions/get-technologies";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function TechnologyList() {
  const response = await getTechnologies();

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>An error occurred while fetching technologies.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return <DataTable data={response.data} columns={columns} />;
}
