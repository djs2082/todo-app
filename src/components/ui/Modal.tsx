import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
  maxWidth?: number | string;
};

export default function Modal({ open, title, onClose, children, maxWidth }: ModalProps) {
  if (!open) return null;

  const resolvedMaxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : (maxWidth || '720px');

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.45))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--card-bg, #fff)',
          borderRadius: 12,
          width: `min(${resolvedMaxWidth}, 100%)`,
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ padding: 14, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700 }}>{title}</div>
          <button onClick={onClose} aria-label="Close modal" style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: 18 }}>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}
