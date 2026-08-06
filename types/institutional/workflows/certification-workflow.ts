import type { WorkflowDefinition } from "./shared";

/**
 * Certification Workflow. Pure data.
 *
 * This workflow's states are not the same set as CertificateEntity's
 * own `status` field (issued | revoked) — the first three states here
 * (verification, certificate-generation, signature, qr-generation)
 * precede the CertificateEntity even existing; a certificate id and
 * number are only assigned once generation completes. "Download" from
 * the milestone brief is deliberately not modeled as a state: an
 * issued certificate can be downloaded any number of times without
 * changing its status, so it's an event against the issued state
 * (see AnalyticsEventType), not a transition in this workflow.
 */
export type CertificationWorkflowState =
  | "publication-identified"
  | "verification"
  | "certificate-generation"
  | "signature"
  | "qr-generation"
  | "issued"
  | "revoked";

export const certificationWorkflow: WorkflowDefinition<CertificationWorkflowState> = {
  name: "Certification Workflow",
  states: [
    "publication-identified",
    "verification",
    "certificate-generation",
    "signature",
    "qr-generation",
    "issued",
    "revoked",
  ],
  initialState: "publication-identified",
  terminalStates: ["issued", "revoked"],
  transitions: [
    { from: "publication-identified", to: "verification", rule: "A published, real PublicationEntity is confirmed to exist before certification begins." },
    { from: "verification", to: "certificate-generation", rule: "Verification confirms authorship and publication status against the Domain layer's own records." },
    { from: "certificate-generation", to: "signature", rule: "A CertificateEntity is created (assigned an id and certificateNumber) before it can be signed." },
    { from: "signature", to: "qr-generation", rule: "At least one SignatureBlock (Research Director or Editor) is recorded before a verification token is generated." },
    { from: "qr-generation", to: "issued", rule: "A VerificationToken exists and CertificateEntity.status becomes issued." },
    { from: "issued", to: "revoked", rule: "An issued certificate may later be revoked; CertificateEntity.status becomes revoked." },
  ],
  invariants: [
    "A CertificateEntity cannot exist in this workflow before certificate-generation completes.",
    "A certificate cannot reach issued without at least one recorded SignatureBlock.",
    "Revocation is one-directional — a revoked certificate does not return to issued; a new certificate would be generated instead.",
    "Every issued certificate has exactly one VerificationToken.",
  ],
};
