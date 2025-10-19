import { createHttpClient } from "@karya_app1/rain-js";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import useToastStore from "./components/ToastContainer/store";
import useLoaderStore from "./components/ui/Loader/store";

const { addToast } = useToastStore.getState();
const { increment, decrement } = useLoaderStore.getState();
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


const addFlags = (config: AxiosRequestConfig & ExtraRequestFlags): ExtraRequestFlags  => {
  const flags: ExtraRequestFlags = {
    show_error: config.data.show_error ?? true,
    show_success: config.data.show_success ?? true,
    show_loader: config.data.show_loader ?? true,
    success_message: config.data.success_message,
    error_message: config.data.error_message,
  };
  return flags;
}

const deleteRequestFlags = (config: AxiosRequestConfig & ExtraRequestFlags) => {
  delete (config as any).show_error;
  delete (config as any).show_success;
  delete (config as any).show_loader;
  delete (config as any).success_message;
  delete (config as any).error_message;
}


export const client = createHttpClient({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  requestInterceptor: {
   
    onFulfilled: (cfg: any) => {
      const config = cfg as (AxiosRequestConfig & ExtraRequestFlags & { __flags?: ExtraRequestFlags });
      
      const flags = addFlags(config);
      (config as any).__flags = flags;
     

      if(flags.show_loader) increment();
      const token = sessionStorage.getItem('access_token')
      if (token) {
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
      }
      return config;
    },
    onRejected: (err: any) => {
        const flags = (err?.config && (err.config as any).__flags) as ExtraRequestFlags | undefined;
        const showError = flags?.show_error !== false; // default true
        if (showError) {
          addToast({ message: flags?.error_message || 'Request failed', variant: 'error' });
        }
        return Promise.reject(err);
    }
  },
  responseInterceptor: {
    onFulfilled: (res: any) => {
      const flags = (res?.config && (res.config as any).__flags) as ExtraRequestFlags | undefined;
      if (flags?.show_success) {
        addToast({ message: flags?.success_message || res?.data?.message || 'Success', variant: 'success' });
      }
      if(flags?.show_loader) decrement();
      return res;
    },
    onRejected: (err: any) => {
      const flags = (err?.config && (err.config as any).__flags) as ExtraRequestFlags | undefined;

      const showError = flags?.show_error !== false; // default true
      if (showError) {
        const msg = flags?.error_message || err?.response?.data?.message || err?.message || 'Request failed';
        addToast({ message: msg, variant: 'error' });
      }
      if(flags?.show_loader) decrement();
      return Promise.reject(err);
    }
  },
  onResponseToast: (res: AxiosResponse) => {
  },
  onErrorToast: (err: any) => {
  }
});