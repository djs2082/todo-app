/**
 * User-related types
 * Centralized user and authentication models
 */

import { ID, Theme } from './common';

/**
 * User settings structure
 */
export interface UserSettings {
  id: number;
  key: string;
  value: string;
}

/**
 * User model
 */
export interface User {
  id?: ID;
  email?: string;
  firstName?: string;
  lastName?: string;
  accountName?: string;
  settings?: UserSettings[];
}

/**
 * User state interface for Zustand store
 */
export interface UserState {
  isSignedIn: boolean;
  user: User | null;
  setSignedIn: (val: boolean) => void;
  setUser: (user: User | null) => void;
  signIn: (user?: User) => void;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
  userTheme: () => Theme;
  updateUserTheme: (theme: Theme) => void;
}

/**
 * Response structure for user data from API
 */
export interface UserResponse {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  accountName?: string;
  settings?: UserSettings[];
  [key: string]: any;
}
