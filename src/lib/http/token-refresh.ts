import { setAccessToken, performLogout } from "./auth";

/** Tracks whether a token refresh is currently in progress */
let isRefreshing = false;

/** Stores the current refresh promise to prevent multiple simultaneous refresh attempts */
let refreshPromise: Promise<string | null> | null = null;

/**
 * Refreshes the access token using the refresh endpoint
 * Implements a singleton pattern to prevent multiple concurrent refresh requests
 *
 * @param baseURL - The base URL of the API
 * @returns Promise resolving to the new access token or null if refresh failed
 */
export const refreshAccessToken = (baseURL: string): Promise<string | null> => {
  // Return existing refresh promise if already refreshing
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  const url = `${String(baseURL).replace(/\/$/, '')}/refresh`;

  refreshPromise = fetch(url, {
    method: 'POST',
    credentials: 'include', // Send refresh cookie if any
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error(`Refresh failed: ${response.status}`);
      }

      const responseData = await response.json().catch(() => ({}));
      console.log('Refresh response:', responseData);

      // Handle nested token structure: { data: { access_token: "..." } }
      const token =
        responseData?.data?.access_token ||
        responseData?.access_token ||
        responseData?.token ||
        null;

      if (token) {
        setAccessToken(token);
      } else {
        console.error('No token found in refresh response');
      }

      return token;
    })
    .catch((error) => {
      console.error('Token refresh error:', error);
      return null;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
};

/**
 * Handles logout by clearing tokens and signing out the user
 * This is typically called when token refresh fails or returns 401
 */
export const handleLogout = (): void => {
  performLogout();
};
