import type { Metadata } from "next";
import { StandardPageTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import { getKnowledgeObject, getKnowledgeRelationsFor, getReferencingRelationships } from "@/lib/domain/queries";

export const metadata: Metadata = {
  title: "Validation Framework",
  description:
    "How a claim moves from observation to accepted principle within ICCRI, and what evidence is required at each stage.",
};

export default function ValidationFrameworkPage() {
  const entity = getKnowledgeObject("validation-framework");
  if (!entity) {
    throw new Error("Domain entity 'validation-framework' is missing");
  }

  return (
    <StandardPageTemplate eyebrow="Research" title={entity.title} lede={entity.summary}>
      <section>
        <h2>Five levels</h2>
        <p>
          A claim moves through five stages: Observation, Hypothesis,
          Architecture, Prototype, and Evidence. Reaching Architecture
          status &mdash; the level the Meta-Architecture itself currently
          holds &mdash; means a claim is stable enough to build against.
          It is a distinct, earlier claim than Evidence, which requires
          real implementation and independently reproducible results.
        </p>
      </section>

      <section>
        <h2>Falsifiability first</h2>
        <p>
          Every major claim ICCRI advances must come with a credible way
          it could be shown wrong. No foundational principle is treated
          as permanent; the commitment is to improving ICCRI&rsquo;s
          theories over time, not defending them.
        </p>
      </section>

      <section>
        <h2>This website&rsquo;s role</h2>
        <p>
          This site is named, within the Validation Framework, as ICCRI&rsquo;s
          reference platform &mdash; the implementation later laboratory
          studies are expected to run against as the framework&rsquo;s later
          stages come into use.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor("validation-framework")} />
      <ReferencedBy references={getReferencingRelationships("validation-framework")} />
    </StandardPageTemplate>
  );
}
