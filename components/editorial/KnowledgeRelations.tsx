import Link from "next/link";
import type { RelationshipKind } from "@/types/relationship";

export interface KnowledgeRelation {
  /**
   * Explicit relationship semantics, not generic navigation language
   * ("Related", "See Also"). Binding project policy from RC-3
   * onward. As of Phase 2A, this reuses the canonical
   * `RelationshipKind` from types/relationship.ts directly, rather
   * than maintaining a separate, hand-duplicated subset of it — one
   * vocabulary, per the Phase 2 Single Source of Truth principle.
   */
  verb: RelationshipKind;
  label: string;
  href: string;
}

interface KnowledgeRelationsProps {
  relations: KnowledgeRelation[];
}

/**
 * Closing section for knowledge pages (First Principles, Research
 * Method, Meta-Architecture, Computational Dimensions, Validation
 * Framework) and monograph pages — expresses the conceptual graph
 * described in the RC-3 Knowledge Publication Architecture as
 * hand-authored links with explicit relationship verbs, rather than
 * an implemented graph. Static and presentational only.
 */
export function KnowledgeRelations({ relations }: KnowledgeRelationsProps) {
  if (relations.length === 0) return null;
  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="font-serif text-lg font-semibold text-ink">
        How this connects
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {relations.map((rel) => (
          <li key={`${rel.verb}-${rel.href}`} className="text-sm">
            <span className="font-medium uppercase tracking-wide text-accent">
              {rel.verb}
            </span>{" "}
            <Link href={rel.href} className="text-ink-secondary hover:text-ink">
              {rel.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
