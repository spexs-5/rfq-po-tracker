import React from 'react';

function diffDays(start, end) {
  const ms = new Date(end) - new Date(start);
  return ms / (1000 * 60 * 60 * 24);
}

export default function ProgressBar({ data }) {
  const today = new Date();

  if (!data.poPlaced.placed) {
    const steps = [
      { title: 'RFQ Submitted', completed: data.rfqSubmitted.completed, date: data.rfqSubmitted.date },
      { title: 'Quote/No Quote', completed: data.quote.completed, date: data.quote.date },
      { title: 'Feedback Received', completed: data.feedback.completed, date: data.feedback.date },
      { title: 'PO Placed/No PO', completed: data.poPlaced.placed || data.poPlaced.noPo, date: data.poPlaced.date }
    ];
    steps.forEach((s, i) => (s.pos = (i / (steps.length - 1)) * 100));

    let lastCompleted = -1;
    steps.forEach((s, i) => { if (s.completed) lastCompleted = i; });
    const nextIdx = lastCompleted + 1;
    let width = 0;
    let color = 'bg-green-500';
    if (nextIdx < steps.length && lastCompleted >= 0) {
      const start = steps[lastCompleted].date;
      const limit = nextIdx === 1 || nextIdx === 2 ? 14 : 90; // days
      const elapsed = diffDays(start, today);
      const frac = Math.min(1, Math.max(0, elapsed / limit));
      const startPos = steps[lastCompleted].pos;
      const endPos = steps[nextIdx].pos;
      width = startPos + frac * (endPos - startPos);
      if (frac > 0.9) color = 'bg-red-500';
      else if (frac > 0.75) color = 'bg-yellow-500';
    } else if (lastCompleted >= 0) {
      width = steps[lastCompleted].pos;
    }

    return (
      <div className="w-full">
        <div className="relative h-2 bg-gray-200 rounded">
          <div className={`absolute h-2 ${color} rounded`} style={{ width: `${width}%` }} />
          {steps.map((s, i) => (
            <div
              key={i}
              className={`absolute -top-1 w-4 h-4 rounded-full border-2 ${i <= lastCompleted ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}`}
              style={{ left: `calc(${s.pos}% - 8px)` }}
            />
          ))}
        </div>
        <div className="relative mt-4 h-12 text-xs">
          {steps.map((s, i) => (
            <div key={i} className="absolute text-center" style={{ left: `${s.pos}%`, transform: 'translateX(-50%)' }}>
              <div className="font-semibold">{s.title}</div>
              <div>{s.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { poTracker } = data;
    const steps = [
      { title: 'PO Accepted', date: poTracker.poAccepted.date },
      ...poTracker.optionalEvents.filter(o => o.enabled).map(o => ({ title: o.name, date: o.date })),
      { title: 'Due Date', date: poTracker.dueDate.date }
    ];
    const start = poTracker.poAccepted.date;
    const end = poTracker.dueDate.date;
    const total = diffDays(start, end) || 1;
    steps.forEach(s => (s.pos = ((new Date(s.date) - new Date(start)) / (new Date(end) - new Date(start))) * 100));

    const elapsed = diffDays(start, today);
    const progress = Math.min(1, Math.max(0, elapsed / total));
    let color = 'bg-green-500';
    if (progress > 0.9) color = 'bg-red-500';
    else if (progress > 0.75) color = 'bg-yellow-500';

    return (
      <div className="w-full">
        <div className="relative h-2 bg-gray-200 rounded">
          <div className={`absolute h-2 ${color} rounded`} style={{ width: `${progress * 100}%` }} />
          {steps.map((s, i) => (
            <div
              key={i}
              className="absolute -top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-blue-600"
              style={{ left: `calc(${s.pos}% - 8px)` }}
            />
          ))}
        </div>
        <div className="relative mt-4 h-12 text-xs">
          {steps.map((s, i) => (
            <div key={i} className="absolute text-center" style={{ left: `${s.pos}%`, transform: 'translateX(-50%)' }}>
              <div className="font-semibold">{s.title}</div>
              <div>{s.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
