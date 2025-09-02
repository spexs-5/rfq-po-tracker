import React, { useState } from 'react';
import { Info } from 'lucide-react';
import InfoPanel, { initialData } from './InfoPanel';
import ProgressBar from './ProgressBar';

export default function TrackerWidget() {
  const [showInfo, setShowInfo] = useState(false);
  const [infoData, setInfoData] = useState(initialData);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md relative max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">RFQ/PO Tracker</h2>
      <ProgressBar data={infoData} />
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black">
        <Info size={20} />
      </button>
      {showInfo && (
        <InfoPanel
          data={infoData}
          setData={setInfoData}
          onClose={() => setShowInfo(false)}
        />
      )}
    </div>
  );
}