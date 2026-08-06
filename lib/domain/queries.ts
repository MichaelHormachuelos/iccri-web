import type {
  AnyEntity,
  KnowledgeObject,
  KnowledgeObjectSubtype,
  PublicationEntity,
  PublicationSubtype,
  PersonEntity,
} from "@/types/entity";
import type { Relationship, RelationshipKind } from "@/types/relationship";
import type { Author } from "@/types/author";
import type { KnowledgeRelation } from "@/components/editorial/KnowledgeRelations";
import { entities } from "./entities";
import { leadershipMetadata } from "./leadershipMetadata";
import { relationships } from "./relationships";
import { entityHref } from "./routes";
import { publicationMetadata } from "./publicationMetadata";

/**
 * Phase 2A — the Domain Layer's query surface. Deliberately small:
 * exactly what's needed to render pages from real records instead of
 * hardcoded props, per the approved "minimum viable Domain Layer"
 * plan.
 *
 * `getEntity` returns the general `AnyEntity` union — callers that
 * know which kind they need should use the narrowing helpers below
 * instead of narrowing inline at each call site.
 */

export function getEntity(id: string): AnyEntity | undefined {
  return entities[id];
}

export function getKnowledgeObject(id: string): KnowledgeObject | undefined {
  const entity = getEntity(id);
  return entity?.kind === "knowledge-object" ? entity : undefined;
}

export function getPublicationEntity(id: string): PublicationEntity | undefined {
  const entity = getEntity(id);
  return entity?.kind === "publication" ? entity : undefined;
}

export function getPersonEntity(id: string): PersonEntity | undefined {
  const entity = getEntity(id);
  return entity?.kind === "person" ? entity : undefined;
}

export function getRelationship(id: string): Relationship | undefined {
  return relationships.find((r) => r.id === id);
}

export function getRelationshipsFrom(id: string): Relationship[] {
  return relationships.filter((r) => r.fromId === id);
}

export function getRelationshipsTo(id: string): Relationship[] {
  return relationships.filter((r) => r.toId === id);
}

// --- Stage 4: Domain Query Expansion -------------------------------------

export function getKnowledgeObjectsBySubtype(subtype: KnowledgeObjectSubtype): KnowledgeObject[] {
  return Object.values(entities).filter(
    (e): e is KnowledgeObject => e.kind === "knowledge-object" && e.subtype === subtype,
  );
}

/**
 * Every KnowledgeObject, in the order they're declared in entities.ts
 * — that declaration order is itself a deliberate editorial sequence
 * (First Principles and Research Method first, as the reading
 * journey the RC-3 Editorial Strategy recommended), not an accident
 * of object key iteration. Powers the Research landing page's entry
 * list (Phase 2B) so adding a knowledge object updates the landing
 * page automatically instead of needing a second, manually-curated
 * list kept in sync by hand.
 */
export function getAllKnowledgeObjects(): KnowledgeObject[] {
  return Object.values(entities).filter((e): e is KnowledgeObject => e.kind === "knowledge-object");
}

export function getPublicationsBySubtype(subtype: PublicationSubtype): PublicationEntity[] {
  return Object.values(entities).filter(
    (e): e is PublicationEntity => e.kind === "publication" && e.subtype === subtype,
  );
}

/** All publications authored (in any capacity) by a given person, via publicationMetadata's authorIds. */
export function getPublicationsByAuthor(personId: string): PublicationEntity[] {
  const publicationIds = Object.entries(publicationMetadata)
    .filter(([, meta]) => meta.authorIds.includes(personId))
    .map(([id]) => id);
  return publicationIds
    .map((id) => getPublicationEntity(id))
    .filter((p): p is PublicationEntity => Boolean(p));
}

// --- Stage 3: canonical-type reconciliation -------------------------------

function personEntityToAuthor(person: PersonEntity): Author {
  const roleLabels: Partial<Record<PersonEntity["roles"][number], string>> = {
    founder: "ICCRI Founder",
  };
  const role = person.roles.map((r) => roleLabels[r] ?? r).join(", ");
  return { name: person.name, role };
}

/** Public entry point to the same PersonEntity->Author adapter getPublicationDetails uses internally. */
export function getAuthor(personId: string): Author | undefined {
  const person = getPersonEntity(personId);
  return person ? personEntityToAuthor(person) : undefined;
}

export interface PublicationDetails extends PublicationEntity {
  authors: Author[];
  publishedAt: string;
  summary: string;
}

/**
 * Merges the canonical PublicationEntity (title) with Stage 3's
 * publicationMetadata (authors, date, summary) and resolves author
 * ids to presentation-shaped Author objects — the one place that
 * merge happens, so content modules like lib/monographs.ts don't
 * hand-type any of these facts a second time.
 */
export function getPublicationDetails(id: string): PublicationDetails | undefined {
  const entity = getPublicationEntity(id);
  const metadata = publicationMetadata[id];
  if (!entity || !metadata) return undefined;
  const authors = metadata.authorIds
    .map((authorId) => getPersonEntity(authorId))
    .filter((p): p is PersonEntity => Boolean(p))
    .map(personEntityToAuthor);
  return {
    ...entity,
    authors,
    publishedAt: metadata.publishedAt,
    summary: metadata.summary,
  };
}

/**
 * Resolves an entity's outbound relationships into the shape
 * KnowledgeRelations renders — the one place that resolution happens,
 * so pages don't each repeat "look up the target entity, derive its
 * href, map the fields." Works across entity kinds via entityHref.
 */
export function getKnowledgeRelationsFor(id: string): KnowledgeRelation[] {
  return getRelationshipsFrom(id).flatMap((rel) => {
    const target = getEntity(rel.toId);
    if (!target || !("title" in target)) return [];
    return [
      {
        verb: rel.kind,
        label: target.title,
        href: entityHref(target),
      },
    ];
  });
}

// --- Stage 5: demonstrating Domain value ----------------------------------

export interface ReferencingRelation {
  kind: RelationshipKind;
  sourceLabel: string;
  sourceHref: string;
}

/**
 * The capability RC-3's static architecture could not support: every
 * relationship that points AT this entity, aggregated from wherever
 * it was authored, without anything on this entity's own page having
 * to know about it in advance. Each of these facts lives on a
 * different page as an outbound relationship (see
 * lib/domain/relationships.ts); this is the first place they're ever
 * gathered back together.
 */
export function getReferencingRelationships(id: string): ReferencingRelation[] {
  return getRelationshipsTo(id).flatMap((rel) => {
    const source = getEntity(rel.fromId);
    if (!source || !("title" in source)) return [];
    return [
      {
        kind: rel.kind,
        sourceLabel: source.title,
        sourceHref: entityHref(source),
      },
    ];
  });
}

// --- Platform Refresh v2.0: Leadership -----------------------------------

export interface LeadershipProfile extends PersonEntity {
  displayTitle: string;
  bio: string;
  photoSrc: string;
}

/** All leadership entries, merged from the canonical PersonEntity and leadershipMetadata.ts, in display order. */
export function getLeadership(): LeadershipProfile[] {
  return Object.entries(leadershipMetadata)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([id, meta]) => {
      const person = getPersonEntity(id);
      if (!person) return null;
      const { order: _order, ...displayMeta } = meta;
      return { ...person, ...displayMeta };
    })
    .filter((p): p is LeadershipProfile => p !== null);
}
