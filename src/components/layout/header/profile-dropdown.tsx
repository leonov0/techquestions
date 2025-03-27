import { ChevronDown, LogOut, Moon, Settings, Sun, Wrench } from "lucide-react";
import Link from "next/link";
import React from "react";

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
import type { User } from "@/database";
import { cn, getCapitalizedFirstLetter } from "@/lib/utils";

import { DropdownMenuThemesSubContent } from "./dropdown-menu-themes-sub-content";

export function ProfileDropdown({
  name,
  username,
  image,
  role,
}: {
  name: User["name"];
  username: User["username"];
  image: User["image"];
  role: User["role"];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "group max-w-40 space-x-2 pl-2",
        )}
      >
        <Avatar className="size-5 rounded-sm">
          <AvatarImage src={image ?? undefined} />

          <AvatarFallback className="rounded-sm">
            {username && getCapitalizedFirstLetter(username)}
          </AvatarFallback>
        </Avatar>

        <span className="line-clamp-1">{username}</span>

        <ChevronDown
          className="relative transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/users/${username}`} className="flex items-center gap-4">
            <Avatar className="size-8 rounded-sm">
              <AvatarImage src={image ?? undefined} />

              <AvatarFallback className="rounded-sm">
                {username && getCapitalizedFirstLetter(username)}
              </AvatarFallback>
            </Avatar>

            <div className="max-w-32 overflow-hidden pr-4 text-nowrap text-clip">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs">@{username}</p>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Wrench />
              Admin panel
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/settings">
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
          <Link href="/signout">
            <LogOut />
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
