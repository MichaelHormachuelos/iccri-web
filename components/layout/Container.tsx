import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Constrains content to the page's readable max-width and applies
 * consistent horizontal gutters. Every top-level section should be
 * wrapped in exactly one Container.
 */
export function Container({
  children,
  as: Tag = "div",
  className = "",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
