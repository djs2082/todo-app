import { create } from 'zustand';
import { ToastProps } from '@karya_app1/rain-js';

interface Toast {
  id?: string | number;
  message: string;
  variant: 'success' | 'error' | 'info' | 'warning';
  width?: string | number;
  height?: string | number;
  duration?: number; // in seconds, if 0 or undefined, no auto-dismiss
}

interface ToastState {
  toasts: ToastProps[];
  addToast: (toast: Toast) => string | number;
  removeToast: (id?: string | number) => void;
  clearAllToasts: () => void;
}

// Create a simple ID generator
let toastCounter = 0;
const generateId = () => {
  return `toast-${Date.now()}-${toastCounter++}`;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  // Add a new toast to the array
  addToast: (toast: Toast) => {
    const id = generateId();
    const item: ToastProps = {
      id,
      message: toast.message,
      variant: toast.variant,
      height: "60px",
      duration: toast?.duration ?? 5000
    };

    set((state) => ({
      toasts: [...state.toasts, item]
    }));
    if (item.duration && item.duration > 0) setTimeout(() => set((state) => ({ toasts: state.toasts.filter((i) => i.id !== id) })), item.duration * 1000);
    return id;
  },

  // Remove a specific toast by ID
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  },

  // Clear all toasts
  clearAllToasts: () => {
    set({ toasts: [] });
  }
}));


// Variant-specific helper methods
export const showSuccessToast = (toast: Toast) => {
  const id = generateId();
  return useToastStore.getState().addToast({ ...toast, variant: 'success', id });
};

export const showErrorToast = (toast: Toast) => {
  const id = generateId();
  return useToastStore.getState().addToast({ ...toast, variant: 'error', id });
};

export const showInfoToast = (toast: Toast) => {
  const id = generateId();
  return useToastStore.getState().addToast({ ...toast, variant: 'info', id });
};

export const showWarningToast = (toast: Toast) => {
  const id = generateId();
  return useToastStore.getState().addToast({ ...toast, variant: 'warning', id });
};

export const hideToast = (id: string | number) => {
  useToastStore.getState().removeToast(id);
};

export const clearToasts = () => {
  useToastStore.getState().clearAllToasts();
};

export default useToastStore;
