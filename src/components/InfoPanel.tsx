import React from "react";
import { RfqTracker, PoTracker } from "../types";

interface Props {
  item: RfqTracker | PoTracker;
  onClose: () => void;
}

export function InfoPanel({ item, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-widget-bg text-widget-text p-4 rounded w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg">{item.company}</h2>
          <button
            className="text-sm border px-2"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="text-sm mb-2">{item.rfqName}</div>
        {"events" in item && (
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(item.events, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
