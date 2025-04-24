"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";

import { updateRolesSchema } from "../schemas";
import type { UpdateRolesPayload } from "../types";

const ROLES = [
  {
    id: "user",
    label: "User",
  },
  {
    id: "admin",
    label: "Admin",
  },
] as const;

export function ManageRolesForm({
  userId,
  roles,
}: {
  userId: string;
  roles: string;
}) {
  const splittedRoles = roles.split(",") as UpdateRolesPayload["roles"];

  const form = useForm<UpdateRolesPayload>({
    resolver: zodResolver(updateRolesSchema),
    defaultValues: { roles: splittedRoles },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: UpdateRolesPayload) {
    startTransition(async () => {
      const response = await authClient.admin.setRole({
        userId,
        role: data.roles,
      });

      if (response.error) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Roles updated successfully!");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              {ROLES.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="roles"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-y-0 space-x-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="mt-6 w-full">
          {isPending && <Loader2 className="animate-spin" />}
          Update Role
        </Button>
      </form>
    </Form>
  );
}
