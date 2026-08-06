import type { AnyEntity, PublicationEntity } from "@/types/entity";

/**
 * Presentation-layer concern, deliberately kept out of
 * lib/domain/entities.ts — a URL is not a fact about a Domain
 * object, it's how the site happens to route to it today.
 */

/** All knowledge-object IDs match their route segment under /research/. */
export function knowledgeObjectHref(id: string): string {
  return `/research/${id}`;
}

const publicationSubtypePath: Record<PublicationEntity["subtype"], string> = {
  monograph: "monographs",
  "white-paper": "white-papers",
  "research-paper": "research-papers",
  "technical-report": "technical-reports",
};

/**
 * Publication entity IDs are namespaced ("publication:slug"); the
 * route uses the slug alone, under the path for that publication's
 * subtype (Phase 2C: monographs, white papers, and technical reports
 * each live at a different path, so this needs the whole entity, not
 * just its id, to route correctly).
 */
export function publicationHref(entity: PublicationEntity): string {
  const path = publicationSubtypePath[entity.subtype];
  const slug = entity.id.replace(/^publication:/, "");
  return `/publications/${path}/${slug}`;
}

/**
 * Resolves the correct href for any entity kind this Domain layer
 * currently models. Extend this switch, not each call site, when a
 * new entity kind gains a public route.
 */
export function entityHref(entity: AnyEntity): string {
  switch (entity.kind) {
    case "knowledge-object":
      return knowledgeObjectHref(entity.id);
    case "publication":
      return publicationHref(entity);
    default:
      return "/";
  }
}
