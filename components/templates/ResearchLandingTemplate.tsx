import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface LandingEntry {
  title: string;
  description: string;
  href: string;
}

interface ResearchLandingTemplateProps {
  title: string;
  lede: string;
  entries: LandingEntry[];
  children?: ReactNode;
}

/**
 * Landing template for section overviews that fan out into several
 * sub-pages — Research today (First Principles, Research Method),
 * potentially Publications or Community later if they outgrow a flat
 * list. Distinct from Standard Page: the header is followed by an
 * entry-card grid rather than prose.
 */
export function ResearchLandingTemplate({
  title,
  lede,
  entries,
  children,
}: ResearchLandingTemplateProps) {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">{lede}</p>
        </header>

        {children && <div className="prose-page mt-10 max-w-2xl text-ink">{children}</div>}

        <Grid cols={1} colsMd={entries.length >= 3 ? 3 : 2} gap="lg" className="mt-12">
          {entries.map((entry) => (
            <Card key={entry.href} className="flex flex-col">
              <h2 className="font-serif text-lg font-semibold text-ink">{entry.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink-secondary">{entry.description}</p>
              <Button href={entry.href} variant="ghost" className="mt-4 self-start px-0">
                Read more →
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
