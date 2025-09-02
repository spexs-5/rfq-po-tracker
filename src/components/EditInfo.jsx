import React, { useState } from 'react';
/**
 * Editing interface for RFQ/PO notes. The layout mirrors the static
 * AdditionalInfo component but provides controls for modifying content.
 * Tailwind has been removed in favor of simple HTML structures and inline styles.
 */
export default function EditInfo({ initialNotes = '', onSave, onCancel }) {
  const [notes, setNotes] = useState(initialNotes);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(notes);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <label htmlFor="notes" style={labelStyle}>Notes</label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={textareaStyle}
      />
      <div style={actionsStyle}>
        {onCancel && (
          <button type="button" onClick={onCancel} style={cancelButtonStyle}>
            Cancel
          </button>
        )}
        <button type="submit" style={saveButtonStyle}>
          Save
        </button>
      </div>
    </form>
  );
}

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  padding: '16px',
  boxSizing: 'border-box',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '8px',
};

const textareaStyle = {
  flex: 1,
  resize: 'none',
  padding: '8px',
  marginBottom: '16px',
};

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
};

const buttonBase = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  ...buttonBase,
  backgroundColor: '#e5e7eb',
};

const saveButtonStyle = {
  ...buttonBase,
  backgroundColor: '#16a34a',
  color: '#fff',
};

