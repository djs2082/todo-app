/**
 * UI Component prop types
 * Shared types for custom UI components
 */

import { ToastVariant, ID } from './common';

/**
 * Select field option structure
 */
export interface SelectOption {
  value: string | number;
  label: string;
}

/**
 * Select component props
 */
export interface SelectFieldProps {
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  options?: SelectOption[];
  errorText?: string | null;
  sx?: any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Checkbox component props
 */
export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  sx?: any;
  disabled?: boolean;
}

/**
 * TextArea component props
 */
export interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  errorText?: string | null;
  sx?: any;
  disabled?: boolean;
  maxLength?: number;
}

/**
 * Toast notification props
 */
export interface ToastProps {
  id?: ID;
  message: string;
  variant: ToastVariant;
  width?: string | number;
  height?: string | number;
  duration?: number; // in seconds
}

/**
 * Toast state interface for store
 * Note: Uses RainJS ToastProps for internal storage
 */
export interface ToastState {
  toasts: any[]; // Uses RainJS ToastProps internally
  addToast: (toast: Omit<ToastProps, 'id'>) => ID;
  removeToast: (id?: ID) => void;
  clearAllToasts: () => void;
}

/**
 * Loader state interface
 */
export interface LoaderState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

/**
 * Theme context type
 */
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
