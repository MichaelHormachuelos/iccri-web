import type { ElementType, ReactNode } from "react";

type SectionSpacing = "sm" | "md" | "lg";

interface SectionProps {
  children: ReactNode;
  as?: ElementType;
  spacing?: SectionSpacing;
  className?: string;
  id?: string;
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

/**
 * Vertical rhythm primitive for page-level sections. Composes with
 * Container for horizontal constraint; Section only owns the
 * vertical spacing scale so it stays consistent across pages.
 */
export function Section({
  children,
  as: Tag = "section",
  spacing = "md",
  className = "",
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </Tag>
  );
}
