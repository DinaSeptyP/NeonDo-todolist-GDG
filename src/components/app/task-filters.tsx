"use client";

import { Button } from "@/components/ui/button";
import type { FilterStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Incomplete", value: "incomplete" },
  { label: "Complete", value: "complete" },
];

export function TaskFilters({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}) {
  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-card/50 border">
      {filters.map(({ label, value }) => (
        <Button
          key={value}
          variant={currentFilter === value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(value)}
          className={cn(
            "transition-all duration-300",
            currentFilter === value && "shadow-neon-accent"
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
