"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import type { Company, Level, Technology } from "@/features/database";
import { useDebounce } from "@/lib/use-debounce";

import { Combobox } from "./combobox";

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
    const params = new URLSearchParams();

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
    <div className="grid gap-4 md:grid-cols-4">
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

      <Input value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}
