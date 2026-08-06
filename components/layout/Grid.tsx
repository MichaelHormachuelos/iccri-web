import type { ElementType, ReactNode } from "react";

type Columns = 1 | 2 | 3 | 4 | 6 | 12;
type Gap = "sm" | "md" | "lg";

interface GridProps {
  children: ReactNode;
  as?: ElementType;
  cols?: Columns;
  colsMd?: Columns;
  gap?: Gap;
  className?: string;
}

const colsClasses: Record<Columns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const colsMdClasses: Record<Columns, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const gapClasses: Record<Gap, string> = {
  sm: "gap-4",
  md: "gap-6 md:gap-8",
  lg: "gap-8 md:gap-12",
};

/**
 * Mobile-first CSS grid primitive. `cols` sets the mobile column
 * count, `colsMd` overrides it at the md breakpoint — mirroring the
 * project's mobile-first responsive standard.
 */
export function Grid({
  children,
  as: Tag = "div",
  cols = 1,
  colsMd,
  gap = "md",
  className = "",
}: GridProps) {
  return (
    <Tag
      className={`grid ${colsClasses[cols]} ${
        colsMd ? colsMdClasses[colsMd] : ""
      } ${gapClasses[gap]} ${className}`}
    >
      {children}
    </Tag>
  );
}
