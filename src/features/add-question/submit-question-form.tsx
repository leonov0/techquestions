"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { submitQuestion } from "./actions";
import { submitQuestionSchema } from "./schemas";
import type { SubmitQuestionPayload } from "./types";

export function SubmitQuestionForm() {
  const form = useForm<SubmitQuestionPayload>({
    resolver: zodResolver(submitQuestionSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(payload: SubmitQuestionPayload) {
    startTransition(async () => {
      const { error } = await submitQuestion(payload);

      if (error) {
        toast.error(error);

        return;
      }

      toast.success("Question submitted successfully. We will review it soon.");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Submit a new question</CardTitle>

            <CardDescription>
              Contribute to the community by submitting question you&apos;ve
              been asked in interviews. Provide details and context to; help
              others prepare effectively.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Find the sum of elements in an array"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>
                    Details <span>(optional)</span>
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Given an array of integers, find the sum of all the elements."
                    />
                  </FormControl>

                  <FormDescription>
                    Describe the question in detail. Include any relevant
                    condition, constraints, or context. Markdown is supported.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              <span>Submit for moderation</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
