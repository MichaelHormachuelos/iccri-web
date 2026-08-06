import type { Metadata } from "next";
import { PublicationTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import {
  getPublicationDetails,
  getKnowledgeRelationsFor,
  getReferencingRelationships,
} from "@/lib/domain/queries";

const id = "publication:meta-architecture-specification";

export const metadata: Metadata = {
  title: "ICCRI Meta-Architecture Specification v1.0",
  description:
    "The technical specification defining Entities, Relationships, and Transformations as ICCRI's canonical Meta-Architecture.",
};

export default function MetaArchitectureSpecPage() {
  const details = getPublicationDetails(id);
  if (!details) throw new Error(`Domain publication details for '${id}' are missing`);

  return (
    <PublicationTemplate
      publication={{
        slug: "meta-architecture-specification",
        title: details.title,
        type: "technical-report",
        authors: details.authors,
        publishedAt: details.publishedAt,
        summary: details.summary,
      }}
    >
      <section>
        <h2>Canonical kinds</h2>
        <p>
          The specification enumerates the canonical membership of each
          category. Entities: Idea, Concept, Question, Knowledge Object
          (with subtypes First Principle, Framework, Theory, Method,
          Model, and Reference Architecture), Publication (Monograph,
          White Paper, Research Paper, Technical Report), Person
          (Founder, Researcher, Contributor, Reviewer, Editor), and
          Organization. Relationships: supports, extends, contradicts,
          questions, explains, implements, belongsTo, derivedFrom, cites,
          references, inspiredBy, and relatedTo &mdash; extended in
          Phase 2A to include motivates, documents, and evaluates once
          real published content required them. Transformations:
          Capture, Refinement, Synthesis, Decomposition, Generalization,
          Specialization, Validation, Publication, and Revision.
        </p>
      </section>

      <section>
        <h2>Six rules</h2>
        <p>
          An Entity shall never encode a Relationship as part of its own
          identity. A Relationship shall never represent a Transformation,
          and a Transformation shall never be represented merely as a
          static Relationship. A Publication is not itself the source of
          knowledge, is not the primary architectural object, and remains
          independent of the Knowledge Objects it communicates &mdash;
          multiple Publications may communicate the same Knowledge
          Object. The architecture shall remain flexible enough to
          accommodate future research findings without requiring a
          rewrite.
        </p>
      </section>

      <section>
        <h2>Status</h2>
        <p>
          Approved Engineering Baseline &mdash; stable enough for
          implementation, distinct from a claim of empirical validation.
          The internal hierarchy of Entities, and whether Idea or
          Relationship is the more fundamental computational unit, remain
          explicitly open research questions rather than settled by this
          specification.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor(id)} />
      <ReferencedBy references={getReferencingRelationships(id)} />
    </PublicationTemplate>
  );
}
