import React from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../../context/ThemeContext';

type ModalProps = {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
  maxWidth?: number | string;
};

export default function Modal({ open, title, onClose, children, maxWidth }: ModalProps) {
  const { theme } = useTheme();
  
  if (!open) return null;

  const resolvedMaxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : (maxWidth || '720px');

  // Common styles independent of theme
  const overlayStyles = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000,
    padding: 20,
  } as React.CSSProperties;

  const modalStyles = {
    borderRadius: 12,
    width: `min(${resolvedMaxWidth}, 100%)`,
    maxHeight: '90vh',
    overflow: 'auto',
  } as React.CSSProperties;

  const headerStyles = {
    padding: 14, 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  } as React.CSSProperties;

  const titleStyles = {
    fontWeight: 700,
  } as React.CSSProperties;

  const closeButtonStyles = {
    background: 'transparent',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
  } as React.CSSProperties;

  // Theme specific styles
  const themeOverlayStyles = theme === 'dark' 
    ? {
        ...overlayStyles,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.45))',
      }
    : {
        ...overlayStyles,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25))',
      };

  const themeModalStyles = theme === 'dark'
    ? {
        ...modalStyles,
        background: 'rgba(10,10,12,0.85)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        color: '#fff',
      }
    : {
        ...modalStyles,
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        color: '#0f172a',
      };

  const themeHeaderStyles = theme === 'dark'
    ? {
        ...headerStyles,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        color: '#fff',
      }
    : {
        ...headerStyles,
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        color: '#0f172a',
      };

  const themeCloseButtonStyles = theme === 'dark'
    ? {
        ...closeButtonStyles,
        color: '#fff',
      }
    : {
        ...closeButtonStyles,
        color: '#0f172a',
      };

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      style={themeOverlayStyles}
      onClick={onClose}
      className={`modal-overlay theme-${theme}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={themeModalStyles}
        className={`modal-content theme-${theme}`}
      >
        <div style={themeHeaderStyles}>
          <div style={titleStyles}>{title}</div>
          <button onClick={onClose} aria-label="Close modal" style={themeCloseButtonStyles}>✕</button>
        </div>
        <div style={{ padding: 18 }}>{children}</div>
      </div>
    </div>
  );
  
  return ReactDOM.createPortal(overlay, document.body);

  return ReactDOM.createPortal(overlay, document.body);
}
