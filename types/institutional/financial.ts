/**
 * Stage 4 — Sustainability & Financial Operations. Types only.
 *
 * Deliberately genericized: PaymentMethodCategory names categories,
 * not specific real providers. No payment gateway (GCash, Maya,
 * QR PH, any card network) is named anywhere here, even as an
 * unpopulated example — doing so would assert a real institutional
 * relationship with that provider, which doesn't exist. A future
 * provider integration would supply its own identifier when it
 * implements PaymentProvider; nothing here presumes which one.
 */

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type PaymentMethodCategory = "e-wallet" | "card" | "bank-transfer" | "other";

export type PaymentPurpose =
  | "publication-fee"
  | "membership-fee"
  | "donation"
  | "sponsorship"
  | "conference-registration"
  | "training-registration"
  | "certificate-fee"
  | "other-service";

export type InvoiceStatus = "issued" | "paid" | "void";

/** Precedes PaymentEntity in the Payment Workflow — a request for payment, not the payment itself. */
export interface InvoiceEntity {
  id: string;
  invoiceNumber: string;
  purpose: PaymentPurpose;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
}

export interface PaymentEntity {
  id: string;
  referenceNumber: string;
  /** Set once the invoice this payment settles is known; a payment need not always originate from an invoice. */
  invoiceId?: string;
  amount: number;
  currency: string;
  purpose: PaymentPurpose;
  methodCategory: PaymentMethodCategory;
  status: PaymentStatus;
  payerName?: string;
  receiptNumber?: string;
  notes?: string;
  createdAt: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  purpose: PaymentPurpose;
  methodCategory: PaymentMethodCategory;
}

export interface PaymentResult {
  status: PaymentStatus;
  referenceNumber: string;
}

/** Abstraction only. No credentials, no real provider named or integrated. A future concrete provider supplies its own id. */
export interface PaymentProvider {
  id: string;
  initiate(request: PaymentRequest): Promise<PaymentResult>;
}

/** Shape for future reporting — no aggregation logic, no storage, no data to report on yet. */
export interface RevenueSummary {
  periodLabel: string;
  totalsByPurpose: Partial<Record<PaymentPurpose, number>>;
  currency: string;
}
