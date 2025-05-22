import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn utility

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <LoaderCircle
      className={cn("animate-spin text-muted-foreground", className)}
      size={size}
      strokeWidth={2.5}
    />
  );
}
