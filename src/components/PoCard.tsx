import React from "react";
import { PoTracker } from "../types";
import { ProgressBar } from "./ProgressBar";
import { differenceInDays } from "date-fns";

interface Props {
  po: PoTracker;
  onOpen: (po: PoTracker) => void;
}

export function PoCard({ po, onOpen }: Props) {
  const e = po.events;
  const now = new Date();
  if (!e.poSubmittedAt || !e.dueDatePlannedAt) return null;
  const start = new Date(e.poSubmittedAt);
  const end = new Date(e.dueDatePlannedAt);
  const total = differenceInDays(end, start);
  const elapsed = differenceInDays(now, start);
  let percent = Math.min((elapsed / total) * 100, 100);
  let color = "#199B42"; // green
  if (!e.dueDateCompletedAt && now > end) {
    percent = 100;
    color = "#F53F1B"; // red
  }
  const ticks = e.optional.map((o) => {
    const p = differenceInDays(new Date(o.plannedAt), start) / total;
    return p * 100;
  });
  return (
    <div
      className="border border-widget-border bg-widget-bg text-widget-text p-4 rounded cursor-pointer"
      onClick={() => onOpen(po)}
    >
      <div className="font-bold">PO Tracker</div>
      <div className="text-sm">{po.company}</div>
      <div className="text-sm">{po.rfqName}</div>
      <div className="text-sm">{po.principal}</div>
      <div className="mt-2">
        <ProgressBar segments={[{ percent, color }]} ticks={ticks} />
      </div>
    </div>
  );
}
