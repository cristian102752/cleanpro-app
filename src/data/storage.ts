import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Semana 07 - Persistencia Local: 3 tipos de storage

// ============================================
// 1. AsyncStorage - Para listas, favoritos, caché offline
// ============================================
export const asyncStorage = {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
    } catch (e) {
      console.error('[AsyncStorage] setItem error', e);
    }
  },
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      console.error('[AsyncStorage] getItem error', e);
      return null;
    }
  },
  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },
};

// ============================================
// 2. SecureStore - Para tokens, datos sensibles
// ============================================
export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('[SecureStore] setItem error', e);
    }
  },
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('[SecureStore] getItem error', e);
      return null;
    }
  },
  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  },
};

// ============================================
// 3. MMKV - Para preferencias rápidas sincrónicas
// En Expo Go no funciona (requiere build nativo), usamos fallback AsyncStorage
// ============================================

let mmkvInstance: any = null;

// Intenta cargar MMKV solo si no es web y está disponible
try {
  if (Platform.OS !== 'web') {
    const { MMKV } = require('react-native-mmkv');
    mmkvInstance = new MMKV({ id: 'cleanpro-prefs' });
  }
} catch (e) {
  console.log('[MMKV] No disponible en Expo Go, usando fallback AsyncStorage');
}

export const mmkvStorage = {
  setItem(key: string, value: any): void {
    if (mmkvInstance) {
      mmkvInstance.set(key, JSON.stringify(value));
    } else {
      // Fallback: AsyncStorage async pero no bloquea
      AsyncStorage.setItem(`mmkv:${key}`, JSON.stringify(value));
    }
  },
  getItem<T>(key: string): T | null {
    try {
      if (mmkvInstance) {
        const json = mmkvInstance.getString(key);
        return json ? JSON.parse(json) : null;
      }
      // Fallback no puede ser síncrono, retorna null y carga async después
      return null;
    } catch {
      return null;
    }
  },
  async getItemAsync<T>(key: string): Promise<T | null> {
    if (mmkvInstance) {
      return mmkvStorage.getItem<T>(key);
    }
    const json = await AsyncStorage.getItem(`mmkv:${key}`);
    return json ? JSON.parse(json) : null;
  },
  removeItem(key: string): void {
    if (mmkvInstance) {
      mmkvInstance.delete(key);
    } else {
      AsyncStorage.removeItem(`mmkv:${key}`);
    }
  },
};

// ============================================
// Helpers CleanPro
// ============================================

export const STORAGE_KEYS = {
  SERVICES_CACHE: '@cleanpro:services_cache',
  CLIENTS_CACHE: '@cleanpro:clients_cache',
  PREFERENCES: '@cleanpro:preferences',
  AUTH_TOKENS: '@cleanpro:auth_tokens', // Solo para referencia, real va en SecureStore
  USER: '@cleanpro:user',
} as const;
