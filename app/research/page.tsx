import { ResearchLandingTemplate } from "@/components/templates";

export default function ResearchPage() {
  return (
    <ResearchLandingTemplate
      title="Research"
      lede="ICCRI research follows a disciplined path from curiosity to conceptual clarity, from conceptual clarity to architectural design, and from architecture to empirical investigation."
      entries={[
        {
          title: "First Principles",
          description:
            "Why Idea-Centric Computing research begins by questioning fundamental assumptions rather than improving existing tools.",
          href: "/research/first-principles",
        },
        {
          title: "Research Method",
          description:
            "The seven-stage ICCRI Research Method — from discovery through publication — and how it complements established research methodologies.",
          href: "/research/method",
        },
      ]}
    >
      <p>
        Emerging fields often begin with uncertainty, before a research
        problem, its variables, or an intervention have been clearly defined.
        The ICCRI Research Method addresses this earlier stage of inquiry —
        the systematic discovery, conceptualization, architectural design,
        and validation of emerging ideas before they mature into established
        theories or engineered systems.
      </p>
    </ResearchLandingTemplate>
  );
}
