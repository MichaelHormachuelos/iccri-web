import type { Publication } from "./publication";

export interface MonographChapter {
  number: number;
  title: string;
  slug: string;
}

/**
 * A monograph is a Publication (type: "monograph") with a chapter
 * structure — the extra shape the Monograph reader template needs.
 */
export interface Monograph extends Publication {
  type: "monograph";
  seriesTitle?: string;
  chapters: MonographChapter[];
}
