import type { Metadata } from "next";
import { StandardPageTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import { getKnowledgeObject, getKnowledgeRelationsFor, getReferencingRelationships } from "@/lib/domain/queries";

export const metadata: Metadata = {
  title: "Computational Dimensions",
  description:
    "Identity, Time, and Context — the dimensions within which every entity, relationship, and transformation in Idea-Centric Computing exists and evolves.",
};

export default function ComputationalDimensionsPage() {
  const entity = getKnowledgeObject("computational-dimensions");
  if (!entity) {
    throw new Error("Domain entity 'computational-dimensions' is missing");
  }

  return (
    <StandardPageTemplate eyebrow="Research" title={entity.title} lede={entity.summary}>
      <section>
        <h2>Identity, Time, Context</h2>
        <p>
          Every entity, relationship, and transformation carries a
          persistent identity, exists within time, and is interpreted
          within a context. These three dimensions apply universally
          &mdash; they are not extra categories alongside Entities,
          Relationships, and Transformations, but the space within which
          all three operate.
        </p>
      </section>

      <section>
        <h2>Context, precisely</h2>
        <p>
          Context is the interpretive frame within which something
          acquires meaning &mdash; a disciplinary perspective, a language,
          a historical period, a theoretical framework. It is deliberately
          not another entity and not another relationship; a version of
          this document that once used entity-shaped examples was revised
          specifically to keep that distinction clear.
        </p>
      </section>

      <section>
        <h2>Status</h2>
        <p>
          Computational Dimensions is Architecturally Frozen at version
          1.1, following a formal review-and-revision cycle. Revisions
          from here occur only through implementation experience or
          research findings, not further speculative refinement.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor("computational-dimensions")} />
      <ReferencedBy references={getReferencingRelationships("computational-dimensions")} />
    </StandardPageTemplate>
  );
}
