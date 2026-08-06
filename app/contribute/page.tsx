import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Future opportunities to contribute to ICCRI through research, engineering, academic partnership, and community participation.",
};

const opportunities = [
  {
    title: "Research Collaboration",
    description: "Contribute to open research questions within Idea-Centric Computing.",
  },
  {
    title: "Technical Contributions",
    description: "Contribute engineering effort toward ICCRI's reference implementations.",
  },
  {
    title: "Academic Partnerships",
    description: "Explore institutional collaboration with ICCRI's research program.",
  },
  {
    title: "Community Participation",
    description: "Join discussions, events, and reading groups as they launch.",
  },
];

export default function ContributePage() {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
            Contribute
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            ICCRI is an early-stage research initiative. Structured
            contribution pathways are being developed — here is what to
            expect.
          </p>
        </header>

        <Grid cols={1} colsMd={2} gap="lg" className="mt-12">
          {opportunities.map((item) => (
            <PlaceholderCard key={item.title} {...item} label="Future Opportunity" />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
