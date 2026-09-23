import { useState, useEffect, useCallback } from 'react';
import { asyncStorage, mmkvStorage, STORAGE_KEYS } from '../services/storage';

// Semana 07 - Custom hook para preferencias con persistencia

export interface UserPreferences {
  theme: 'dark' | 'light';
  notificationsEnabled: boolean;
  language: 'es' | 'en';
  listView: 'list' | 'grid';
  sortBy: 'name' | 'price' | 'rating';
  showOnlyAvailableStaff: boolean;
}

const DEFAULT_PREFS: UserPreferences = {
  theme: 'dark',
  notificationsEnabled: true,
  language: 'es',
  listView: 'list',
  sortBy: 'name',
  showOnlyAvailableStaff: false,
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFS);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar preferencias (al iniciar y con reload() al enfocar pantalla)
  const load = useCallback(async () => {
    try {
      // Intenta MMKV sincrónico primero
      const mmkvPrefs = mmkvStorage.getItem<UserPreferences>(STORAGE_KEYS.PREFERENCES);
      if (mmkvPrefs) {
        setPreferences({ ...DEFAULT_PREFS, ...mmkvPrefs });
        setIsLoading(false);
        return;
      }
      // Fallback AsyncStorage
      const stored = await asyncStorage.getItem<UserPreferences>(STORAGE_KEYS.PREFERENCES);
      if (stored) {
        setPreferences({ ...DEFAULT_PREFS, ...stored });
      }
    } catch (e) {
      console.error('Error loading preferences', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setPreference = useCallback(async <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: value };
      // Guarda en ambos storages
      mmkvStorage.setItem(STORAGE_KEYS.PREFERENCES, updated);
      asyncStorage.setItem(STORAGE_KEYS.PREFERENCES, updated);
      return updated;
    });
  }, []);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...updates };
      mmkvStorage.setItem(STORAGE_KEYS.PREFERENCES, updated);
      asyncStorage.setItem(STORAGE_KEYS.PREFERENCES, updated);
      return updated;
    });
  }, []);

  const resetPreferences = useCallback(async () => {
    setPreferences(DEFAULT_PREFS);
    mmkvStorage.setItem(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFS);
    await asyncStorage.setItem(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFS);
  }, []);

  return {
    preferences,
    isLoading,
    setPreference,
    updatePreferences,
    resetPreferences,
    reload: load, // FIX: para recargar al enfocar la pantalla (useFocusEffect)
  };
}
