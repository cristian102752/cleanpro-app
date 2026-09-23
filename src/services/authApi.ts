import { apiClient } from './api';
import { secureStorage } from './storage';

// Semana 08 - Auth API usando dummyjson.com (gratis para practicar)
// Docs: https://dummyjson.com/docs/auth

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

const AUTH_BASE = 'https://dummyjson.com';

export const authApi = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>(`${AUTH_BASE}/auth/login`, {
      username,
      password,
      expiresInMins: 30, // token expira en 30 min para probar refresh
    });
    return data;
  },

  async getMe(accessToken: string): Promise<AuthUser> {
    const { data } = await apiClient.get<AuthUser>(`${AUTH_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { data } = await apiClient.post<AuthTokens>(`${AUTH_BASE}/auth/refresh`, {
      refreshToken,
      expiresInMins: 30,
    });
    return data;
  },

  // Helpers SecureStore
  async saveTokens(tokens: AuthTokens): Promise<void> {
    await secureStorage.setItem('accessToken', tokens.accessToken);
    await secureStorage.setItem('refreshToken', tokens.refreshToken);
  },

  async getTokens(): Promise<AuthTokens | null> {
    const accessToken = await secureStorage.getItem('accessToken');
    const refreshToken = await secureStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    return null;
  },

  async clearTokens(): Promise<void> {
    await secureStorage.removeItem('accessToken');
    await secureStorage.removeItem('refreshToken');
  },
};
