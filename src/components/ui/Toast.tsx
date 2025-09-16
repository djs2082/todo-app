import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Toast = { key: number; message: string; severity?: 'success' | 'error' | 'info' | 'warning' };

const ToastContext = createContext<{ show: (message: string, severity?: Toast['severity']) => void } | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (message: string, severity: Toast['severity'] = 'info') => {
    const key = Date.now() + Math.random();
    setToasts((s) => [...s, { key, message, severity }]);
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.key !== key));
    }, 4500);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toasts.map((t) => (
        <Snackbar key={t.key} open anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setToasts((s) => s.filter(x => x.key !== t.key))}>
          <Alert severity={t.severity} variant="filled">{t.message}</Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export default ToastProvider;
