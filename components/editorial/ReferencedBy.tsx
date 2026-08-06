import Link from "next/link";
import type { ReferencingRelation } from "@/lib/domain/queries";

interface ReferencedByProps {
  references: ReferencingRelation[];
}

/**
 * Renders an entity's inbound relationships — the reverse-navigation
 * capability introduced in Phase 2A Stage 5, extracted here in Stage
 * 6 once a second page needed it. Every fact rendered was authored on
 * a different page as an outbound relationship; this is the one place
 * they're gathered back together for a given entity.
 */
export function ReferencedBy({ references }: ReferencedByProps) {
  if (references.length === 0) return null;
  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="font-serif text-lg font-semibold text-ink">Referenced by</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {references.map((ref) => (
          <li key={`${ref.sourceHref}-${ref.kind}`} className="text-sm">
            <Link href={ref.sourceHref} className="text-ink-secondary hover:text-ink">
              {ref.sourceLabel}
            </Link>{" "}
            <span className="font-medium uppercase tracking-wide text-accent">
              {ref.kind}
            </span>{" "}
            this page.
          </li>
        ))}
      </ul>
    </section>
  );
}
