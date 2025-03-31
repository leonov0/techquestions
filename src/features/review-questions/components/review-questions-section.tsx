import { GitPullRequest } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionPreview } from "@/widgets/question-preview";

import { getPendingQuestions } from "../actions/get-pending-questions";
import { ReviewQuestionForm } from "./review-question-form";

export async function ReviewQuestionSection() {
  const response = await getPendingQuestions();

  if (!response.success) {
    return (
      <Alert>
        <AlertTitle>An error occurred while fetching the questions.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="space-y-4">
      {response.data.questions.map((question) => (
        <li
          key={question.id}
          className="border-t pt-4 first:border-none first:pt-0"
        >
          <QuestionPreview
            question={question}
            className="motion-preset-focus"
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">
                <GitPullRequest className="ml-2" />
                Review
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Review question</DialogTitle>

                <DialogDescription>
                  Review the question and provide feedback to the author.
                </DialogDescription>
              </DialogHeader>

              <ReviewQuestionForm questionId={question.id} />
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}

export function ReviewQuestionSectionLoader() {
  return (
    <ul className="space-y-4">
      {[...Array(10)].map((_, index) => (
        <li
          key={`question-loader-${index}`}
          className="border-t pt-4 first:border-none first:pt-0"
        >
          <Skeleton className="h-54" />
        </li>
      ))}
    </ul>
  );
}
