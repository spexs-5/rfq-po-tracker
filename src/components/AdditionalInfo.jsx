import React from 'react';

/**
 * Presents additional RFQ/PO details in a full-width, equal-height container.
 * Tailwind classes have been removed in favor of basic HTML structure
 * so the component can be styled manually or with external stylesheets.
 */
export default function AdditionalInfo({ onEdit }) {
  return (
    <div style={containerStyle}>
      <div style={{ flex: 1 }}>
        <h3 style={titleStyle}>Additional Information</h3>
        <p style={bodyStyle}>
          Details about the current request or purchase order appear here.
        </p>
      </div>
      <button type="button" onClick={onEdit} style={buttonStyle}>
        Edit
      </button>
    </div>
  );
}

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  padding: '16px',
  boxSizing: 'border-box',
};

const titleStyle = {
  margin: '0 0 8px',
  fontSize: '18px',
  fontWeight: 'bold',
};

const bodyStyle = {
  margin: 0,
};

const buttonStyle = {
  alignSelf: 'flex-end',
  padding: '8px 16px',
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

