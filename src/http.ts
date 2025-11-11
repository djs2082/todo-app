import { createHttpClient } from "@karya_app1/rain-js";
import type { AxiosResponse } from "axios";
import {
  onRequestFulfilled,
  onRequestRejected,
} from "./lib/http/interceptors/request.interceptor";
import {
  onResponseFulfilled,
  onResponseRejected,
} from "./lib/http/interceptors/response.interceptor";

/**
 * Main HTTP client configured with:
 * - Request/response interceptors
 * - Authentication handling
 * - Token refresh logic
 * - Toast notifications
 * - Loading states
 */
export const client = createHttpClient({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  requestInterceptor: {
    onFulfilled: onRequestFulfilled,
    onRejected: onRequestRejected,
  },
  responseInterceptor: {
    onFulfilled: onResponseFulfilled,
    onRejected: (error: any) => {
      const baseURL = client.defaults.baseURL || process.env.REACT_APP_API_URL || '';
      return onResponseRejected(error, baseURL, client);
    },
  },
  onResponseToast: (res: AxiosResponse) => {
    // Toast handling is done in the response interceptor
  },
  onErrorToast: (err: any) => {
    // Error toast handling is done in the response interceptor
  },
});

// Enable sending cookies with cross-origin requests
client.defaults.withCredentials = true;
