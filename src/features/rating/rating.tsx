import { toast } from "sonner";

import { auth } from "@/features/auth";

import { getRating } from "./actions";
import { VoteButtons } from "./vote-buttons";

export async function Rating({ questionId }: { questionId: string }) {
  const session = await auth();

  const { data, error } = await getRating(questionId);

  if (error) {
    toast.error(error);
  }

  return (
    <VoteButtons
      questionId={questionId}
      isAuthorized={!!session?.user.id}
      {...data}
    />
  );
}
