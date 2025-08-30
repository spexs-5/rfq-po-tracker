import React, { useState } from "react";
import { RfqTracker } from "../types";
import { ProgressBar } from "./ProgressBar";
import { differenceInDays } from "date-fns";

interface Props {
  rfq: RfqTracker;
  onOpen: (rfq: RfqTracker) => void;
}

export function RfqCard({ rfq, onOpen }: Props) {
  const e = rfq.events;
  const now = new Date();
  const section = e.quoteFeedbackAt
    ? 3
    : e.quotedAt || e.noQuoteAt
    ? 2
    : 1;

  let percent = 0;
  let color = "#199B42"; // green
  if (section === 1 && e.rfqSubmittedAt) {
    const start = new Date(e.rfqSubmittedAt);
    const elapsed = differenceInDays(now, start);
    percent = Math.min((elapsed / 14) * 33.33, 33.33);
    if (elapsed >= 14) color = "#F53F1B"; // red
    else if (elapsed >= 7) color = "#F7C11D"; // yellow
  } else if (section === 2 && (e.quotedAt || e.noQuoteAt)) {
    const start = new Date(e.quotedAt || e.noQuoteAt!);
    const elapsed = differenceInDays(now, start);
    percent = 33.33 + Math.min((elapsed / 28) * 33.33, 33.33);
    if (elapsed >= 28) color = "#F53F1B"; // red
    else if (elapsed >= 21) color = "#F58717"; // orange
    else if (elapsed >= 14) color = "#F7C11D"; // yellow
  } else if (section === 3 && e.quoteFeedbackAt) {
    const start = new Date(e.quoteFeedbackAt);
    const elapsed = differenceInDays(now, start);
    percent = 66.66 + Math.min((elapsed / 90) * 33.33, 33.33);
  }

  return (
    <div
      className="border border-widget-border bg-widget-bg text-widget-text p-4 rounded cursor-pointer"
      onClick={() => onOpen(rfq)}
    >
      <div className="font-bold">RFQ Tracker</div>
      <div className="text-sm">{rfq.company}</div>
      <div className="text-sm">{rfq.rfqName}</div>
      <div className="text-sm">{rfq.principal}</div>
      <div className="mt-2">
        <ProgressBar
          segments={[{ percent, color }]}
          ticks={[33.33, 66.66]}
        />
      </div>
    </div>
  );
}
