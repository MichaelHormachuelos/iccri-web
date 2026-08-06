import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SurfaceProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * The one "raised surface" treatment in the system — border, radius,
 * background. Card and NavDropdown's popover both extend this rather
 * than each authoring border/radius/background independently (Sprint
 * 3.5 consistency finding: raised-surface styling existed in two
 * places before this).
 */
export function Surface({ children, as: Tag = "div", className = "" }: SurfaceProps) {
  return (
    <Tag className={cn("rounded-lg border border-border bg-paper-raised", className)}>
      {children}
    </Tag>
  );
}
