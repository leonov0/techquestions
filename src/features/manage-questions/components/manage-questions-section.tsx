import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QuestionPreview } from "@/widgets/question-preview";

import { getQuestions } from "../actions";
export async function ManageQuestionsSection() {
  const response = await getQuestions({
    status: "pending",
  });

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
        </li>
      ))}
    </ul>
  );
}
