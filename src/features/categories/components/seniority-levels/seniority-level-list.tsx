import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getSeniorityLevels } from "../../actions/seniority-levels/get-seniority-levels";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function SeniorityLevelList() {
  const response = await getSeniorityLevels();

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>An error occurred while fetching levels.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return <DataTable data={response.data} columns={columns} />;
}
