import { ResearchLandingTemplate } from "@/components/templates";
import { getAllKnowledgeObjects } from "@/lib/domain/queries";
import { knowledgeObjectHref } from "@/lib/domain/routes";

export default function ResearchPage() {
  const entries = getAllKnowledgeObjects().map((entity) => ({
    title: entity.title,
    description: entity.summary,
    href: knowledgeObjectHref(entity.id),
  }));

  return (
    <ResearchLandingTemplate
      title="Research"
      lede="ICCRI research follows a disciplined path from curiosity to conceptual clarity, from conceptual clarity to architectural design, and from architecture to empirical investigation."
      entries={entries}
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
