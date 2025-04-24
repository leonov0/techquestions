import { toast } from "sonner";

import { getCategories } from "@/features/questions";

import { QuestionFilterForm } from "./question-filter-form";

export async function QuestionFilters() {
  const response = await getCategories();

  if (!response.success) {
    toast.error(response.error);
    return <QuestionFilterForm />;
  }

  return <QuestionFilterForm {...response.data} />;
}
