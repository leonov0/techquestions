"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import type { Company, Level, Technology } from "@/database";
import { useDebounce } from "@/lib/use-debounce";
import { cn } from "@/lib/utils";

import { Combobox } from "./combobox";

export function QuestionFilterForm({
  technologies,
  companies,
  levels,
  className,
}: {
  technologies: Technology[];
  companies: Company[];
  levels: Level[];
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedQuery) {
      params.set("query", debouncedQuery);
    } else {
      params.delete("query");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, pathname, router, searchParams]);

  function handleSelect(key: string, id: string | null) {
    const params = new URLSearchParams(searchParams);

    Object.entries(searchParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    if (!id || id === params.get(key)) {
      params.delete(key);
    } else {
      params.set(key, id);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <Combobox
        items={technologies}
        selectedItemId={searchParams.get("technologyId")}
        handleSelect={(id) => handleSelect("technologyId", id)}
        label="technology"
      />

      <Combobox
        items={companies}
        selectedItemId={searchParams.get("companyId")}
        handleSelect={(id) => handleSelect("companyId", id)}
        label="company"
      />

      <Combobox
        items={levels}
        selectedItemId={searchParams.get("levelId")}
        handleSelect={(id) => handleSelect("levelId", id)}
        label="level"
      />

      <div className="relative">
        <Input
          className="pl-10"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 z-10 size-4 text-input" />
      </div>
    </div>
  );
}
