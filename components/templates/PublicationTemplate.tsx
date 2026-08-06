import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Publication } from "@/types/publication";

const typeLabels: Record<Publication["type"], string> = {
  monograph: "Monograph",
  "working-paper": "Working paper",
  "technical-report": "Technical report",
  "position-paper": "Position paper",
  "research-note": "Research note",
  standard: "Standard",
  "educational-resource": "Educational resource",
};

interface PublicationTemplateProps {
  publication: Publication;
  children: ReactNode;
}

/**
 * Detail template for a single publication (any PublicationType).
 * Header carries the type badge, title, authors, and date — per
 * Publication Manual Part IV, every publication should clearly
 * identify its category and authorship. Monograph reuses this
 * header via MonographTemplate rather than duplicating it.
 */
export function PublicationTemplate({ publication, children }: PublicationTemplateProps) {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl border-b border-border pb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            {typeLabels[publication.type]}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink md:text-4xl">
            {publication.title}
          </h1>
          <p className="mt-4 text-sm text-ink-secondary">
            {publication.authors.map((a) => a.name).join(", ")}
            {" · "}
            {publication.publishedAt}
          </p>
          <p className="mt-4 text-base text-ink-secondary">{publication.summary}</p>
        </header>

        <div className="editorial-body mt-10 text-ink">{children}</div>
      </Container>
    </Section>
  );
}
