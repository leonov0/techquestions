"use client";

import {
  Award,
  ChevronDown,
  FileDown,
  GitPullRequest,
  LogOut,
  Moon,
  Settings,
  Sun,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { getCapitalizedFirstLetter } from "@/lib/utils";

import { DropdownMenuThemesSubContent } from "./dropdown-menu-themes-sub-content";

type UserProfile = {
  name: string;
  username?: string | null;
  displayUsername?: string | null;
  image?: string | null;
  role?: string | null;
};

export function ProfileDropdown(initialUserProfile: UserProfile) {
  const session = authClient.useSession();

  const [user, setUser] = useState<UserProfile>(initialUserProfile);

  useEffect(() => {
    if (session.data) {
      setUser(session.data.user);
    }
  }, [session]);

  if (!user.displayUsername || !user.username) {
    throw new Error("Display username or username is missing");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="group space-x-2 pl-2" variant="secondary">
          <Avatar className="size-5 rounded-sm">
            {user.image && <AvatarImage src={user.image} />}
            <AvatarFallback className="rounded-sm">
              {getCapitalizedFirstLetter(user.displayUsername)}
            </AvatarFallback>
          </Avatar>

          <p className="max-w-16 truncate overflow-hidden whitespace-nowrap sm:max-w-none">
            {user.displayUsername}
          </p>

          <ChevronDown className="transition duration-300 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-4"
          >
            <Avatar className="size-8 rounded-sm">
              {user.image && <AvatarImage src={user.image} />}
              <AvatarFallback className="rounded-sm">
                {getCapitalizedFirstLetter(user.displayUsername)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs">@{user.displayUsername}</p>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {user.role && user.role.includes("admin") && (
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

        <DropdownMenuItem asChild>
          <Link href="/achievements">
            <Award />
            Achievements
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/reviews">
            <GitPullRequest />
            Reviews
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/export-data">
            <FileDown />
            Export Data
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
