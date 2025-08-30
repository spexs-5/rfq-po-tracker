import { useTrackerStore } from "./store";
import { RfqTracker, PoTracker } from "./types";

export function seedData() {
  const { rfqs, pos, setRfqs, setPos } = useTrackerStore.getState();
  if (rfqs.length || pos.length) return;

  const now = new Date();
  const iso = (d: Date) => d.toISOString();

  const rfqActive: RfqTracker = {
    id: "rfq-active",
    company: "ABC Corp",
    rfqName: "Widget RFQ",
    principal: "John Doe",
    events: {
      rfqSubmittedAt: iso(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
    },
    status: "active",
    createdAt: iso(now),
    updatedAt: iso(now),
  };

  const rfqUnsuccess: RfqTracker = {
    id: "rfq-unsuccess",
    company: "XYZ Inc",
    rfqName: "Gadget RFQ",
    principal: "Jane Smith",
    events: {
      rfqSubmittedAt: iso(new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000)),
      quotedAt: iso(new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)),
      noPoAt: iso(new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)),
    },
    status: "unsuccessful",
    createdAt: iso(now),
    updatedAt: iso(now),
  };

  const rfqConverted: RfqTracker = {
    id: "rfq-converted",
    company: "Mega Corp",
    rfqName: "Bolt RFQ",
    principal: "Alice",
    events: {
      rfqSubmittedAt: iso(new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000)),
      quotedAt: iso(new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000)),
      quoteFeedbackAt: iso(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)),
      poPlacedAt: iso(new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000)),
    },
    status: "convertedToPO",
    createdAt: iso(now),
    updatedAt: iso(now),
  };

  const poActive: PoTracker = {
    id: "po-active",
    fromRfqId: "rfq-converted",
    company: "Mega Corp",
    rfqName: "Bolt RFQ",
    principal: "Alice",
    events: {
      poSubmittedAt: iso(new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000)),
      dueDatePlannedAt: iso(new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)),
      dueDateCompletedAt: undefined,
      optional: [],
    },
    status: "active",
    createdAt: iso(now),
    updatedAt: iso(now),
  };

  const poCompleted: PoTracker = {
    id: "po-completed",
    fromRfqId: "rfq-some",
    company: "Foo Co",
    rfqName: "Nut RFQ",
    principal: "Bob",
    events: {
      poSubmittedAt: iso(new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)),
      dueDatePlannedAt: iso(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)),
      dueDateCompletedAt: iso(new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000)),
      optional: [],
    },
    status: "completedPO",
    createdAt: iso(now),
    updatedAt: iso(now),
  };

  setRfqs(() => [rfqActive, rfqUnsuccess, rfqConverted]);
  setPos(() => [poActive, poCompleted]);
}
