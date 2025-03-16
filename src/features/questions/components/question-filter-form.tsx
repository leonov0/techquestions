"use client";

import { ArrowDownNarrowWide, ArrowDownWideNarrow, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
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
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    searchParams.getAll("technologyId"),
  );
  const [selectedCompanies, setSelectedCompanies] = useState(
    searchParams.getAll("companyId"),
  );
  const [selectedLevels, setSelectedLevels] = useState(
    searchParams.getAll("levelId"),
  );
  const [selectedOrderBy, setSelectedOrderBy] = useState(
    searchParams.get("orderBy") || "date",
  );
  const [selectedOrder, setSelectedOrder] = useState(
    searchParams.get("order") || "desc",
  );

  function applyFilters(event: React.FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    selectedTechnologies.forEach((technologyId) => {
      params.append("technologyId", technologyId);
    });

    selectedCompanies.forEach((companyId) => {
      params.append("companyId", companyId);
    });

    selectedLevels.forEach((levelId) => {
      params.append("levelId", levelId);
    });

    if (selectedOrderBy) {
      params.set("orderBy", selectedOrderBy);
    }

    if (selectedOrder) {
      params.set("order", selectedOrder);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form className="space-y-4" onSubmit={applyFilters}>
      <div className="relative">
        <Input
          name="query"
          className="pl-10"
          placeholder="Search..."
          value={query ?? undefined}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Search className="text-input absolute top-2.5 left-3 z-10 size-4" />
      </div>

      <MultipleSelect
        name="technologies"
        items={technologies}
        onChange={setSelectedTechnologies}
        value={selectedTechnologies}
        className="w-full"
      />

      <MultipleSelect
        name="companies"
        items={companies}
        onChange={setSelectedCompanies}
        value={selectedCompanies}
        className="w-full"
      />

      <MultipleSelect
        name="levels"
        items={levels}
        onChange={setSelectedLevels}
        value={selectedLevels}
        className="w-full"
      />

      <div className="grid grid-cols-[1fr__auto] gap-2">
        <Select onValueChange={setSelectedOrderBy} value={selectedOrderBy}>
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
            {selectedOrder === "asc" ? (
              <ArrowDownNarrowWide />
            ) : (
              <ArrowDownWideNarrow />
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedOrder("asc")}>
              Ascending
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setSelectedOrder("desc")}>
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button type="submit" className="w-full">
        Apply filters
      </Button>
    </form>
  );
}
