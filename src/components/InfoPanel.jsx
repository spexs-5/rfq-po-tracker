import React, { useState } from 'react';
import AdditionalInfo from './AdditionalInfo';
import EditInfo from './EditInfo';

const today = new Date().toISOString().split('T')[0];

export const initialData = {
  companyName: '',
  rfqId: '',
  principalName: '',
  rfqSubmitted: { completed: false, date: today, notes: '' },
  quote: { completed: false, date: today, notes: '' },
  feedback: { completed: false, date: today, notes: '' },
  poPlaced: { placed: false, noPo: false, date: today, notes: '' },
  poTracker: {
    poAccepted: { completed: false, date: today, notes: '' },
    optionalEvents: [
      { enabled: false, name: '', date: today, notes: '' },
      { enabled: false, name: '', date: today, notes: '' },
      { enabled: false, name: '', date: today, notes: '' }
    ],
    dueDate: { completed: false, date: today, notes: '' }
  }
};

export default function InfoPanel({ data, setData, onClose }) {
  const [editing, setEditing] = useState(false);

  const handleSave = (updated) => {
    setData(updated);
    setEditing(false);
  };

  const handleDelete = () => {
    setData(initialData);
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="p-4 rounded-xl shadow-md bg-white max-h-full overflow-y-auto">
        {editing ? (
          <EditInfo
            data={data}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <AdditionalInfo
            data={data}
            onEdit={() => setEditing(true)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
