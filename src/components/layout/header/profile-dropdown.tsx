"use client";

import { ChevronDown, LogOut, Moon, Settings, Sun, Wrench } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn, getCapitalizedFirstLetter } from "@/lib/utils";

import { DropdownMenuThemesSubContent } from "./dropdown-menu-themes-sub-content";

type Props = {
  username: string;
  name: string;
  image?: string | null;
};

export function ProfileDropdown(fallbackProps: Props) {
  const session = authClient.useSession();

  const [hasPermission, setHasPermission] = useState(false);
  const [, startTransition] = useTransition();

  const [user, setUser] = useState<Props>(fallbackProps);

  useEffect(() => {
    if (session.data) {
      if (!session.data.user.username) {
        throw new Error("Username is required.");
      }

      setUser({
        username: session.data.user.username,
        name: session.data.user.name,
        image: session.data.user.image,
      });

      startTransition(async () => {
        const permission = await authClient.admin.hasPermission({
          permissions: {
            questions: ["list"],
          },
        });

        setHasPermission(permission.data?.success ?? false);
      });
    }
  }, [session]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "group space-x-2 pl-2",
        )}
      >
        <Avatar className="size-5 rounded-sm">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="rounded-sm">
            {getCapitalizedFirstLetter(user.username)}
          </AvatarFallback>
        </Avatar>

        <span className="line-clamp-1">{user.username}</span>

        <ChevronDown
          className="relative transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-4"
          >
            <Avatar className="size-8 rounded-sm">
              <AvatarImage src={user.image ?? undefined} />

              <AvatarFallback className="rounded-sm">
                {getCapitalizedFirstLetter(user.username)}
              </AvatarFallback>
            </Avatar>

            <div className="max-w-32 overflow-hidden pr-4 text-nowrap text-clip">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs">@{user.username}</p>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {hasPermission && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Wrench />
              Admin Panel
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/auth/settings">
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="text-muted-foreground mr-2 size-4 dark:hidden" />
            <Moon className="text-muted-foreground mr-2 hidden size-4 dark:inline" />
            Themes
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuThemesSubContent />
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/auth/sign-out">
            <LogOut />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
