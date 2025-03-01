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
        Light
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon />
        Dark
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => setTheme("system")}>
        <Monitor />
        System
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
}
