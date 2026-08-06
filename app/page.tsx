import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PullQuote, Figure } from "@/components/editorial";
import { ParadigmShiftDiagram } from "@/components/diagrams/ParadigmShiftDiagram";
import { LeadershipCard } from "@/components/people/LeadershipCard";
import { getLeadership } from "@/lib/domain/queries";

const entryPoints = [
  {
    title: "Research",
    description:
      "Six foundational concepts connected through a real, citation-grounded knowledge graph — from First Principles to the Validation Framework.",
    href: "/research",
    cta: "Explore the research",
  },
  {
    title: "Publications",
    description:
      "Monographs, a white paper, and technical reports documenting the theory and architecture of Idea-Centric Computing.",
    href: "/publications",
    cta: "Read publications",
  },
  {
    title: "Community",
    description:
      "An interdisciplinary, international group of researchers, engineers, and collaborators contributing to the initiative.",
    href: "/community",
    cta: "Join the community",
  },
];

export default function HomePage() {
  const leadership = getLeadership();

  return (
    <>
      {/* Open with the problem, not the resolution. */}
      <Section as="main" spacing="lg">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            A research problem
          </p>
          <h1 className="mt-2 max-w-2xl font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Most valuable ideas never become anything.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-secondary">
            Not because they were bad ideas. Because computing was built
            around files, applications, and documents — not around the idea
            itself. An insight gets scattered across a notes app, a document,
            a chat log, and a folder of drafts. Nothing connects them.
            Eventually, most are simply forgotten.
          </p>
          <p className="mt-4 max-w-xl text-lg text-ink-secondary">
            ICCRI exists to investigate whether computing could be organized
            differently — around the idea, rather than the file that happens
            to hold it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/research" variant="primary">
              Explore the research
            </Button>
            <Button href="/about" variant="secondary">
              About ICCRI
            </Button>
          </div>
        </Container>
      </Section>

      {/* The signature visualization — the shift the site exists to explain. */}
      <Section spacing="md" className="border-t border-border">
        <Container>
          <Figure
            number={1}
            caption="Document-centric and application-centric computing both organize work around a container — a file, an app. Idea-Centric Computing proposes the idea itself as the organizing center, connected to related concepts, research, and drafts."
          >
            <ParadigmShiftDiagram />
          </Figure>
        </Container>
      </Section>

      <Section spacing="md" className="border-t border-border">
        <Container>
          <PullQuote attribution="From the ICCRI Founding Constitution">
            To establish a rigorous, open, and interdisciplinary research
            program that develops Idea-Centric Computing into a credible and
            practical computing paradigm.
          </PullQuote>
        </Container>
      </Section>

      <Section spacing="md" className="border-t border-border">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Where to start
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-8">
            {entryPoints.map((entry) => (
              <Card key={entry.href} className="flex flex-col">
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {entry.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-ink-secondary">
                  {entry.description}
                </p>
                <Button href={entry.href} variant="ghost" className="mt-4 self-start px-0">
                  {entry.cta} →
                </Button>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Human presence — real leadership, real photographs. */}
      <Section spacing="md" className="border-t border-border">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              Leadership
            </p>
            <Button href="/about" variant="ghost" className="px-0">
              Full profiles →
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-10">
            {leadership.map((profile) => (
              <LeadershipCard key={profile.id} profile={profile} compact />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
