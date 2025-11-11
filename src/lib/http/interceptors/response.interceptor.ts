import type { AxiosResponse } from "axios";
import useToastStore from "components/ToastContainer/store";
import useLoaderStore from "components/ui/Loader/store";
import type { ExtendedAxiosRequestConfig } from "types/http.types";
import { getStoredFlags } from "../flags";
import { performLogout } from "../auth";
import { refreshAccessToken } from "../token-refresh";

const { addToast } = useToastStore.getState();
const { decrement } = useLoaderStore.getState();

/**
 * Response interceptor - onFulfilled
 * Handles successful responses:
 * - Shows success toast if enabled
 * - Hides loader if enabled
 *
 * @param response - The axios response
 * @returns The response
 */
export const onResponseFulfilled = (response: AxiosResponse): AxiosResponse => {
  const flags = getStoredFlags(response?.config as ExtendedAxiosRequestConfig);

  if (flags?.show_success) {
    addToast({
      message: flags?.success_message || response?.data?.message || 'Success',
      variant: 'success',
    });
  }

  if (flags?.show_loader) {
    decrement();
  }

  return response;
};

/**
 * Response interceptor - onRejected
 * Handles error responses:
 * - Implements token refresh logic for 401 errors
 * - Shows error toasts
 * - Hides loader
 * - Handles logout on authentication failures
 *
 * @param error - The error that occurred
 * @param baseURL - The base URL for the refresh endpoint
 * @param httpClient - The HTTP client instance for retry
 * @returns Rejected promise or retried request
 */
export const onResponseRejected = (error: any, baseURL: string, httpClient: any): Promise<any> => {
  const originalConfig = error?.config as ExtendedAxiosRequestConfig | undefined;
  const flags = getStoredFlags(originalConfig);

  /**
   * Finalizes error handling by showing toast and hiding loader
   */
  const finalize = (message?: string): void => {
    const showError = flags?.show_error !== false; // default true

    if (showError && message) {
      addToast({ message, variant: 'error' });
    }

    if (flags?.show_loader) {
      decrement();
    }
  };

  // Handle 401 Unauthorized - attempt token refresh
  if (error?.response?.status === 401) {
    if (originalConfig && !originalConfig._retry) {
      originalConfig._retry = true;

      // Decrement loader for the failed 401 request before retrying
      if (flags?.show_loader) {
        decrement();
      }

      return refreshAccessToken(baseURL)
        .then((newToken) => {
          console.log(newToken);

          if (!newToken) {
            performLogout();
            return Promise.reject(error);
          }

          // Update authorization header with new token
          originalConfig.headers = {
            ...(originalConfig.headers || {}),
            Authorization: `Bearer ${newToken}`,
          } as any;

          // Retry the original request - request interceptor will increment, response interceptor will decrement
          return httpClient.request(originalConfig);
        })
        .catch((refreshError) => {
          console.error(refreshError);
          // Don't need to decrement again - already done above
            addToast({
              message: 'Session timed out, please log in again.',
              variant: 'error'
            });
          
          performLogout();
          return Promise.reject(refreshError);
        });
    } else {
      // Second 401 (already retried) → session timed out
      const showError = flags?.show_error !== false;
        addToast({
          message: flags?.error_message || 'Session timed out',
          variant: 'error'
        });
      

      if (flags?.show_loader) {
        decrement();
      }

      performLogout();
      return Promise.reject(error);
    }
  }

  // Non-401 error handling
  const message =
    flags?.error_message ||
    error?.response?.data?.message ||
    error?.message ||
    'Request failed';

  finalize(message);
  return Promise.reject(error);
};
