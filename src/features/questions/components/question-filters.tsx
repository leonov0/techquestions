import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";

import { getCategories } from "../actions";
import { QuestionFilterForm } from "./question-filter-form";

export async function QuestionFilters() {
  const response = await getCategories();

  if (!response.success) {
    toast.error(response.error);
  }

  const categories = response.success
    ? response.data
    : {
        technologies: [],
        companies: [],
        levels: [],
      };

  return <QuestionFilterForm {...categories} />;
}

export function QuestionFiltersLoader() {
  return <Skeleton className="h-70" />;
}
