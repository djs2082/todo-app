import useToastStore from "components/ToastContainer/store";
import useUserStore from "store/userStore";

/**
 * Retrieves the authentication token from a cookie
 * @returns The token string or null if not found
 */
export const authTokenGetter = (): string | null => {
  if (typeof document === 'undefined' || typeof document.cookie !== 'string') {
    return null;
  }

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

/**
 * Retrieves the access token from session storage
 * @returns The access token or null if not found
 */
export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('access_token');
};

/**
 * Stores the access token in session storage
 * @param token - The token to store
 */
export const setAccessToken = (token: string): void => {
  try {
    sessionStorage.setItem('access_token', token);
  } catch (error) {
    console.error('Failed to store access token:', error);
  }
};

/**
 * Removes the access token from session storage and signs out the user
 * @param redirectToHome - Whether to redirect to home page after logout (default: true)
 */
export const performLogout = (redirectToHome: boolean = true): void => {
  try {
    sessionStorage.removeItem('access_token');
  } catch (error) {
    console.error('Failed to remove access token:', error);
  }

  const { signOut } = useUserStore.getState();
  const { addToast } = useToastStore.getState();


  if (typeof signOut === 'function') {
    signOut();
  }

  // Redirect to home page after clearing auth state
  if (redirectToHome && typeof window !== 'undefined') {
    setTimeout(() => {
     window.location.href = '/';
    }, 1000);
    
  }
};
