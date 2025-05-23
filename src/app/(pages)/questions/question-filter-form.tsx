"use client";

import { ArrowBigUpDash, Flame, Search, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultipleSelect } from "@/components/ui/multiple-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Company, SeniorityLevel, Technology } from "@/features/questions";

export function QuestionFilterForm({
  technologies = [],
  companies = [],
  seniorityLevels = [],
}: {
  technologies?: Technology[];
  companies?: Company[];
  seniorityLevels?: SeniorityLevel[];
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

  const [selectedSeniorityLevels, setSelectedSeniorityLevels] = useState(
    searchParams.getAll("seniorityLevelId"),
  );

  const [selectedOrderBy, setSelectedOrderBy] = useState(
    searchParams.get("order") || "relevance",
  );

  function applyFilters(event: React.FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (query && query.trim()) {
      params.set("query", query);
    }

    selectedTechnologies.forEach((technologyId) => {
      params.append("technologyId", technologyId);
    });

    selectedCompanies.forEach((companyId) => {
      params.append("companyId", companyId);
    });

    selectedSeniorityLevels.forEach((seniorityLevelId) => {
      params.append("seniorityLevelId", seniorityLevelId);
    });

    if (selectedOrderBy) {
      params.set("order", selectedOrderBy);
    }

    router.push(`${pathname}${params ? `?${params.toString()}` : ""}`);
  }

  return (
    <form className="space-y-3" onSubmit={applyFilters}>
      <div className="relative">
        <Input
          name="query"
          className="pl-10"
          placeholder="Search..."
          value={query ?? ""}
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
        name="seniority levels"
        items={seniorityLevels}
        onChange={setSelectedSeniorityLevels}
        value={selectedSeniorityLevels}
        className="w-full"
      />

      <Select onValueChange={setSelectedOrderBy} value={selectedOrderBy}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Date" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="relevance">
            <User />
            Relevance
          </SelectItem>
          <SelectItem value="new">
            <Flame />
            New
          </SelectItem>
          <SelectItem value="top">
            <ArrowBigUpDash />
            Top
          </SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full">
        Apply filters
      </Button>
    </form>
  );
}
