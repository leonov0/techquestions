"use client";

import { ArrowDownNarrowWide, ArrowDownWideNarrow, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MultipleSelect } from "@/components/ui/multiple-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Company, Level, Technology } from "@/database";
import { useDebounce } from "@/lib/use-debounce";

export function QuestionFilterForm({
  technologies,
  companies,
  levels,
}: {
  technologies: Technology[];
  companies: Company[];
  levels: Level[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query"));
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedQuery !== params.get("query")) {
      params.delete("page");
    }

    if (debouncedQuery) {
      params.set("query", debouncedQuery);
    } else {
      params.delete("query");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, pathname, router, searchParams]);

  function handleSelect(key: string, id: string) {
    const params = new URLSearchParams(searchParams);

    if (id === params.get(key)) {
      params.delete(key);
    } else {
      params.set(key, id);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSelectMultiple(key: string, value: string[]) {
    const params = new URLSearchParams(searchParams);

    params.delete(key);

    if (value.length) {
      value.forEach((id) => params.append(key, id));
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function selectOrder(order: "asc" | "desc") {
    const params = new URLSearchParams(searchParams);

    params.set("order", order);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Card>
      <CardHeader>
        <div className="relative">
          <Input
            className="pl-10"
            placeholder="Search..."
            value={query || ""}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Search className="text-input absolute top-2.5 left-3 z-10 size-4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <MultipleSelect
          name="technologies"
          items={technologies}
          onChange={(value) => handleSelectMultiple("technologyId", value)}
          value={searchParams.getAll("technologyId")}
          className="w-full"
        />

        <MultipleSelect
          name="companies"
          items={companies}
          onChange={(value) => handleSelectMultiple("companyId", value)}
          value={searchParams.getAll("companyId")}
          className="w-full"
        />

        <MultipleSelect
          name="levels"
          items={levels}
          onChange={(value) => handleSelectMultiple("levelId", value)}
          value={searchParams.getAll("levelId")}
          className="w-full"
        />

        <div className="grid grid-cols-[1fr__auto] gap-2">
          <Select
            onValueChange={(value) => handleSelect("orderBy", value)}
            value={searchParams.get("orderBy") || "date"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Date" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ size: "icon", variant: "secondary" })}
            >
              {searchParams.get("order") === "asc" ? (
                <ArrowDownNarrowWide />
              ) : (
                <ArrowDownWideNarrow />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => selectOrder("asc")}>
                Ascending
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => selectOrder("desc")}>
                Descending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
