import { Badge } from "@/components/ui/badge";
import type { Company, SeniorityLevel, Technology } from "@/features/questions";
import { cn } from "@/lib/utils";

export function CategoryList({
  id,
  technologies,
  companies,
  seniorityLevels,
  className,
}: {
  id: string;
  technologies: Technology[];
  companies: Company[];
  seniorityLevels: SeniorityLevel[];
  className?: string;
}) {
  if (technologies.length + companies.length + seniorityLevels.length === 0) {
    return null;
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {technologies.map((technology) => (
        <li key={`technology-${id}-${technology.id}`}>
          <Badge>{technology.name}</Badge>
        </li>
      ))}

      {companies.map((company) => (
        <li key={`company-${id}-${company.id}`}>
          <Badge variant="secondary">{company.name}</Badge>
        </li>
      ))}

      {seniorityLevels.map((seniorityLevel) => (
        <li key={`seniority-level-${id}-${seniorityLevel.id}`}>
          <Badge variant="outline">{seniorityLevel.name}</Badge>
        </li>
      ))}
    </ul>
  );
}
