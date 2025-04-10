import { Badge } from "@/components/ui/badge";
import type { Company, Level, Technology } from "@/features/questions";
import { cn } from "@/lib/utils";

export function CategoryList({
  id,
  technologies,
  companies,
  levels,
  className,
}: {
  id: string;
  technologies: Technology[];
  companies: Company[];
  levels: Level[];
  className?: string;
}) {
  if (technologies.length + companies.length + levels.length === 0) {
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

      {levels.map((level) => (
        <li key={`level-${id}-${level.id}`}>
          <Badge variant="outline">{level.name}</Badge>
        </li>
      ))}
    </ul>
  );
}
