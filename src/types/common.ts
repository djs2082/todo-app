/**
 * Common types used throughout the application
 * These types provide base structures for API responses, errors, and shared utilities
 */

/**
 * Standard API response wrapper
 * Used to normalize all API responses with consistent structure
 */
export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
  success?: boolean;
  [key: string]: any;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode?: number;
  details?: any;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * HTTP Request extra flags for controlling loader, error, and success messages
 */
export interface RequestFlags {
  show_error?: boolean;
  show_success?: boolean;
  show_loader?: boolean;
  success_message?: string;
  error_message?: string;
}

/**
 * Date and time type aliases for clarity
 */
export type ISODateTime = string; // ISO 8601 datetime string (e.g., "2025-01-15T10:30:00Z")
export type ISODate = string; // ISO date string (e.g., "2025-01-15")
export type LocalTime = string; // Local time in HH:MM format (24-hour)

/**
 * Generic ID type - can be string or number
 */
export type ID = string | number;

/**
 * Theme types
 */
export type Theme = 'light' | 'dark';

/**
 * Toast notification variant types
 */
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';
