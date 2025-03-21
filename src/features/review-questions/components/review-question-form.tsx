"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { reviewQuestion } from "../actions";
import { reviewQuestionSchema } from "../schemas";
import type { ReviewQuestionPayload } from "../types";

export function ReviewQuestionForm({ questionId }: { questionId: string }) {
  const form = useForm({
    resolver: zodResolver(reviewQuestionSchema),
    defaultValues: {
      status: "rejected",
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(payload: ReviewQuestionPayload) {
    startTransition(async () => {
      const response = await reviewQuestion(questionId, payload);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      toast.success("Question has been reviewed successfully.");
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (optional)</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Enter your message here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 grid grid-cols-2 gap-4">
          <Button
            type="submit"
            onClick={() => form.setValue("status", "approved")}
            disabled={isPending}
          >
            <Check className="ml-2 size-4" />
            Approve
          </Button>

          <Button
            type="submit"
            onClick={() => form.setValue("status", "rejected")}
            disabled={isPending}
            variant="destructive"
          >
            <X className="ml-2 size-4" />
            Reject
          </Button>
        </div>
      </form>
    </Form>
  );
}
