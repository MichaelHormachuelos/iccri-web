import type { Metadata } from "next";
import { StandardPageTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import {
  getKnowledgeObject,
  getKnowledgeRelationsFor,
  getReferencingRelationships,
} from "@/lib/domain/queries";

export const metadata: Metadata = {
  title: "Meta-Architecture",
  description:
    "The three-category structure ICCRI uses to describe everything within Idea-Centric Computing: Entities, Relationships, and Transformations.",
};

export default function MetaArchitecturePage() {
  const entity = getKnowledgeObject("meta-architecture");
  if (!entity) {
    throw new Error("Domain entity 'meta-architecture' is missing");
  }

  return (
    <StandardPageTemplate eyebrow="Research" title={entity.title} lede={entity.summary}>
      <section>
        <h2>Three categories</h2>
        <p>
          Entities are the things that exist &mdash; an idea, a concept, a
          publication, a person. Relationships are the named, persistent
          connections between them &mdash; one idea supporting another,
          extending it, or contradicting it. Transformations are the
          events that change entities or produce new ones &mdash; a
          refinement, a synthesis, a validation. Each category answers a
          different question, and the architecture is deliberately built
          so that none of the three can be used to stand in for another.
        </p>
      </section>

      <section>
        <h2>Status</h2>
        <p>
          The Meta-Architecture Specification holds Approved Engineering
          Baseline status &mdash; stable enough to build against, distinct
          from a claim of empirical validation. Its maturity, in that
          stricter sense, is tracked separately through the Validation
          Framework.
        </p>
      </section>

      <section>
        <h2>What remains open</h2>
        <p>
          Two questions are deliberately left to ongoing research rather
          than settled by this architecture: whether the idea or the
          relationship is the more fundamental computational unit, and
          what computational role understanding itself plays. Engineering
          proceeds on the structure above without waiting for either to
          resolve.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor("meta-architecture")} />
      <ReferencedBy references={getReferencingRelationships("meta-architecture")} />
    </StandardPageTemplate>
  );
}
