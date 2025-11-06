/**
 * Form-related types
 * Generic form hook options and specific form data structures
 */

import { Priority } from './task';

/**
 * Generic form hook options
 * Use this for any form hook to maintain consistency
 *
 * @template T - The form data type
 */
export interface FormHookOptions<T> {
  onSubmit?: (values: T) => Promise<void> | void;
  onChange?: (values: Partial<T>, delta?: { name: string; value: any }) => void;
}

/**
 * Login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Signup form data
 */
export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

/**
 * Forgot password form data
 */
export interface ForgotPasswordFormData {
  email: string;
}

/**
 * Update password form data
 */
export interface UpdatePasswordFormData {
  password: string;
  confirmPassword: string;
}

/**
 * Add/Edit task form data
 */
export interface TaskFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  priority: Priority;
}

/**
 * Task pause form data
 */
export interface TaskPauseFormData {
  reason: string;
  progress: number;
  comment: string;
}
