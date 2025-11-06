/**
 * Authentication-related types
 * Login, signup, password reset, and token management
 */

import { User } from './user';

/**
 * Common authentication response structure
 * Used for login, signup, and account activation
 */
export interface AuthResponse {
  token?: string;
  user?: User;
  message?: string;
  [key: string]: any;
}

/**
 * Login request payload
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Signup request payload
 */
export interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  mobile?: string;
  password: string;
  confirm_password: string;
  account_name: string;
}

/**
 * Forgot password request payload
 */
export interface ForgotPasswordPayload {
  email: string;
}

/**
 * Forgot password response
 */
export interface ForgotPasswordResponse {
  message?: string;
  success?: boolean;
}

/**
 * Update/reset password request payload
 */
export interface UpdatePasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Update password response
 */
export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Account activation request payload
 */
export interface ActivateAccountPayload {
  activation_code: string;
}

/**
 * Sign out request payload
 */
export interface SignOutPayload {
  access_token: string;
}

/**
 * Sign out response
 */
export interface SignOutResponse {
  id?: number;
  key: string;
  value: string;
}

/**
 * Theme toggle response
 */
export interface ToggleThemeResponse {
  theme?: 'light' | 'dark';
}
