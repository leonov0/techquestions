"use client";

import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
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
        <SunIcon />
        <span className="ml-2">Light</span>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <MoonIcon />
        <span className="ml-2">Dark</span>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => setTheme("system")}>
        <LaptopIcon />
        <span className="ml-2">System</span>
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
}
