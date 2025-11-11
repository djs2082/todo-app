import type { AxiosRequestConfig } from "axios";
import type { ExtraRequestFlags, ExtendedAxiosRequestConfig } from "types/http.types";

/**
 * Extracts and normalizes request flags from the config
 * @param config - The axios request config with potential flags
 * @returns Normalized flags object with defaults applied
 */
export const extractFlags = (config: AxiosRequestConfig & ExtraRequestFlags): ExtraRequestFlags => {
  const flags: ExtraRequestFlags = {
    show_error: config?.data?.show_error ?? false,
    show_success: config?.data?.show_success ?? false,
    show_loader: config?.data?.show_loader ?? true,
    success_message: config?.data?.success_message,
    error_message: config?.data?.error_message,
  };
  return flags;
};

/**
 * Removes custom flags from the config to prevent them from being sent to the server
 * @param config - The axios request config to clean
 */
export const deleteRequestFlags = (config: AxiosRequestConfig & ExtraRequestFlags): void => {
  delete (config as any).show_error;
  delete (config as any).show_success;
  delete (config as any).show_loader;
  delete (config as any).success_message;
  delete (config as any).error_message;
};

/**
 * Retrieves flags stored in the config's __flags property
 * @param config - The extended axios config
 * @returns The stored flags or undefined if not found
 */
export const getStoredFlags = (config?: ExtendedAxiosRequestConfig): ExtraRequestFlags | undefined => {
  return config?.__flags;
};
