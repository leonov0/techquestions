import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { parseToStringArray } from "@/lib/utils";

import { getQuestions } from "../actions/get-questions";
import { Question } from "../types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function QuestionList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const status = parseToStringArray(params.status) as Question["status"][];

  const response = await getQuestions({ status });

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />

        <AlertTitle>An error occurred while fetching the questions.</AlertTitle>

        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return <DataTable columns={columns} data={response.data} />;
}

export function QuestionListLoader() {
  return <Skeleton className="h-96" />;
}
