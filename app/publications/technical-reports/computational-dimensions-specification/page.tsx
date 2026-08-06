import type { Metadata } from "next";
import { PublicationTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import {
  getPublicationDetails,
  getKnowledgeRelationsFor,
  getReferencingRelationships,
} from "@/lib/domain/queries";

const id = "publication:computational-dimensions-specification";

export const metadata: Metadata = {
  title: "ICCRI Computational Dimensions v1.1",
  description:
    "The technical specification defining Identity, Time, and Context as the dimensions within which every Entity, Relationship, and Transformation exists and evolves.",
};

export default function ComputationalDimensionsSpecPage() {
  const details = getPublicationDetails(id);
  if (!details) throw new Error(`Domain publication details for '${id}' are missing`);

  return (
    <PublicationTemplate
      publication={{
        slug: "computational-dimensions-specification",
        title: details.title,
        type: "technical-report",
        authors: details.authors,
        publishedAt: details.publishedAt,
        summary: details.summary,
      }}
    >
      <section>
        <h2>Three dimensions, universally applied</h2>
        <p>
          Identity, Time, and Context are not additional categories
          alongside Entities, Relationships, and Transformations &mdash;
          they are the space within which all three operate. Every
          category participates in every dimension, though each
          participates differently: Entities persist through time,
          Relationships may emerge, evolve, or cease to apply, and
          Transformations are events occurring at specific moments.
        </p>
      </section>

      <section>
        <h2>Context, precisely</h2>
        <p>
          Version 1.1 redefines Context as the interpretive frame within
          which Entities, Relationships, and Transformations acquire
          meaning &mdash; disciplinary perspective, language, historical
          period, theoretical framework, methodological perspective.
          Context is explicitly not another Entity and not another
          Relationship; an earlier draft used entity-shaped examples and
          was revised specifically to remove that ambiguity.
        </p>
      </section>

      <section>
        <h2>Three invariants</h2>
        <p>
          Objects remain uniquely identifiable throughout their lifecycle.
          Every Transformation preserves its position within the
          historical evolution of knowledge &mdash; an Entity&rsquo;s history is
          derived from the sequence of Transformations it participates
          in, never stored as an independent second record. Relationships
          and Transformations retain the context within which they were
          created.
        </p>
      </section>

      <section>
        <h2>Status</h2>
        <p>
          Architecturally Frozen at version 1.1, following a formal
          review-and-revision cycle. Future revisions occur only through
          implementation experience or research findings, not further
          speculative refinement.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor(id)} />
      <ReferencedBy references={getReferencingRelationships(id)} />
    </PublicationTemplate>
  );
}
