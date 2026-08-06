import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";
import { monographs } from "@/lib/monographs";
import { getPublicationsBySubtype, getPublicationDetails } from "@/lib/domain/queries";
import { publicationHref } from "@/lib/domain/routes";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "ICCRI's published monograph series, white papers, and technical reports, alongside working papers and future publications as the research program grows.",
};

const workingPapers = [
  { title: "Working Paper", description: "Early-stage findings, open for discussion and critique." },
];

const future = [
  { title: "Future Publication", description: "Reserved for upcoming scholarly output." },
];

export default function PublicationsPage() {
  const whitePapers = getPublicationsBySubtype("white-paper");
  const technicalReports = getPublicationsBySubtype("technical-report");

  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
            Publications
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            ICCRI&rsquo;s published monograph series, white papers, and
            technical reports, alongside working papers and future
            publications as the research program grows.
          </p>
        </header>

        <section className="mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Monographs
            </h2>
            <Link
              href="/publications/monographs"
              className="text-sm text-ink-secondary hover:text-ink"
            >
              View all →
            </Link>
          </div>
          <p className="mt-2 text-sm text-ink-muted">Published</p>
          <Grid cols={1} colsMd={2} gap="lg" className="mt-6">
            {monographs.map((m) => (
              <Card key={m.slug} as="article" className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wide text-accent">
                  {m.seriesTitle}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-ink">
                  <Link
                    href={`/publications/monographs/${m.slug}`}
                    className="hover:text-accent"
                  >
                    {m.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-ink-secondary">
                  {m.summary}
                </p>
              </Card>
            ))}
          </Grid>
        </section>

        <section className="mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              White Papers
            </h2>
            <Link
              href="/publications/white-papers"
              className="text-sm text-ink-secondary hover:text-ink"
            >
              View all →
            </Link>
          </div>
          <p className="mt-2 text-sm text-ink-muted">Published</p>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            {whitePapers.map((entity) => {
              const details = getPublicationDetails(entity.id);
              return (
                <Card key={entity.id} as="article" className="flex flex-col">
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    <Link href={publicationHref(entity)} className="hover:text-accent">
                      {entity.title}
                    </Link>
                  </h3>
                  {details && (
                    <p className="mt-2 flex-1 text-sm text-ink-secondary">{details.summary}</p>
                  )}
                </Card>
              );
            })}
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Working Papers
          </h2>
          <p className="mt-2 text-sm text-ink-muted">In development</p>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            {workingPapers.map((item) => (
              <PlaceholderCard key={item.title} {...item} />
            ))}
          </Grid>
        </section>

        <section className="mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Technical Reports
            </h2>
            <Link
              href="/publications/technical-reports"
              className="text-sm text-ink-secondary hover:text-ink"
            >
              View all →
            </Link>
          </div>
          <p className="mt-2 text-sm text-ink-muted">Published</p>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            {technicalReports.map((entity) => {
              const details = getPublicationDetails(entity.id);
              return (
                <Card key={entity.id} as="article" className="flex flex-col">
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    <Link href={publicationHref(entity)} className="hover:text-accent">
                      {entity.title}
                    </Link>
                  </h3>
                  {details && (
                    <p className="mt-2 flex-1 text-sm text-ink-secondary">{details.summary}</p>
                  )}
                </Card>
              );
            })}
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Future Publications
          </h2>
          <p className="mt-2 text-sm text-ink-muted">Planned</p>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            {future.map((item) => (
              <PlaceholderCard key={item.title} {...item} />
            ))}
          </Grid>
        </section>
      </Container>
    </Section>
  );
}
