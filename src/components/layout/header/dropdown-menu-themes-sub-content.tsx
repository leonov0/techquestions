"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuThemesSubContent() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSubContent>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun />
        <span className="ml-2">Light</span>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon />
        <span className="ml-2">Dark</span>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => setTheme("system")}>
        <Monitor />
        <span className="ml-2">System</span>
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
}
