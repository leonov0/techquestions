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

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="overflow-hidden text-clip">
            {selectedItem ? selectedItem.name : `Select ${label}...`}
          </span>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="end">
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
                  <span className="h-5 overflow-hidden text-clip">
                    {item.name}
                  </span>

                  {selectedItemId === item.id && <Check className="ml-auto" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
