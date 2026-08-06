import type { Metadata } from "next";
import { StandardPageTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How ICCRI's architecture and research program are governed, reviewed, and adjudicated.",
};

export default function GovernancePage() {
  return (
    <StandardPageTemplate
      eyebrow="Governance"
      title="Governance"
      lede="ICCRI's architecture and research program are governed through a structured, documented process rather than informal decision-making."
    >
      <section>
        <h2>The Research&ndash;Architecture&ndash;Engineering Cycle</h2>
        <p>
          Research proposes new ideas. Architecture stabilizes what is ready
          for implementation. Engineering review challenges assumptions
          before anything is built. Adjudication resolves disagreements.
          This cycle governs how ICCRI&rsquo;s architecture evolves.
        </p>
      </section>

      <section>
        <h2>Public governance documentation</h2>
        <p>
          Detailed governance records, architectural decisions, and their
          rationale are maintained as part of ICCRI&rsquo;s engineering
          practice. A public-facing archive of this documentation will be
          published here as the platform matures.
        </p>
      </section>
    </StandardPageTemplate>
  );
}
