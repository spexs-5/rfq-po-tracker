import React from 'react';

export default function ProgressBar({ steps = [], currentIndex = -1, onClick }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      {steps.map((step, idx) => (
        <div key={step} className="flex-1">
          <div className={`h-2 rounded-full ${idx <= currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <p className="text-xs text-center mt-1">{step}</p>
        </div>
      ))}
    </div>
  );
}
