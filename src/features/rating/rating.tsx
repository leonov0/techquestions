"use server";

import { toast } from "sonner";

import { getRating } from "./actions/get-rating";
import { VoteButtons } from "./vote-buttons";

export async function Rating({ questionId }: { questionId: string }) {
  const response = await getRating(questionId);

  if (!response.success) {
    toast.error(response.error);
    return null;
  }

  return <VoteButtons questionId={questionId} rating={response.data} />;
}
