// api.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ENDPOINTS } from '../utils/apiendpoint';

// ==================== TOKEN MANAGEMENT ====================
export const tokenManager = {
  getToken: (): string | null => localStorage.getItem('authToken'),
  setToken: (token: string): void => localStorage.setItem('authToken', token),
  removeToken: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  getRefreshToken: (): string | null => localStorage.getItem('refreshToken'),
  setRefreshToken: (token: string): void => localStorage.setItem('refreshToken', token),
  removeRefreshToken: (): void => localStorage.removeItem('refreshToken'),

  isTokenValid: (): boolean => {
    const token = tokenManager.getToken();
    if (!token) return false;

    if (token.includes('.')) {
      try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return true;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
        const json = atob(padded);
        const payload = JSON.parse(json);
        const currentTimeSeconds = Date.now() / 1000;
        if (typeof payload.exp === 'number') {
          return payload.exp > currentTimeSeconds;
        }
        return true;
      } catch {
        return true;
      }
    }
    return true;
  },

  clearAuthData: (): void => {
    tokenManager.removeToken();
    tokenManager.removeRefreshToken();
    localStorage.removeItem('user');
  },
};

// ==================== API CLIENT ====================
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '/api/v1/',
  timeout: 1000000,
});

// Set initial Authorization header if token exists
const initialToken = tokenManager.getToken();
if (initialToken) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
}

// ---------- Request Interceptor ----------
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip Authorization for auth/login requests
    const isAuthLogin = config.url?.includes('/auth/login') ||
                        (config.baseURL?.includes('auth') && config.url?.includes('login'));

    if (!isAuthLogin) {
      const token = tokenManager.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------- Response Interceptor (sliding expiration + token refresh) ----------
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

apiClient.interceptors.response.use(
  (response) => {
    // Sliding expiration: capture new token from response header
    const authHeader = response.headers?.['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const newToken = authHeader.substring(7);
      tokenManager.setToken(newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop on refresh-token endpoint itself
    if (originalRequest?.url?.includes('/refresh-token')) {
      tokenManager.clearAuthData();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenManager.getRefreshToken();

      if (!refreshToken) {
        tokenManager.clearAuthData();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue request while refreshing
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Build refresh URL with query parameter as per AuthController
        const refreshUrl = ENDPOINTS.refreshToken(refreshToken);
        const response = await apiClient.post(refreshUrl); // POST with empty body

        // The response structure is AuthResponseDTO: { token, refreshToken, userDTO, role }
        const data = response.data;
        const newAccessToken = data.token;
        const newRefreshToken = data.refreshToken;

        if (newAccessToken) {
          tokenManager.setToken(newAccessToken);
          if (newRefreshToken) {
            tokenManager.setRefreshToken(newRefreshToken);
          }
          onTokenRefreshed(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          throw new Error('No access token in refresh response');
        }
      } catch (refreshError) {
        tokenManager.clearAuthData();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Optional: handle other errors (network, 404, 500) here if needed
    // if (error.code === 'ERR_NETWORK' || error.response?.status === 404 || error.response?.status === 500) { ... }

    return Promise.reject(error);
  }
);

export default apiClient;