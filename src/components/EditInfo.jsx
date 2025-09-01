import React, { useState } from 'react';

const today = new Date().toISOString().split('T')[0];


export default function EditInfo({ data, onSave, onDelete, onCancel }) {
  const [form, setForm] = useState(data);

  const handleChange = (section, field, value) => {
    setForm(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleOptionalChange = (idx, field, value) => {
    const opts = [...form.poTracker.optionalEvents];
    opts[idx] = { ...opts[idx], [field]: value };
    setForm(prev => ({
      ...prev,
      poTracker: { ...prev.poTracker, optionalEvents: opts }
    }));
  };

  const save = () => onSave(form);

  const togglePoPlaced = (field) => {
    setForm(prev => ({
      ...prev,
      poPlaced: { ...prev.poPlaced, placed: field === 'placed' ? !prev.poPlaced.placed : prev.poPlaced.placed, noPo: field === 'noPo' ? !prev.poPlaced.noPo : prev.poPlaced.noPo }
    }));
  };

  const toggleOptional = (idx) => {
    const opts = [...form.poTracker.optionalEvents];
    opts[idx] = { ...opts[idx], enabled: !opts[idx].enabled };
    setForm(prev => ({
      ...prev,
      poTracker: { ...prev.poTracker, optionalEvents: opts }
    }));
  };

  return (
    <div className="max-w-3xl border rounded-lg p-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Information</h1>
        <div className="flex gap-2">
          <button onClick={save} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
          <button onClick={onDelete} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
          <button onClick={onCancel} className="px-3 py-1 bg-gray-500 text-white rounded">X</button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <label className="w-40 font-bold">Company Name:</label>
          <input type="text" value={form.companyName} onChange={e => setForm(prev=>({...prev, companyName:e.target.value}))} className="border rounded px-2 py-1 flex-1" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-40 font-bold">RFQ ID:</label>
          <input type="text" value={form.rfqId} onChange={e => setForm(prev=>({...prev, rfqId:e.target.value}))} className="border rounded px-2 py-1 flex-1" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-40 font-bold">Principal Name:</label>
          <input type="text" value={form.principalName} onChange={e => setForm(prev=>({...prev, principalName:e.target.value}))} className="border rounded px-2 py-1 flex-1" />
        </div>
      </div>

      <div className="space-y-4">
        {[['rfqSubmitted','RFQ Submitted'], ['quote','Quote / No Quote'], ['feedback','Feedback Received']].map(([key,label]) => (
          <div key={key} className="flex items-center gap-2 border-b pb-2">
            <input type="checkbox" checked={form[key].completed} onChange={e => handleChange(key,'completed',e.target.checked)} />
            <label className="font-bold min-w-[180px]">{label}</label>
            <input type="date" value={form[key].date || today} onChange={e=>handleChange(key,'date',e.target.value)} className="border rounded px-2 py-1" />
            <input type="text" value={form[key].notes} onChange={e=>handleChange(key,'notes',e.target.value)} placeholder="Notes" className="border rounded px-2 py-1 flex-1" />
          </div>
        ))}
        <div className="flex items-center gap-2 border-b pb-2">
          <label className="font-bold min-w-[180px]">PO Status:</label>
          <input type="checkbox" checked={form.poPlaced.placed} onChange={()=>togglePoPlaced('placed')} /> <label>PO Placed</label>
          <input type="checkbox" className="ml-2" checked={form.poPlaced.noPo} onChange={()=>togglePoPlaced('noPo')} /> <label>No PO</label>
          <input type="date" value={form.poPlaced.date || today} onChange={e=>handleChange('poPlaced','date',e.target.value)} className="border rounded px-2 py-1" />
          <input type="text" value={form.poPlaced.notes} onChange={e=>handleChange('poPlaced','notes',e.target.value)} placeholder="Notes" className="border rounded px-2 py-1 flex-1" />
        </div>
      </div>

      {form.poPlaced.placed && (
        <div className="mt-6" id="po-tracker">
          <h1 className="text-2xl font-bold mb-4">PO Tracker</h1>
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <input type="checkbox" checked={form.poTracker.poAccepted.completed} onChange={e=>setForm(prev=>({...prev, poTracker:{...prev.poTracker, poAccepted:{...prev.poTracker.poAccepted, completed:e.target.checked}}}))} />
              <label className="font-bold min-w-[180px]">PO Accepted</label>
              <input type="date" value={form.poTracker.poAccepted.date || today} onChange={e=>setForm(prev=>({...prev, poTracker:{...prev.poTracker, poAccepted:{...prev.poTracker.poAccepted, date:e.target.value}}}))} className="border rounded px-2 py-1" />
              <input type="text" value={form.poTracker.poAccepted.notes} onChange={e=>setForm(prev=>({...prev, poTracker:{...prev.poTracker, poAccepted:{...prev.poTracker.poAccepted, notes:e.target.value}}}))} placeholder="Notes" className="border rounded px-2 py-1 flex-1" />
            </div>
            {form.poTracker.optionalEvents.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2 border-b pb-2">
                <input type="checkbox" checked={opt.enabled} onChange={()=>toggleOptional(idx)} />
                <input type="text" value={opt.name} onChange={e=>handleOptionalChange(idx,'name',e.target.value)} placeholder="Optional Event Name" className="border rounded px-2 py-1" />
                <input type="date" value={opt.date || today} onChange={e=>handleOptionalChange(idx,'date',e.target.value)} className="border rounded px-2 py-1" />
                <input type="text" value={opt.notes} onChange={e=>handleOptionalChange(idx,'notes',e.target.value)} placeholder="Notes" className="border rounded px-2 py-1 flex-1" />
              </div>
            ))}
            <div className="flex items-center gap-2 border-b pb-2">
              <input type="checkbox" checked={form.poTracker.dueDate.completed} onChange={e=>setForm(prev=>({...prev, poTracker:{...prev.poTracker, dueDate:{...prev.poTracker.dueDate, completed:e.target.checked}}}))} />
              <label className="font-bold min-w-[180px]">Due Date</label>
              <input type="date" value={form.poTracker.dueDate.date || today} onChange={e=>setForm(prev=>({...prev, poTracker:{...prev.poTracker, dueDate:{...prev.poTracker.dueDate, date:e.target.value}}}))} className="border rounded px-2 py-1" />
              <input type="text" value={form.poTracker.dueDate.notes} onChange={e=>setForm(prev=>({...prev, poTracker:{...prev.poTracker, dueDate:{...prev.poTracker.dueDate, notes:e.target.value}}}))} placeholder="Notes" className="border rounded px-2 py-1 flex-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
