import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { getPublicationsBySubtype, getPublicationDetails } from "@/lib/domain/queries";
import { publicationHref } from "@/lib/domain/routes";

export const metadata: Metadata = {
  title: "White Papers",
  description:
    "Position and proposal papers from ICCRI, addressing specific questions within Idea-Centric Computing.",
};

export default function WhitePapersPage() {
  const papers = getPublicationsBySubtype("white-paper");

  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Publications
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink md:text-5xl">
            White Papers
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            Position and proposal papers addressing specific questions within
            Idea-Centric Computing.
          </p>
        </header>

        <Grid cols={1} colsMd={3} gap="lg" className="mt-12">
          {papers.map((entity) => {
            const details = getPublicationDetails(entity.id);
            return (
              <Card key={entity.id} as="article" className="flex flex-col">
                <h2 className="font-serif text-lg font-semibold text-ink">
                  <Link href={publicationHref(entity)} className="hover:text-accent">
                    {entity.title}
                  </Link>
                </h2>
                {details && (
                  <p className="mt-2 flex-1 text-sm text-ink-secondary">{details.summary}</p>
                )}
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
