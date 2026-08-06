import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";

export const metadata: Metadata = {
  title: "Research Projects",
  description:
    "Explore ongoing and planned ICCRI research initiatives investigating the future of Idea-Centric Computing.",
};

const active = [
  { title: "Active Project", description: "Currently under investigation by ICCRI researchers." },
];

const planned = [
  { title: "Planned Project", description: "Scoped for a future research cycle." },
];

const milestones = [
  { title: "Founding Milestone", description: "ICCRI's founding and the initial research program." },
];

export default function ProjectsPage() {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
            Research Projects
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            Explore ongoing and planned ICCRI research initiatives
            investigating the future of Idea-Centric Computing.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Active Projects
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            {active.map((item) => (
              <PlaceholderCard key={item.title} {...item} />
            ))}
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Planned Projects
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            {planned.map((item) => (
              <PlaceholderCard key={item.title} {...item} />
            ))}
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Completed Milestones
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            {milestones.map((item) => (
              <PlaceholderCard key={item.title} {...item} label="Milestone" />
            ))}
          </Grid>
        </section>
      </Container>
    </Section>
  );
}
