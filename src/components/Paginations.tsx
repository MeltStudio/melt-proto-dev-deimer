import React from "react";
import { Button } from "@/ui/components/Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 p-4 w-full">
      <span className="text-sm font-medium">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="neutral-secondary"
          size="small"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="neutral-secondary"
          size="small"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
