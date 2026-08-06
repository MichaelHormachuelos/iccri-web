import type { ReactNode } from "react";

type CalloutTone = "note" | "definition";

interface CalloutBoxProps {
  children: ReactNode;
  label?: string;
  tone?: CalloutTone;
}

/**
 * Bordered aside for definitions, methodological notes, or context
 * that sits alongside — not inside — the main argument of a chapter.
 */
export function CalloutBox({ children, label, tone = "note" }: CalloutBoxProps) {
  const defaultLabel = tone === "definition" ? "Definition" : "Note";
  return (
    <aside className="rounded-lg border border-border bg-paper-raised p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        {label ?? defaultLabel}
      </p>
      <div className="mt-2 text-sm text-ink-secondary [&_p]:mt-2 [&_p:first-child]:mt-0">
        {children}
      </div>
    </aside>
  );
}
