"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { MultipleSelect } from "@/components/ui/multiple-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Company, SeniorityLevel, Technology } from "@/features/questions";

import { submitQuestionSchema } from "./schemas";
import { submitQuestion } from "./submit-action";
import type { SubmitQuestionPayload } from "./types";

export function SubmitQuestionForm({
  technologies = [],
  companies = [],
  seniorityLevels = [],
}: {
  technologies?: Technology[];
  companies?: Company[];
  seniorityLevels?: SeniorityLevel[];
}) {
  const form = useForm<SubmitQuestionPayload>({
    resolver: zodResolver(submitQuestionSchema),
    defaultValues: {
      title: "",
      body: "",
      isAnonymous: false,
      technologies: [],
      companies: [],
      seniorityLevels: [],
    },
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function onSubmit(payload: SubmitQuestionPayload) {
    startTransition(async () => {
      const response = await submitQuestion(payload);

      if (!response.success) {
        toast.error(response.error);

        return;
      }

      toast.success("Question submitted successfully. We will review it soon.");

      router.push("/");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Submit a New Question
          </h1>

          <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
            Contribute to the community by submitting question you&apos;ve been
            asked in interviews.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
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
              <FormItem>
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

          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem className="flex items-start space-y-0 space-x-3 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <div className="space-y-1 leading-none">
                  <FormLabel>Submit anonymously</FormLabel>

                  <FormDescription>
                    Your username will not be displayed with the question.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Technologies</FormLabel>

                <FormControl>
                  <MultipleSelect items={technologies} {...field} />
                </FormControl>

                <FormDescription>
                  Select the technologies relevant to the question.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companies"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Companies</FormLabel>

                <FormControl>
                  <MultipleSelect items={companies} {...field} />
                </FormControl>

                <FormDescription>
                  Select the companies where you were asked this question.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seniorityLevels"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Seniority Levels</FormLabel>

                <FormControl>
                  <MultipleSelect
                    items={seniorityLevels}
                    {...field}
                    name="seniority levels"
                  />
                </FormControl>

                <FormDescription>
                  Select the expected developer levels for this question.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            <span>Submit for moderation</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
