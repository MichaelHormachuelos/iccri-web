import type { Metadata } from "next";
import { StandardPageTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach ICCRI for research inquiries and collaboration.",
};

export default function ContactPage() {
  return (
    <StandardPageTemplate
      eyebrow="Contact"
      title="Contact ICCRI"
      lede="ICCRI is an early-stage research initiative. Formal contact channels are still being established."
    >
      <section>
        <h2>Institutional Email</h2>
        <p>
          An official institutional email address will be published here once
          established.
        </p>
      </section>

      <section>
        <h2>Future Collaboration</h2>
        <p>
          ICCRI welcomes interest from researchers, engineers, and
          institutions considering future collaboration. A structured
          intake process will be introduced as the community section of
          the site develops.
        </p>
      </section>

      <section>
        <h2>Research Inquiries</h2>
        <p>
          Questions about ICCRI&rsquo;s research program, publications, or the
          Idea-Centric Computing paradigm will be directed through this page
          once contact channels are live.
        </p>
      </section>
    </StandardPageTemplate>
  );
}
