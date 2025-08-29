import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import InfoPanel from './InfoPanel';
import ProgressBar from './ProgressBar';

export default function TrackerWidget() {
  const [showInfo, setShowInfo] = useState(false);
  const [status, setStatus] = useState("RFQ Sent");

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md relative max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">RFQ/PO Tracker</h2>
      <ProgressBar status={status} />
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => setStatus("RFQ Sent")} 
          className="px-3 py-1 bg-blue-500 text-white rounded-lg">RFQ Sent</button>
        <button 
          onClick={() => setStatus("Quoted")} 
          className="px-3 py-1 bg-green-500 text-white rounded-lg">Quoted</button>
        <button 
          onClick={() => setStatus("PO Received")} 
          className="px-3 py-1 bg-purple-500 text-white rounded-lg">PO Received</button>
      </div>
      <button 
        onClick={() => setShowInfo(!showInfo)} 
        className="absolute top-2 right-2 text-gray-500 hover:text-black">
        <Info size={20} />
      </button>
      {showInfo && <InfoPanel onClose={() => setShowInfo(false)} />}
    </div>
  );
}