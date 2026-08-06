import { StandardPageTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import { getKnowledgeObject, getKnowledgeRelationsFor, getReferencingRelationships } from "@/lib/domain/queries";

export default function FirstPrinciplesPage() {
  const entity = getKnowledgeObject("first-principles");
  if (!entity) {
    throw new Error("Domain entity 'first-principles' is missing");
  }

  return (
    <StandardPageTemplate eyebrow="Research" title={entity.title} lede={entity.summary}>
      <section>
        <h2>Why first principles?</h2>
        <p>
          Whenever practical, ICCRI researchers identify the most fundamental
          concepts underlying a problem rather than accepting existing
          categories without examination. This means asking: What is the
          smallest meaningful unit? Which assumptions are inherited? Which
          assumptions can be challenged? What remains unexplained?
        </p>
        <p>
          This process promotes conceptual innovation while remaining
          grounded in logical reasoning. Technology changes rapidly; first
          principles endure.
        </p>
      </section>

      <section>
        <h2>Architecture before implementation</h2>
        <p>
          Ideas become clearer when they are organized. ICCRI encourages
          researchers to develop conceptual models and reference
          architectures before investing significant effort in
          implementation — architecture serves as the bridge between theory
          and engineering.
        </p>
      </section>

      <section>
        <h2>Validation before acceptance</h2>
        <p>
          Conceptual elegance alone does not establish truth. Every proposal
          remains provisional until evaluated through appropriate evidence.
          The method distinguishes clearly between observations, hypotheses,
          conceptual frameworks, architectural models, and validated
          findings.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor("first-principles")} />
      <ReferencedBy references={getReferencingRelationships("first-principles")} />
    </StandardPageTemplate>
  );
}
