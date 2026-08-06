import type { WorkflowDefinition } from "./shared";

/**
 * Payment Workflow. Pure data.
 *
 * Spans InvoiceEntity and PaymentEntity together — an invoice is
 * issued first, a payment settles it (or, per PaymentEntity's
 * optional invoiceId, sometimes doesn't originate from one at all).
 * "Accounting Record" from the milestone brief is modeled as a
 * transition, not a new entity — the accounting layer itself belongs
 * to a future Infrastructure milestone; here it's the point at which
 * a completed payment is treated as final and reportable.
 */
export type PaymentWorkflowState =
  | "invoice-issued"
  | "payment-requested"
  | "payment-received"
  | "receipt-generated"
  | "accounting-recorded"
  | "refunded";

export const paymentWorkflow: WorkflowDefinition<PaymentWorkflowState> = {
  name: "Payment Workflow",
  states: [
    "invoice-issued",
    "payment-requested",
    "payment-received",
    "receipt-generated",
    "accounting-recorded",
    "refunded",
  ],
  initialState: "invoice-issued",
  terminalStates: ["accounting-recorded", "refunded"],
  transitions: [
    { from: "invoice-issued", to: "payment-requested", rule: "InvoiceEntity.status is issued; a PaymentEntity is created referencing it, with PaymentEntity.status pending." },
    { from: "payment-requested", to: "payment-received", rule: "A PaymentProvider implementation reports success; PaymentEntity.status becomes completed." },
    { from: "payment-requested", to: "invoice-issued", rule: "A failed payment attempt (PaymentEntity.status failed) returns the invoice to issued for another attempt." },
    { from: "payment-received", to: "receipt-generated", rule: "PaymentEntity.receiptNumber is assigned once a receipt exists for a completed payment." },
    { from: "receipt-generated", to: "accounting-recorded", rule: "The completed, receipted payment is treated as final and reportable — see RevenueSummary." },
    { from: "accounting-recorded", to: "refunded", rule: "A previously recorded payment is refunded; PaymentEntity.status becomes refunded." },
  ],
  invariants: [
    "A PaymentEntity may exist without an InvoiceEntity (invoiceId is optional), but the workflow above assumes the invoice-led path unless noted otherwise.",
    "receiptNumber is assigned only to a payment that has reached payment-received.",
    "A refund can only occur from accounting-recorded — a payment cannot be refunded before it was ever recorded as final.",
    "InvoiceEntity.status void represents an invoice withdrawn before payment — a separate exit not shown as a numbered transition above, since it can occur from invoice-issued directly.",
  ],
};
