import React, { useEffect, useState } from "react";
import { useTrackerStore } from "./store";
import { RfqCard } from "./components/RfqCard";
import { PoCard } from "./components/PoCard";
import { InfoPanel } from "./components/InfoPanel";
import { seedData } from "./seed";
import { startRuleEngine } from "./rules";
import { RfqTracker, PoTracker } from "./types";

const tabs = [
  "Active RFQ/PO Trackers",
  "Unsuccessful RFQs",
  "Completed POs",
];

export default function App() {
  const { rfqs, pos } = useTrackerStore();
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState<RfqTracker | PoTracker | null>(null);

  useEffect(() => {
    seedData();
    startRuleEngine();
  }, []);

  const activeRfqs = rfqs.filter((r) => r.status === "active");
  const activePos = pos.filter((p) => p.status === "active");
  const unsuccessfulRfqs = rfqs.filter((r) => r.status === "unsuccessful");
  const completedPos = pos.filter((p) => p.status === "completedPO");

  return (
    <div className="min-h-screen bg-tabs-bg text-tabs-text p-4">
      <div className="mb-4 flex gap-2">
        {tabs.map((t, idx) => (
          <button
            key={t}
            onClick={() => setTab(idx)}
            className={`px-3 py-1 border ${
              tab === idx ? "bg-widget-bg" : "bg-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeRfqs.map((r) => (
            <RfqCard key={r.id} rfq={r} onOpen={setSelected} />
          ))}
          {activePos.map((p) => (
            <PoCard key={p.id} po={p} onOpen={setSelected} />
          ))}
        </div>
      )}
      {tab === 1 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {unsuccessfulRfqs.map((r) => (
            <RfqCard key={r.id} rfq={r} onOpen={setSelected} />
          ))}
        </div>
      )}
      {tab === 2 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {completedPos.map((p) => (
            <PoCard key={p.id} po={p} onOpen={setSelected} />
          ))}
        </div>
      )}
      {selected && (
        <InfoPanel item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
