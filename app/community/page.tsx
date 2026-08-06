import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Building an international network of researchers, educators, developers, and innovators interested in advancing Idea-Centric Computing.",
};

export default function CommunityPage() {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
            Community
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            Building an international network of researchers, educators,
            developers, and innovators interested in advancing Idea-Centric
            Computing.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Join ICCRI
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            <PlaceholderCard
              title="Become a Contributor"
              description="Contribute research, review, or engineering effort to the initiative."
              label="Get Involved"
              cta={{ label: "Contact ICCRI", href: "/contact" }}
            />
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Collaborations
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            <PlaceholderCard
              title="Institutional Collaboration"
              description="Partnerships with universities, labs, and independent researchers."
            />
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Events
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            <PlaceholderCard
              title="Upcoming Events"
              description="Talks, workshops, and reading groups will be listed here."
            />
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Discussions
          </h2>
          <Grid cols={1} colsMd={3} gap="lg" className="mt-6">
            <PlaceholderCard
              title="Research Discussions"
              description="Open questions and community conversation around Idea-Centric Computing."
            />
          </Grid>
        </section>
      </Container>
    </Section>
  );
}
