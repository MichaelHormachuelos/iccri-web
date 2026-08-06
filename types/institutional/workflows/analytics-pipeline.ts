/**
 * Analytics Pipeline. Pure data — deliberately not a
 * WorkflowDefinition like the other five workflows in this
 * directory.
 *
 * The other workflows describe one entity moving through sequential
 * states (a submission is either draft or under-review, never both).
 * "Visitor -> Event -> Metric -> Dashboard -> Institutional Report"
 * isn't that shape: many visitors produce many events, many events
 * aggregate into one metric, many metrics compose one dashboard. It's
 * a data pipeline with a fan-in at every stage, not a state machine —
 * modeling it as a WorkflowDefinition would misrepresent it as
 * something that transitions, when it actually aggregates.
 */

export interface PipelineStage {
  name: string;
  /** What one unit of input to this stage looks like. */
  inputShape: string;
  /** What this stage produces — typically many-to-one relative to its input. */
  outputShape: string;
  rule: string;
}

export interface PipelineDefinition {
  name: string;
  stages: readonly PipelineStage[];
  invariants: readonly string[];
}

export const analyticsPipeline: PipelineDefinition = {
  name: "Analytics Pipeline",
  stages: [
    {
      name: "Visitor",
      inputShape: "A single site visit (not itself typed here — see Infrastructure layer, deferred).",
      outputShape: "Zero or more AnalyticsEvent records for that visit.",
      rule: "A visitor produces events through their actions; the visitor itself is not a stored entity in this domain model.",
    },
    {
      name: "Event",
      inputShape: "AnalyticsEvent (page-view, publication-download, citation, contact-submission, submission-created, payment-completed).",
      outputShape: "A discrete, timestamped record of one occurrence.",
      rule: "Every event has exactly one type and, where relevant, one relatedEntityId pointing at the Domain object it concerns.",
    },
    {
      name: "Metric",
      inputShape: "Many AnalyticsEvent records of a related type, over a period.",
      outputShape: "Metric (a single named, aggregated value).",
      rule: "A metric is always computed over a defined period and event type — it does not exist independent of both.",
    },
    {
      name: "Dashboard",
      inputShape: "Many Metric and Counter values.",
      outputShape: "A composed view for internal use.",
      rule: "A dashboard is a presentation composition of existing metrics; it does not define new ones.",
    },
    {
      name: "Institutional Report",
      inputShape: "One or more Dashboard views, over a defined period.",
      outputShape: "A formal, shareable summary (e.g. for a funding agency's reporting requirement — see the Funding Workflow's financial-reporting state).",
      rule: "A report is a point-in-time snapshot; it does not update after being produced.",
    },
  ],
  invariants: [
    "No stage in this pipeline stores data — see StorageProvider and AnalyticsProvider in services.ts for the deferred storage abstraction.",
    "Aggregation only ever flows forward (Visitor to Event to Metric to Dashboard to Report); a report never modifies the events it summarizes.",
    "No tracking mechanism, cookie, or identifier scheme is defined for 'Visitor' — that belongs to a future Infrastructure milestone, not this one.",
  ],
};
