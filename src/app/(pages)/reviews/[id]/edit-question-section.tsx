import { AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCategories } from "@/features/questions";

import { getDefaultValues } from "./actions";
import { UpdateQuestionForm } from "./update-question-form";

export async function EditQuestionSection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [getCategoriesResponse, getDefaultValuesResponse] = await Promise.all([
    getCategories(),
    getDefaultValues(id),
  ]);

  if (getDefaultValuesResponse.success === false) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>An error occurred while fetching the question.</AlertTitle>
        <AlertDescription>{getDefaultValuesResponse.error}</AlertDescription>
      </Alert>
    );
  }

  if (getCategoriesResponse.success === false) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>
          An error occurred while fetching the categories.
        </AlertTitle>
        <AlertDescription>{getCategoriesResponse.error}</AlertDescription>
      </Alert>
    );
  }

  if (getDefaultValuesResponse.data === null) {
    notFound();
  }

  return (
    <UpdateQuestionForm
      technologies={getCategoriesResponse.data.technologies}
      companies={getCategoriesResponse.data.companies}
      seniorityLevels={getCategoriesResponse.data.seniorityLevels}
      defaultValues={getDefaultValuesResponse.data}
    />
  );
}
