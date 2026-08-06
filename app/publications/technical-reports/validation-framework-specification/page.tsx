import type { Metadata } from "next";
import { PublicationTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import {
  getPublicationDetails,
  getKnowledgeRelationsFor,
  getReferencingRelationships,
} from "@/lib/domain/queries";

const id = "publication:validation-framework-specification";

export const metadata: Metadata = {
  title: "ICCRI Validation Framework v1.0",
  description:
    "The technical specification governing how an ICCRI claim moves from observation to accepted principle.",
};

export default function ValidationFrameworkSpecPage() {
  const details = getPublicationDetails(id);
  if (!details) throw new Error(`Domain publication details for '${id}' are missing`);

  return (
    <PublicationTemplate
      publication={{
        slug: "validation-framework-specification",
        title: details.title,
        type: "technical-report",
        authors: details.authors,
        publishedAt: details.publishedAt,
        summary: details.summary,
      }}
    >
      <section>
        <h2>Five levels, five categories</h2>
        <p>
          A claim advances through Observation, Hypothesis, Architecture,
          Prototype, and Evidence. Support for a claim is drawn from five
          categories: Conceptual, Computational, Empirical, Comparative,
          and Community evidence. Reaching Architecture status &mdash;
          which the Meta-Architecture itself currently holds &mdash;
          means a claim is stable enough to build against, not that it
          has cleared the later, stricter bar of independently
          reproducible Evidence.
        </p>
      </section>

      <section>
        <h2>Five standards</h2>
        <p>
          A claim is treated as mature only once it satisfies logical
          consistency, architectural viability (expressible within the
          approved Meta-Architecture without special exceptions),
          implementability, empirical support, and independent
          reproducibility.
        </p>
      </section>

      <section>
        <h2>Falsifiability first</h2>
        <p>
          Every major claim must come with a credible way it could be
          shown wrong. No foundational principle is treated as
          permanent &mdash; the framework commits ICCRI to improving its
          theories over time rather than defending them.
        </p>
      </section>

      <section>
        <h2>Status</h2>
        <p>
          Certified Compatible with Observations against the frozen
          architectural corpus, with no contradictions found. This
          document also names the ICCRI website itself as the Phase II
          Reference Platform &mdash; the implementation later laboratory
          studies are expected to run against as the framework&rsquo;s later
          stages come into use.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor(id)} />
      <ReferencedBy references={getReferencingRelationships(id)} />
    </PublicationTemplate>
  );
}
