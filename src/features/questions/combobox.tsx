"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function Combobox({
  items,
  selectedItemId,
  handleSelect,
  label,
}: {
  items: { id: string; name: string | null }[];
  selectedItemId: string | null;
  handleSelect: (id: string) => void;
  label: string;
}) {
  const itemMap = new Map(
    items.map((item) => [item.id, item.name?.toLowerCase()]),
  );

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between sm:max-w-[200px]"
        >
          <span>
            {items.find((item) => item.id === selectedItemId)?.name ||
              `Select ${label}...`}
          </span>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            const technologyName = itemMap.get(value);

            return technologyName?.includes(search.toLowerCase()) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={`Search ${label}...`} className="h-9" />

          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={`${item.id}`}
                  value={item.id}
                  onSelect={(id) => {
                    handleSelect(id);
                    setOpen(false);
                  }}
                >
                  {item.name}

                  <Check
                    className={cn(
                      "ml-auto",
                      selectedItemId === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
