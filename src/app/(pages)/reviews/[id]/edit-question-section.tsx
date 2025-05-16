import { AlertCircle, Check, Clock, X } from "lucide-react";
import { notFound } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/features/questions";

import { getDefaultValues, getReviews } from "./actions";
import { UpdateQuestionForm } from "./update-question-form";

export async function EditQuestionSection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [getCategoriesResponse, getDefaultValuesResponse, getReviewsResponse] =
    await Promise.all([getCategories(), getDefaultValues(id), getReviews(id)]);

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

  if (getReviewsResponse.success === false) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>An error occurred while fetching the reviews.</AlertTitle>
        <AlertDescription>{getReviewsResponse.error}</AlertDescription>
      </Alert>
    );
  }

  if (getDefaultValuesResponse.data === null) {
    notFound();
  }

  return (
    <section>
      <UpdateQuestionForm
        technologies={getCategoriesResponse.data.technologies}
        companies={getCategoriesResponse.data.companies}
        seniorityLevels={getCategoriesResponse.data.seniorityLevels}
        defaultValues={getDefaultValuesResponse.data}
      />

      {getReviewsResponse.data.reviews.length > 0 && (
        <>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight">
            Review History
          </h2>

          <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
            The following reviews have been made on this question. You can
            update the question and resubmit it for review.
          </p>

          <Separator className="my-8" />

          <ul className="space-y-4">
            {getReviewsResponse.data.reviews.map((review) => (
              <li key={review.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {review.status && (
                        <>
                          {titles[review.status].icon}
                          {titles[review.status].message}
                        </>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {review.message || "No message provided."}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <time
                      className="text-muted-foreground text-sm"
                      dateTime={review.createdAt.toISOString()}
                      suppressHydrationWarning
                    >
                      {review.createdAt.toLocaleString()}
                    </time>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

const titles = {
  approved: {
    message: (
      <p>
        This question has been <span className="text-green-500">approved</span>
      </p>
    ),
    icon: <Check className="size-4 text-green-500" />,
  },
  rejected: {
    message: (
      <p>
        This question has been <span className="text-red-500">rejected</span>
      </p>
    ),
    icon: <X className="size-4 text-red-500" />,
  },
  pending: {
    message: (
      <p>
        This question is <span className="text-yellow-500">pending review</span>
      </p>
    ),
    icon: <Clock className="size-4 text-yellow-500" />,
  },
};
