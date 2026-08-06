/**
 * Platform Refresh v2.0 — leadership display metadata not
 * representable on the canonical PersonEntity type (id, kind, name,
 * roles only). Same architectural pattern as publicationMetadata.ts:
 * a separate, non-overlapping store merged with the canonical entity
 * at query time, rather than extending PersonEntity or PersonRole in
 * types/entity.ts (the Approved Engineering Baseline).
 *
 * Both Michael and Marivic carry the canonical role "founder" —
 * "Founder and Research Director" vs. "Co-Founder" is a display
 * title distinction, not a difference the canonical PersonRole
 * union is meant to express.
 *
 * Photos and biography text are the real assets and text provided
 * for this milestone — nothing here is generated or paraphrased
 * beyond trimming for length; see each entry's source.
 */
export interface LeadershipMetadata {
  displayTitle: string;
  bio: string;
  photoSrc: string;
  order: number;
}

export const leadershipMetadata: Record<string, LeadershipMetadata> = {
  "person:michael-g-hormachuelos": {
    displayTitle: "Founder and Research Director",
    bio: "Michael G. Hormachuelos, PhD, is the Founder of the Idea-Centric Computing Research Initiative (ICCRI), an independent research organization dedicated to advancing the frontiers of computing through bold ideas, interdisciplinary collaboration, and curiosity-driven inquiry. An educator, school leader, and independent researcher, Dr. Hormachuelos has more than two decades of experience in educational leadership, research, and innovation, with research interests spanning artificial intelligence, information theory, human-computer interaction, educational technology, computational science, and the theoretical foundations of computing. His recent body of work explores foundational questions in computation and intelligence through the Quantum Information Field Theory (QIFT) research program and the Consciousness-Assisted Knowledge Protocol (CAKP) framework, with research outputs archived through open-science repositories to encourage transparency, scholarly collaboration, and scientific discourse.",
    photoSrc: "/images/founder.png",
    order: 1,
  },
  "person:marivic-m-hormachuelos": {
    displayTitle: "Co-Founder",
    bio: "Marivic M. Hormachuelos, MAEd, is the Co-Founder of the Idea-Centric Computing Research Initiative (ICCRI). She is a Master Teacher II, college research instructor, and educational researcher with extensive experience in teaching, curriculum development, and research mentoring. She is a co-author of the Basic Education Research Fund (BERF)-supported action research \"Youth Encounter Program: Its Effect on Bullying and Teenage Pregnancy,\" which examined the impact of faith-based interventions on learner behavior and well-being. As Co-Founder of ICCRI, Marivic provides leadership in educational research, capacity building, and institutional development, helping advance ICCRI's mission of producing innovative, interdisciplinary, and socially relevant research.",
    photoSrc: "/images/co-founder.png",
    order: 2,
  },
};
