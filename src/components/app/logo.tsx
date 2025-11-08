import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold font-headline text-primary drop-shadow-neon-primary",
        className
      )}
    >
      NeonDo
    </h1>
  );
}
