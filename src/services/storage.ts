import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Semana 07 - Persistencia Local FIX para Expo Go y Web
// MMKV y SecureStore requieren build nativo, en Expo Go usamos solo AsyncStorage

// ============================================
// 1. AsyncStorage - Funciona en todos lados
// ============================================
export const asyncStorage = {
  async setItem(key: string, value: any): Promise<void> {
    if (!key || typeof key !== 'string') {
      console.warn('[AsyncStorage] Invalid key:', key);
      return;
    }
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
    } catch (e) {
      console.error('[AsyncStorage] setItem error', e);
    }
  },
  async getItem<T>(key: string): Promise<T | null> {
    if (!key || typeof key !== 'string') return null;
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      console.error('[AsyncStorage] getItem error', e);
      return null;
    }
  },
  async removeItem(key: string): Promise<void> {
    if (!key || typeof key !== 'string') {
      console.warn('[AsyncStorage] Invalid key for remove:', key);
      return;
    }
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('[AsyncStorage] removeItem error', e);
    }
  },
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('[AsyncStorage] clear error', e);
    }
  },
};

// ============================================
// 2. SecureStore - Solo en build nativo, en Expo Go/Web usa AsyncStorage
// ============================================
let SecureStore: any = null;
let isSecureStoreAvailable = false;

try {
  if (Platform.OS !== 'web') {
    // Verifica si estamos en Expo Go (no tiene SecureStore nativo completo en algunos casos)
    // Usamos require dinámico con try/catch
    SecureStore = require('expo-secure-store');
    isSecureStoreAvailable = true;
  }
} catch (e) {
  console.log('[SecureStore] No disponible en este entorno, usando AsyncStorage fallback');
  isSecureStoreAvailable = false;
}

export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    if (!key || typeof key !== 'string' || !value) {
      console.warn('[SecureStore] Invalid key or value:', key);
      return;
    }
    try {
      if (isSecureStoreAvailable && SecureStore && Platform.OS !== 'web') {
        await SecureStore.setItemAsync(key, value);
      } else {
        await AsyncStorage.setItem(`secure:${key}`, value);
      }
    } catch (e) {
      console.error('[SecureStore] setItem error, fallback to AsyncStorage', e);
      try {
        await AsyncStorage.setItem(`secure:${key}`, value);
      } catch {}
    }
  },
  async getItem(key: string): Promise<string | null> {
    if (!key || typeof key !== 'string') return null;
    try {
      if (isSecureStoreAvailable && SecureStore && Platform.OS !== 'web') {
        return await SecureStore.getItemAsync(key);
      } else {
        return await AsyncStorage.getItem(`secure:${key}`);
      }
    } catch (e) {
      console.error('[SecureStore] getItem error', e);
      try {
        return await AsyncStorage.getItem(`secure:${key}`);
      } catch {
        return null;
      }
    }
  },
  async removeItem(key: string): Promise<void> {
    if (!key || typeof key !== 'string') {
      console.warn('[SecureStore] Invalid key for remove:', key);
      return;
    }
    try {
      if (isSecureStoreAvailable && SecureStore && Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(key);
      } else {
        await AsyncStorage.removeItem(`secure:${key}`);
      }
    } catch (e) {
      console.error('[SecureStore] removeItem error', e);
      try {
        await AsyncStorage.removeItem(`secure:${key}`);
      } catch {}
    }
  },
};

// ============================================
// 3. MMKV - DESACTIVADO en Expo Go y Web para evitar crash "Invalid key - must be a string"
// Solo funciona con build nativo (expo run:ios / run:android)
// En Expo Go usamos 100% AsyncStorage
// ============================================

let mmkvInstance: any = null;
let isMmkvAvailable = false;

// MMKV completamente desactivado en Expo Go para evitar error RCTMakeAndLogError
// Solo activa si haces build nativo
const SHOULD_USE_MMKV = false; // Cambia a true solo si haces npx expo run:ios / run:android

try {
  if (SHOULD_USE_MMKV && Platform.OS !== 'web') {
    const { MMKV } = require('react-native-mmkv');
    mmkvInstance = new MMKV({ id: 'cleanpro-prefs' });
    isMmkvAvailable = true;
  }
} catch (e) {
  console.log('[MMKV] Desactivado en Expo Go, usando AsyncStorage');
  isMmkvAvailable = false;
}

export const mmkvStorage = {
  setItem(key: string, value: any): void {
    if (!key || typeof key !== 'string') {
      console.warn('[MMKV] Invalid key:', key);
      return;
    }
    try {
      if (isMmkvAvailable && mmkvInstance) {
        mmkvInstance.set(key, JSON.stringify(value));
      } else {
        AsyncStorage.setItem(`mmkv:${key}`, JSON.stringify(value)).catch(() => {});
      }
    } catch (e) {
      console.error('[MMKV] setItem error', e);
    }
  },
  getItem<T>(key: string): T | null {
    if (!key || typeof key !== 'string') return null;
    try {
      if (isMmkvAvailable && mmkvInstance) {
        const json = mmkvInstance.getString(key);
        return json ? JSON.parse(json) : null;
      }
      return null;
    } catch {
      return null;
    }
  },
  async getItemAsync<T>(key: string): Promise<T | null> {
    if (!key || typeof key !== 'string') return null;
    try {
      if (isMmkvAvailable && mmkvInstance) {
        return mmkvStorage.getItem<T>(key);
      }
      const json = await AsyncStorage.getItem(`mmkv:${key}`);
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  },
  removeItem(key: string): void {
    if (!key || typeof key !== 'string') {
      console.warn('[MMKV] Invalid key for remove:', key);
      return;
    }
    try {
      if (isMmkvAvailable && mmkvInstance) {
        mmkvInstance.delete(key);
      } else {
        AsyncStorage.removeItem(`mmkv:${key}`).catch(() => {});
      }
    } catch (e) {
      console.error('[MMKV] removeItem error', e);
    }
  },
};

export const STORAGE_KEYS = {
  SERVICES_CACHE: '@cleanpro:services_cache',
  CLIENTS_CACHE: '@cleanpro:clients_cache',
  PREFERENCES: '@cleanpro:preferences',
  AUTH_TOKENS: '@cleanpro:auth_tokens',
  USER: '@cleanpro:user',
} as const;
