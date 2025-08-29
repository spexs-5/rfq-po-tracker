import React from 'react';

export default function InfoPanel({ onClose }) {
  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-4 rounded-xl shadow-md max-w-sm">
        <h3 className="text-lg font-bold mb-2">Event Details</h3>
        <p className="text-sm text-gray-600">Timestamp: {new Date().toLocaleString()}</p>
        <p className="mt-2">Notes: Example details about the step here.</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Close</button>
      </div>
    </div>
  );
}