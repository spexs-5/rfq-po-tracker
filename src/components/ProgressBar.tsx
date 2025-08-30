import React from "react";

interface Segment {
  percent: number;
  color: string; // hex value
}

interface ProgressBarProps {
  segments: Segment[];
  ticks?: number[];
}

export function ProgressBar({ segments, ticks = [] }: ProgressBarProps) {
  return (
    <div className="relative w-full h-2 bg-progress-empty rounded">
      {segments.map((s, i) => (
        <div
          key={i}
          className="absolute left-0 top-0 h-2 rounded"
          style={{ width: `${s.percent}%`, backgroundColor: s.color }}
        />
      ))}
      {ticks.map((t) => (
        <div
          key={t}
          className="absolute top-0 bottom-0 w-0.5 bg-white"
          style={{ left: `${t}%` }}
        />
      ))}
    </div>
  );
}
