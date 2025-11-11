import type { AxiosRequestConfig } from "axios";
import useToastStore from "components/ToastContainer/store";
import useLoaderStore from "components/ui/Loader/store";
import type { ExtendedAxiosRequestConfig, ExtraRequestFlags } from "types/http.types";
import { extractFlags } from "../flags";
import { getAccessToken } from "../auth";

const { addToast } = useToastStore.getState();
const { increment } = useLoaderStore.getState();

/**
 * Request interceptor - onFulfilled
 * Handles:
 * - Extracting and storing custom flags
 * - Showing loader if enabled
 * - Adding authorization header if token exists
 *
 * @param config - The axios request config
 * @returns The modified config
 */
export const onRequestFulfilled = (config: AxiosRequestConfig): ExtendedAxiosRequestConfig => {
  const extendedConfig = config as ExtendedAxiosRequestConfig;

  // Extract and store flags for use in response interceptor
  const flags = extractFlags(extendedConfig);
  extendedConfig.__flags = flags;

  // Show loader if enabled
  if (flags.show_loader) {
    increment();
  }

  // Add authorization header if token exists
  const token = getAccessToken();
  if (token) {
    extendedConfig.headers = {
      ...(extendedConfig.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }

  return extendedConfig;
};

/**
 * Request interceptor - onRejected
 * Handles request setup errors
 *
 * @param error - The error that occurred
 * @returns Rejected promise with the error
 */
export const onRequestRejected = (error: any): Promise<never> => {
  const flags = error?.config?.__flags as ExtraRequestFlags | undefined;
  const showError = flags?.show_error !== false; // default true

  if (showError) {
    addToast({
      message: flags?.error_message || 'Request failed',
      variant: 'error',
    });
  }

  return Promise.reject(error);
};
