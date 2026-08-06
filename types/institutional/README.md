# Institutional Domain Model — status

**Proposed, not adjudicated.** Everything under `types/institutional/`
is a separate domain model from the Approved Meta-Architecture
Specification (`types/entity.ts`, `types/relationship.ts`,
`types/transformation.ts`). None of it extends the canonical
`EntityKind`, `RelationshipKind`, or `TransformationKind` unions —
doing so would be a canonical-domain-model change under Engineering
Principle 7, requiring RAE Cycle review, not something introduced as
routine execution.

**Types only. Zero runtime, zero persistence, zero populated data.**
Every interface here defines identity, lifecycle, and shape — the same
way `KnowledgeObject` and `PublicationEntity` existed as pure types for
months before Phase 2A gave them real records. Nothing here is wired
into any page, route, or data source. There is no `entities.ts`
equivalent with actual instances, because there is no real
institutional data to populate it with yet — inquiries, submissions,
payments, and grants don't exist for ICCRI today.

**Deliberately genericized, not fabricated.** Payment methods, funding
agencies, and providers are modeled as extensible categories, not as
specific real-world services or institutions. No payment provider
(GCash, Maya, credit card networks) and no funding agency is named
anywhere in this model — doing so, even as an unpopulated type, would
assert a real institutional relationship that doesn't exist.

Files:
- `communication.ts` — contact/inquiry lifecycle
- `submission.ts` — research submission and review lifecycle
- `certification.ts` — publication certificate lifecycle
- `financial.ts` — payment lifecycle and provider abstraction
- `funding.ts` — grant and funding-agency lifecycle
- `analytics.ts` — event/metric shapes
- `services.ts` — Layer 2 service interfaces (Email, Storage), no implementation
