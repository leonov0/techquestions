import { VariantProps } from "class-variance-authority";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useMemo } from "react";

import { Badge, badgeVariants } from "@/components/ui/badge";
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

export function MultipleSelect({
  name,
  items,
  onChange,
  value = [],
  variant,
}: {
  name: string;
  items: { id: string; name: string | null }[];
  onChange: (value: string[]) => void;
  value?: string[];
} & VariantProps<typeof badgeVariants>) {
  const itemMap = useMemo(
    () => new Map(items.map((item) => [item.id, item.name])),
    [items],
  );

  function toggleSelect(id: string) {
    onChange(
      value.includes(id)
        ? value.filter((itemId) => itemId !== id)
        : [...value, id],
    );
  }

  function filter(value: string, search: string) {
    const lowercaseName = itemMap.get(value)?.toLocaleLowerCase() ?? "";
    const lowercaseSearch = search.toLocaleLowerCase();

    return lowercaseName.includes(lowercaseSearch) ? 1 : 0;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="hover:bg-background hover:text-foreground h-full justify-between"
        >
          {value.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {value.map((id) => (
                <li key={`${name}-badge-${id}`}>
                  <Badge
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(id);
                    }}
                    variant={variant}
                  >
                    {itemMap.get(id)}
                    <X className="ml-1" />
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <span className="h-[22px]">Select {name}...</span>
          )}

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Command filter={filter}>
          <CommandInput placeholder={`Search ${name}...`} className="h-9" />

          <CommandList>
            <CommandEmpty>No {name} found.</CommandEmpty>

            <CommandGroup>
              {items.map(({ id, name }) => (
                <CommandItem value={id} key={id} onSelect={toggleSelect}>
                  {value.includes(id) && <Check />}
                  <span className="h-5 overflow-hidden text-clip">{name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
