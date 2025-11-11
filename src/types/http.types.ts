import type { AxiosRequestConfig } from "axios";

/**
 * Extra flags that can be passed with HTTP requests to control behavior
 * of toasts, loaders, and error/success messages
 */
export type ExtraRequestFlags = {
  /** Whether to show error toast on request failure (default: false) */
  show_error?: boolean;
  /** Whether to show success toast on request success (default: false) */
  show_success?: boolean;
  /** Whether to show loader during request (default: true) */
  show_loader?: boolean;
  /** Custom success message to display */
  success_message?: string;
  /** Custom error message to display */
  error_message?: string;
};

/**
 * Extended Axios config with custom request flags and internal metadata
 */
export type ExtendedAxiosRequestConfig = AxiosRequestConfig &
  ExtraRequestFlags & {
    /** Internal flags storage for interceptors */
    __flags?: ExtraRequestFlags;
    /** Internal retry flag to prevent infinite retry loops */
    _retry?: boolean;
  };
