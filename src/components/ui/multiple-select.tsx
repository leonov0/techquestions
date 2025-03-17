import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo } from "react";

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
export function MultipleSelect({
  name,
  items,
  onChange,
  value,
  className,
}: {
  name: string;
  items: { id: string; name: string }[];
  onChange: (value: string[]) => void;
  value: string[];
  className?: string;
}) {
  const normalizedItems = useMemo(
    () =>
      items.reduce<Record<string, { name: string; isSelected: boolean }>>(
        (acc, item) => {
          acc[item.id] = {
            name: item.name,
            isSelected: value.includes(item.id),
          };
          return acc;
        },
        {},
      ),
    [items, value],
  );

  const toggleSelection = (id: string) =>
    onChange(
      normalizedItems[id]?.isSelected
        ? value.filter((itemId) => itemId !== id)
        : [...value, id],
    );

  const clearSelection = () => onChange([]);

  function filter(value: string, search: string) {
    const lowercaseName = normalizedItems[value]?.name.toLowerCase() || "";
    return lowercaseName.includes(search.toLowerCase()) ? 1 : 0;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", className)}
        >
          {value.length > 0 ? (
            <span className="overflow-hidden text-clip">
              {value.map((id) => normalizedItems[id]?.name).join(", ")}
            </span>
          ) : (
            <span className="text-muted-foreground overflow-hidden text-clip">
              Select {name}
            </span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Command filter={filter}>
          <CommandInput placeholder={`Search...`} />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              <CommandItem onSelect={clearSelection}>Reset</CommandItem>
            </CommandGroup>

            <CommandGroup heading="Items">
              {items.map(({ id, name }) => (
                <CommandItem value={id} key={id} onSelect={toggleSelection}>
                  {normalizedItems[id]?.isSelected && <Check />}
                  <span className="overflow-hidden text-clip">{name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
