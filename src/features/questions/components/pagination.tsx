"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function QuestionPagination({
  pageCount,
  className,
}: {
  pageCount: number;
  className?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        {currentPage > 1 ? (
          <>
            <PaginationItem>
              <PaginationPrevious href={createPageURL(currentPage - 1)} />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href={createPageURL(1)}>1</PaginationLink>
            </PaginationItem>
          </>
        ) : (
          <PaginationItem>
            <PaginationPrevious
              className="pointer-events-none opacity-50"
              aria-disabled
            />
          </PaginationItem>
        )}

        {currentPage > 3 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <PaginationItem className="hidden sm:block">
            <PaginationLink href={createPageURL(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={createPageURL(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < pageCount - 1 && (
          <PaginationItem className="hidden sm:block">
            <PaginationLink href={createPageURL(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < pageCount - 2 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < pageCount ? (
          <>
            <PaginationItem>
              <PaginationLink href={createPageURL(pageCount)}>
                {pageCount}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href={createPageURL(currentPage + 1)} />
            </PaginationItem>
          </>
        ) : (
          <PaginationItem>
            <PaginationNext
              className="pointer-events-none opacity-50"
              aria-disabled
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
