"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-lg border border-card-border bg-card transition-all duration-200",
          currentPage === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:border-primary/30 hover:text-primary"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200",
            page === currentPage
              ? "bg-primary text-white"
              : "border border-card-border bg-card text-muted hover:border-primary/30 hover:text-foreground"
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-lg border border-card-border bg-card transition-all duration-200",
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:border-primary/30 hover:text-primary"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
