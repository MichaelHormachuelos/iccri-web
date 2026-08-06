import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { monographs } from "@/lib/monographs";

export const metadata: Metadata = {
  title: "Monographs",
  description:
    "ICCRI's monograph series — book-length explorations of Idea-Centric Computing's theory and architecture.",
};

export default function MonographsPage() {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Publications
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink md:text-5xl">
            Monographs
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            Book-length explorations of Idea-Centric Computing&rsquo;s theory
            and architecture, published as ICCRI&rsquo;s founding monograph
            series.
          </p>
        </header>

        <Grid cols={1} colsMd={2} gap="lg" className="mt-12">
          {monographs.map((m) => (
            <Card key={m.slug} as="article" className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                {m.seriesTitle}
              </span>
              <h2 className="mt-2 font-serif text-lg font-semibold text-ink">
                <Link
                  href={`/publications/monographs/${m.slug}`}
                  className="hover:text-accent"
                >
                  {m.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink-secondary">
                {m.summary}
              </p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
