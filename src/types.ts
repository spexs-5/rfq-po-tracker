export type ID = string;

export type RfqEventKey =
  | "rfqSubmitted"
  | "quotedOrNoQuote"
  | "quoteFeedback"
  | "poDecision";

export type PoEventKey = "poSubmitted" | "dueDate" | "optional";

export interface EventNote {
  body: string;
  updatedAt?: string; // ISO
}

export interface RfqEvents {
  rfqSubmittedAt?: string;
  quotedAt?: string;
  noQuoteAt?: string;
  quoteFeedbackAt?: string;
  poPlacedAt?: string;
  noPoAt?: string;
  notes?: Partial<Record<RfqEventKey, EventNote[]>>;
}

export interface PoOptionalEvent {
  id: ID;
  name: string;
  plannedAt: string;
  completedAt?: string;
  notes?: EventNote[];
}

export interface PoEvents {
  poSubmittedAt?: string;
  dueDatePlannedAt?: string;
  dueDateCompletedAt?: string;
  optional: PoOptionalEvent[];
  notes?: Record<string, EventNote[]>;
}

export type TrackerStatus = "active" | "unsuccessful" | "completedPO";

export interface RfqTracker {
  id: ID;
  company: string;
  rfqName: string;
  principal: string;
  events: RfqEvents;
  status: "active" | "unsuccessful" | "convertedToPO";
  createdAt: string;
  updatedAt: string;
}

export interface PoTracker {
  id: ID;
  fromRfqId: ID;
  company: string;
  rfqName: string;
  principal: string;
  events: PoEvents;
  status: "active" | "completedPO";
  createdAt: string;
  updatedAt: string;
}
