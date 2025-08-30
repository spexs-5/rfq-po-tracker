import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import InfoPanel from './InfoPanel';

const tabs = ['Active', 'Completed'];

export default function POList() {
  const [activeTab, setActiveTab] = useState('Active');
  const [showInfo, setShowInfo] = useState(false);

  const placeholder = [{ id: 1, title: 'Sample PO' }];
  const steps = ['PO Submitted', 'Due Date'];

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
        {placeholder.map(po => (
          <div key={po.id} className="bg-white p-4 rounded shadow">
            <ProgressBar steps={steps} currentIndex={-1} onClick={() => setShowInfo(true)} />
            <p className="mt-2 font-medium">{po.title}</p>
          </div>
        ))}
      </div>
      {showInfo && <InfoPanel title="PO Details" onClose={() => setShowInfo(false)} />}
    </div>
  );
}
