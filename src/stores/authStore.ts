import { create } from 'zustand';
import { authApi, AuthUser, AuthTokens } from '../services/authApi';
import { secureStorage } from '../services/storage';

// Semana 08 - Auth Store con Zustand + SecureStore

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authApi.login(username, password);
      const tokens: AuthTokens = { accessToken: res.accessToken, refreshToken: res.refreshToken };
      await authApi.saveTokens(tokens);
      await secureStorage.setItem('user', JSON.stringify({ id: res.id, username: res.username, email: res.email, firstName: res.firstName, lastName: res.lastName, image: res.image }));

      set({
        user: { id: res.id, username: res.username, email: res.email, firstName: res.firstName, lastName: res.lastName, image: res.image },
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (e: any) {
      const msg = e.response?.data?.message || e.message || 'Error al iniciar sesión';
      set({ error: msg, isLoading: false, isAuthenticated: false });
      throw e;
    }
  },

  logout: async () => {
    await authApi.clearTokens();
    await secureStorage.removeItem('user');
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false, error: null });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const tokens = await authApi.getTokens();
      if (!tokens) {
        set({ isAuthenticated: false, isLoading: false, user: null });
        return;
      }
      // Intenta validar token obteniendo /me
      try {
        const user = await authApi.getMe(tokens.accessToken);
        const userJson = await secureStorage.getItem('user');
        const cachedUser = userJson ? JSON.parse(userJson) : user;
        set({ user: cachedUser, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, isAuthenticated: true, isLoading: false });
      } catch {
        // Token expirado, intenta refresh
        try {
          await get().refreshTokens();
        } catch {
          await get().logout();
        }
      }
    } catch {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  refreshTokens: async () => {
    const { refreshToken } = get();
    if (!refreshToken) throw new Error('No refresh token');
    try {
      const newTokens = await authApi.refreshToken(refreshToken);
      await authApi.saveTokens(newTokens);
      set({ accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken, isAuthenticated: true, isLoading: false });
    } catch (e) {
      await get().logout();
      throw e;
    }
  },

  clearError: () => set({ error: null }),
}));
