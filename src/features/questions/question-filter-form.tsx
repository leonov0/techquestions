"use client";

import { usePathname, useRouter } from "next/navigation";

import type { Company, Level, Technology } from "@/features/database";

import { Combobox } from "./combobox";

export function QuestionFilterForm({
  technologies,
  companies,
  levels,
  searchParams,
}: {
  technologies: Technology[];
  companies: Company[];
  levels: Level[];
  searchParams: { [key: string]: string };
}) {
  const pathname = usePathname();
  const router = useRouter();

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
    <form className="flex flex-col gap-4 sm:flex-row">
      <Combobox
        items={technologies}
        selectedItemId={searchParams.technologyId}
        handleSelect={(id) => handleSelect("technologyId", id)}
        label="technology"
      />

      <Combobox
        items={companies}
        selectedItemId={searchParams.companyId}
        handleSelect={(id) => handleSelect("companyId", id)}
        label="company"
      />

      <Combobox
        items={levels}
        selectedItemId={searchParams.levelId}
        handleSelect={(id) => handleSelect("levelId", id)}
        label="level"
      />
    </form>
  );
}
