import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface StandardPageTemplateProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: ReactNode;
}

/**
 * Default template for content pages with no specialized layout need
 * (About, Contribute, Contact, governance pages, etc). Header block
 * (eyebrow + title + lede) followed by a reading-width prose area.
 * Most future pages should reach for this before building a bespoke
 * layout.
 */
export function StandardPageTemplate({
  eyebrow,
  title,
  lede,
  children,
}: StandardPageTemplateProps) {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink md:text-5xl">
            {title}
          </h1>
          {lede && <p className="mt-4 text-lg text-ink-secondary">{lede}</p>}
        </header>

        <div className="prose-page mt-12 max-w-2xl text-ink">{children}</div>
      </Container>
    </Section>
  );
}
