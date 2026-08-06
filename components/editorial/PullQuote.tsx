import type { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

/**
 * The one shared pull-quote treatment for the whole site — the
 * Home page's Constitution quote and any future monograph/publication
 * pull-quote both use this instead of each authoring their own
 * blockquote styling (consistency finding from the Sprint 3 review).
 */
export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="max-w-2xl border-l-2 border-accent pl-6">
      <p className="font-serif text-2xl font-semibold leading-snug text-ink md:text-3xl">
        {children}
      </p>
      {attribution && <cite className="mt-4 block text-sm not-italic text-ink-muted">{attribution}</cite>}
    </blockquote>
  );
}
