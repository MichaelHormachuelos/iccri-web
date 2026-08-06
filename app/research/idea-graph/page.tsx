import type { Metadata } from "next";
import { StandardPageTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import {
  getKnowledgeObject,
  getKnowledgeRelationsFor,
  getReferencingRelationships,
} from "@/lib/domain/queries";

export const metadata: Metadata = {
  title: "The Idea Graph",
  description:
    "A living, evolving network of ideas and their semantic relationships, in which both ideas and relationships are first-class computational objects.",
};

export default function IdeaGraphPage() {
  const entity = getKnowledgeObject("idea-graph");
  if (!entity) {
    throw new Error("Domain entity 'idea-graph' is missing");
  }

  return (
    <StandardPageTemplate eyebrow="Research" title={entity.title} lede={entity.summary}>
      <section>
        <h2>A different kind of structure</h2>
        <p>
          Most representations of knowledge stop at storing entities and
          the links between them. The Idea Graph is proposed as something
          more restless: a graph with no fixed beginning or end, which
          grows, splits, merges, refines, questions itself, and learns.
          Unlike a document, it is never finished.
        </p>
      </section>

      <section>
        <h2>From Idea Graph to Idea Evolution Graph</h2>
        <p>
          The concept develops across the monograph series. It is first
          introduced as ICCRI&rsquo;s own original computational construct —
          ideas and their relationships as first-class objects. Later work
          gives it a more specific structure: nodes, layered with semantic
          relationships, layered with transformation history, producing a
          current knowledge state. That structure is built directly from
          the Meta-Architecture&rsquo;s own categories &mdash; Entities,
          Relationships, and Transformations &mdash; rather than inventing
          a separate vocabulary.
        </p>
      </section>

      <section>
        <h2>Status</h2>
        <p>
          Unlike Meta-Architecture, Computational Dimensions, and the
          Validation Framework, the Idea Graph has not been through formal
          architectural adjudication &mdash; it remains a construct
          proposed within the monographs themselves, not yet an approved
          engineering specification. It is presented here as a real,
          citable idea from the published research, at the maturity level
          the corpus actually supports today.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor("idea-graph")} />
      <ReferencedBy references={getReferencingRelationships("idea-graph")} />
    </StandardPageTemplate>
  );
}
