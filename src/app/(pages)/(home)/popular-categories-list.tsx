import { AlertCircle } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getPopularCategories } from "./actions";

export async function PopularCategoriesList() {
  const response = await getPopularCategories();

  if (response.success === false) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>No categories found</AlertTitle>
        <AlertDescription>
          There are no categories available at the moment. Please check back
          later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {response.data.categories.map((category) => (
        <li key={category.name}>
          <Link href={category.href}>
            <div className="bg-card flex h-60 flex-col items-center justify-center gap-1 rounded-xl border p-6 shadow-sm">
              <h3 className="text-card-foreground text-xl font-semibold">
                {category.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {category.description}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
