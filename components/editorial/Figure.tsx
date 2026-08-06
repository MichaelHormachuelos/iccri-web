import type { ReactNode } from "react";

interface FigureProps {
  children: ReactNode;
  caption: string;
  number?: number;
}

/**
 * Wraps a diagram (from components/diagrams) or future image with a
 * numbered caption, in the pattern scholarly publications use to
 * make figures referenceable from body text ("see Figure 2").
 */
export function Figure({ children, caption, number }: FigureProps) {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-border bg-paper-raised p-6">{children}</div>
      <figcaption className="mt-3 text-sm text-ink-secondary">
        {number !== undefined && <span className="font-medium text-ink">Figure {number}. </span>}
        {caption}
      </figcaption>
    </figure>
  );
}
