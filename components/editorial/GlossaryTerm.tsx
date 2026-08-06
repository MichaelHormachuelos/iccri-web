import type { ReactNode } from "react";

interface GlossaryTermProps {
  children: ReactNode;
  definition: string;
}

/**
 * Inline glossary term — dotted underline, native tooltip via title.
 * Deliberately dependency-free (no JS popover) for Sprint 3.5; a
 * richer hover-card treatment can replace this later without
 * changing the call sites.
 */
export function GlossaryTerm({ children, definition }: GlossaryTermProps) {
  return (
    <dfn
      title={definition}
      className="cursor-help border-b border-dotted border-ink-muted font-normal not-italic text-ink"
    >
      {children}
    </dfn>
  );
}
