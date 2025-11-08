import type { Priority } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Flame, Minus, ArrowDown } from "lucide-react";

const priorityConfig = {
  High: {
    Icon: Flame,
    colorClass: "text-accent drop-shadow-neon-accent",
    label: "High Priority",
  },
  Medium: {
    Icon: Minus,
    colorClass: "text-primary drop-shadow-neon-primary",
    label: "Medium Priority",
  },
  Low: {
    Icon: ArrowDown,
    colorClass: "text-blue-300",
    label: "Low Priority",
  },
};

export function PriorityIcon({
  priority,
  className,
}: {
  priority: Priority;
  className?: string;
}) {
  const config = priorityConfig[priority];
  if (!config) return null;

  const { Icon, colorClass, label } = config;
  return (
    <div className="flex items-center" title={label}>
      <Icon
        className={cn("h-5 w-5", colorClass, className)}
        aria-label={label}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
