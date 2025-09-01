import React from 'react';

function formatDate(date) {
  if (!date) return 'MM/DD/YYYY';
  const [y, m, d] = date.split('-');
  return `${m}/${d}/${y}`;
}

export default function AdditionalInfo({ data, onEdit, onClose }) {
  const { companyName, rfqId, principalName, rfqSubmitted, quote, feedback, poPlaced, poTracker } = data;
  return (
    <div className="max-w-3xl border rounded-lg p-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">RFQ Tracker</h1>
        <div className="flex gap-2">
          <button onClick={onEdit} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
          <button onClick={onClose} className="px-3 py-1 bg-red-600 text-white rounded">X</button>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <h2 className="text-lg">Company Name: {companyName || ''}</h2>
        <h2 className="text-lg">RFQ ID: {rfqId || ''}</h2>
        <h2 className="text-lg">Principal Name: {principalName || ''}</h2>
      </div>

      <div className="mt-6">
        {[{title:'RFQ Submitted', ...rfqSubmitted}, {title:'Quote / No Quote', ...quote}, {title:'Feedback Received', ...feedback}, {title:'PO Placed / No PO', ...poPlaced}].map((step, idx) => (
          <div key={idx} className="flex items-baseline border-b py-2">
            <h2 className="text-lg w-48 flex-shrink-0">{step.title}</h2>
            <span className="ml-4 text-gray-700">{formatDate(step.date)}</span>
            <span className="ml-4 text-gray-700">Notes: {step.notes}</span>
          </div>
        ))}
      </div>

      {poPlaced.placed && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">PO Tracker</h1>
          </div>
          <div>
            {[{title:'PO Accepted', ...poTracker.poAccepted}, ...poTracker.optionalEvents.filter(e=>e.enabled).map(e=>({title:e.name, ...e})), {title:'Due Date', ...poTracker.dueDate}].map((step, idx) => (
              <div key={idx} className="flex items-baseline border-b py-2">
                <h2 className="text-lg w-48 flex-shrink-0">{step.title}</h2>
                <span className="ml-4 text-gray-700">{formatDate(step.date)}</span>
                <span className="ml-4 text-gray-700">Notes: {step.notes}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
