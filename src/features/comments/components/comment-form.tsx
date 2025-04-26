"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { comment } from "../actions/comment";
import { commentSchema } from "../schemas";
import type { CommentPayload } from "../types";

export function CommentForm({ questionId }: { questionId: string }) {
  const form = useForm<CommentPayload>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      questionId,
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: CommentPayload) {
    startTransition(async () => {
      const response = await comment(data);

      if (response.success === false) {
        toast.error(response.error);
        return;
      }

      form.reset();
      toast.success("Your comment has been posted!");
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
              <FormControl>
                <Textarea placeholder="Type your comment here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="mt-6">
          {isPending && <Loader2 className="animate-spin" />}
          Comment
        </Button>
      </form>
    </Form>
  );
}
