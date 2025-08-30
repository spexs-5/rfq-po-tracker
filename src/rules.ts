import { differenceInMonths } from "date-fns";
import { useTrackerStore } from "./store";
import { PoTracker, RfqTracker } from "./types";

// Evaluate RFQ and PO trackers for time-based transitions
export function evaluateAll() {
  const { rfqs, pos, setRfqs, setPos } = useTrackerStore.getState();
  const now = new Date();

  const updatedRfqs: RfqTracker[] = rfqs.map((r) => ({ ...r }));
  const newPos: PoTracker[] = [...pos];

  updatedRfqs.forEach((rfq) => {
    if (rfq.status !== "active") return;
    const e = rfq.events;
    // Section 2 auto unsuccessful after 3 months
    if (
      (e.quotedAt || e.noQuoteAt) &&
      !e.quoteFeedbackAt &&
      differenceInMonths(now, new Date(e.quotedAt || e.noQuoteAt!)) >= 3
    ) {
      rfq.status = "unsuccessful";
      rfq.events.noPoAt = rfq.events.noPoAt ?? now.toISOString();
      return;
    }
    // Section 3 auto No PO after 3 months
    if (
      e.quoteFeedbackAt &&
      !e.poPlacedAt &&
      !e.noPoAt &&
      differenceInMonths(now, new Date(e.quoteFeedbackAt)) >= 3
    ) {
      rfq.events.noPoAt = now.toISOString();
      rfq.status = "unsuccessful";
      return;
    }
    // If PO placed -> convert to PO tracker
    if (e.poPlacedAt && rfq.status === "active") {
      rfq.status = "convertedToPO";
      const po: PoTracker = {
        id: Math.random().toString(36).slice(2),
        fromRfqId: rfq.id,
        company: rfq.company,
        rfqName: rfq.rfqName,
        principal: rfq.principal,
        events: {
          poSubmittedAt: e.poPlacedAt,
          dueDatePlannedAt: undefined,
          dueDateCompletedAt: undefined,
          optional: [],
        },
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      newPos.push(po);
    }
  });

  setRfqs(() => updatedRfqs);
  setPos(() => newPos);
}

// Run evaluateAll hourly
export function startRuleEngine() {
  evaluateAll();
  setInterval(evaluateAll, 1000 * 60 * 60);
}
