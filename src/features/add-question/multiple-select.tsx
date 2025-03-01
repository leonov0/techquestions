import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
  value = [],
  badgeProps,
}: {
  name: string;
  items: { id: string; name: string | null }[];
  onChange: (value: string[]) => void;
  value?: string[];
  badgeProps?: BadgeProps;
}) {
  const itemsMap = new Map(items.map((item) => [item.id, item.name]));

  const toggleSelect = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((itemId) => itemId !== id));
      return;
    }

    onChange([...value, id]);
  };

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "group hover:bg-background hover:text-foreground h-full justify-between gap-2",
        )}
        role="combobox"
      >
        {value.length > 0 ? (
          <ul className="flex flex-wrap gap-x-2 gap-y-1">
            {value.map((id) => {
              const itemName = itemsMap.get(id);

              return (
                <li key={`${name}-badge-${id}`}>
                  <Badge
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(id);
                    }}
                    {...badgeProps}
                  >
                    {itemName}
                    <X className="ml-1" />
                  </Badge>
                </li>
              );
            })}
          </ul>
        ) : (
          <span className="h-[22px]">Select {name}...</span>
        )}

        <ChevronsUpDown className="opacity-50" />
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Command
          filter={(value, search) => {
            const itemName = itemsMap.get(value);

            return itemName?.includes(search) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={`Search ${name}...`} className="h-9" />

          <CommandList>
            <CommandEmpty>No {name} found.</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  value={item.id}
                  key={item.id}
                  onSelect={toggleSelect}
                >
                  <span className="h-5 overflow-hidden text-clip">
                    {item.name}
                  </span>

                  {value.includes(item.id) && <Check className="ml-auto" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
