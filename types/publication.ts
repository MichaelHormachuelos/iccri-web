import type { Author } from "./author";

/**
 * Mirrors the publication categories defined in the ICCRI Publication
 * Manual, Part II.
 */
export type PublicationType =
  | "monograph"
  | "white-paper"
  | "working-paper"
  | "technical-report"
  | "position-paper"
  | "research-note"
  | "standard"
  | "educational-resource";

export interface Publication {
  slug: string;
  title: string;
  type: PublicationType;
  authors: Author[];
  publishedAt: string;
  summary: string;
}
