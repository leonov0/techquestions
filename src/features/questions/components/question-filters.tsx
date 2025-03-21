import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";

import { getCategories } from "../actions";
import { QuestionFilterForm } from "./question-filter-form";

export async function QuestionFilters() {
  const { data, error } = await getCategories();

  if (error) {
    toast.error(error);
  }

  return <QuestionFilterForm {...data} />;
}

export function QuestionFiltersLoader() {
  return <Skeleton className="h-70" />;
}
