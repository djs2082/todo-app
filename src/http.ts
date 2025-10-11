import { createHttpClient } from "@karya_app1/rain-js";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import useToastStore from "./components/ToastContainer/store";

const { addToast } = useToastStore.getState();
type ExtraRequestFlags = {
  show_error?: boolean;    // default true
  show_success?: boolean;  // default true
  show_loader?: boolean;   // default true
  success_message?: string;
  error_message?: string;
};
const authTokenGetter = (): string | null => {
  if (typeof document === 'undefined' || typeof document.cookie !== 'string') return null;
  const name = 'token=';
  const parts = document.cookie.split(';');
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (part.startsWith(name)) {
      return decodeURIComponent(part.substring(name.length));
    }
  }
  return null;
};


export const client = createHttpClient({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  requestInterceptor: {
   
    onFulfilled: (cfg: any) => {
      const config = cfg as AxiosRequestConfig & ExtraRequestFlags;
      if (config.show_error === undefined) config.show_error = true;
      if (config.show_success === undefined) config.show_success = true;
      if (config.show_loader === undefined) config.show_loader = true;
      // TODO: if you maintain a global loader, increment here when show_loader is true
      const token = authTokenGetter();
      if (token) {
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
      }
      return config;
    },
    onRejected: (err: any) => {
        const cfg = (err?.config || {}) as ExtraRequestFlags;
        if (cfg.show_error !== false) {
          addToast({ message: cfg.error_message || 'Request failed', variant: 'error' });
        }
        // TODO: decrement loader if you track one
        return Promise.reject(err);
    }
  },
  responseInterceptor: {
    onFulfilled: (res: any) => {
      const cfg = (res?.config || {}) as ExtraRequestFlags;
      if (cfg.show_success) {
        addToast({ message: cfg.success_message || res?.data?.message || 'Success', variant: 'success' });
      }
      // TODO: decrement loader if you track one
      return res;
    },
    onRejected: (err: any) => {
      const cfg = (err?.config || {}) as ExtraRequestFlags;
      if (cfg.show_error !== false) {
        const msg = cfg.error_message || err?.response?.data?.message || err?.message || 'Request failed';
        addToast({ message: msg, variant: 'error' });
      }
      // TODO: decrement loader if you track one
      return Promise.reject(err);
    }
  },
  onResponseToast: (res: AxiosResponse) => {
  },
  onErrorToast: (err: any) => {
  }
});