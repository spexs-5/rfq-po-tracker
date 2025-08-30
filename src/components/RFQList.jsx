import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import InfoPanel from './InfoPanel';

const tabs = ['Active', 'Completed', 'Unsuccessful'];

export default function RFQList() {
  const [activeTab, setActiveTab] = useState('Active');
  const [showInfo, setShowInfo] = useState(false);

  const placeholder = [{ id: 1, title: 'Sample RFQ' }];
  const steps = ['RFQ Received', 'Submitted', 'Quoted', 'Feedback', 'PO Placed'];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {placeholder.map(rfq => (
          <div key={rfq.id} className="bg-white p-4 rounded shadow">
            <ProgressBar steps={steps} currentIndex={-1} onClick={() => setShowInfo(true)} />
            <p className="mt-2 font-medium">{rfq.title}</p>
          </div>
        ))}
      </div>
      {showInfo && <InfoPanel title="RFQ Details" onClose={() => setShowInfo(false)} />}
    </div>
  );
}
