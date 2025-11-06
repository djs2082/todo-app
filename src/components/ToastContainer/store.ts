import { create } from 'zustand';
import { ToastProps as RainToastProps } from '@karya_app1/rain-js';
import type { ToastProps, ToastState } from '../../types';

// Create a simple ID generator
let toastCounter = 0;
const generateId = () => {
  return `toast-${Date.now()}-${toastCounter++}`;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  // Add a new toast to the array
  addToast: (toast: Omit<ToastProps, 'id'>) => {
    const id = generateId();
    const item: RainToastProps = {
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
export const showSuccessToast = (toast: Omit<ToastProps, 'id' | 'variant'>) => {
  return useToastStore.getState().addToast({ ...toast, variant: 'success' });
};

export const showErrorToast = (toast: Omit<ToastProps, 'id' | 'variant'>) => {
  return useToastStore.getState().addToast({ ...toast, variant: 'error' });
};

export const showInfoToast = (toast: Omit<ToastProps, 'id' | 'variant'>) => {
  return useToastStore.getState().addToast({ ...toast, variant: 'info' });
};

export const showWarningToast = (toast: Omit<ToastProps, 'id' | 'variant'>) => {
  return useToastStore.getState().addToast({ ...toast, variant: 'warning' });
};

export const hideToast = (id: string | number) => {
  useToastStore.getState().removeToast(id);
};

export const clearToasts = () => {
  useToastStore.getState().clearAllToasts();
};

export default useToastStore;
