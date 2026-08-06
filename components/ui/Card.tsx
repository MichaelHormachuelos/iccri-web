import type { ElementType, ReactNode } from "react";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Base content-card primitive — Surface plus standard padding.
 * Publication cards, project cards, researcher cards all extend
 * this rather than redefining border/radius/padding themselves.
 */
export function Card({ children, as = "div", className = "" }: CardProps) {
  return (
    <Surface as={as} className={cn("p-6", className)}>
      {children}
    </Surface>
  );
}
