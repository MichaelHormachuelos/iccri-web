/**
 * Stage 3 — Publication Certification. Types only — no PDF
 * generation, no QR service, no signing service. CertificateGenerator
 * is an abstraction any future implementation could satisfy; it does
 * not generate anything today.
 */

export type CertificateStatus = "issued" | "revoked";

export interface SignatureBlock {
  signerRole: "research-director" | "editor";
  signedAt?: string;
}

export interface CertificateEntity {
  id: string;
  certificateNumber: string;
  /** References a PublicationEntity id, e.g. "publication:meta-architecture". */
  publicationId: string;
  authorNames: string[];
  issuedAt: string;
  status: CertificateStatus;
  signatures: SignatureBlock[];
}

export interface VerificationToken {
  token: string;
  certificateId: string;
  createdAt: string;
}

/** Abstraction only — no PDF/QR/signing implementation exists. */
export interface CertificateGenerator {
  generate(certificate: CertificateEntity): Promise<unknown>;
}
