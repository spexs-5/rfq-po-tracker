import React from 'react';

export default function ProgressBar({ status }) {
  const steps = [
    { label: 'RFQ Sent', duration: 14 },
    { label: 'Quoted', duration: 14 },
    { label: 'PO Received', duration: 90 }
  ];

  const total = steps.reduce((sum, s) => sum + s.duration, 0);
  const start = 0;
  const end = total;

  // Build marker positions using T(p) = T_start + p * (T_end - T_start)
  let acc = 0;
  const markers = steps.map((step) => {
    acc += step.duration;
    const p = acc / total;
    const absolute = start + p * (end - start);
    return {
      label: step.label,
      position: (absolute / total) * 100
    };
  });

  const currentMarker = markers.find((m) => m.label === status);
  const progress = currentMarker ? currentMarker.position : 0;

  let color = 'bg-green-500';
  if (progress > 90) color = 'bg-red-500';
  else if (progress > 75) color = 'bg-yellow-500';

  return (
    <div className="relative w-full">
      <div className="h-2 bg-gray-200 rounded">
        <div className={`h-2 rounded ${color}`} style={{ width: `${progress}%` }} />
      </div>
      {markers.map((m) => (
        <div
          key={m.label}
          className="absolute top-0"
          style={{ left: `${m.position}%` }}
        >
          <div className="w-2 h-2 bg-gray-500 rounded-full -translate-x-1/2" />
          <p className="text-xs mt-1 -translate-x-1/2 whitespace-nowrap">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
