import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getQuestions } from "./get-questions";

export async function Questions() {
  const response = await getQuestions();

  if (response.success === false) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>An error occurred while fetching the questions.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return <DataTable columns={columns} data={response.data} />;
}
