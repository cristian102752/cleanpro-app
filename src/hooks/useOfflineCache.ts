import { useState, useEffect } from 'react';
import { useServices } from './useServices';
import { asyncStorage, STORAGE_KEYS } from '../services/storage';
import { Service } from '../types';

// Semana 07 - Patrón offline-first con TanStack Query + AsyncStorage
// FIX: Validación de keys para evitar "Invalid key - must be a string"

export function useOfflineServices() {
  const [cachedServices, setCachedServices] = useState<Service[] | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  
  const { data, isLoading, isError, refetch, isFetching } = useServices();

  useEffect(() => {
    if (data) {
      asyncStorage.setItem(STORAGE_KEYS.SERVICES_CACHE, data);
      setCachedServices(data);
      setIsOffline(false);
    }
  }, [data]);

  useEffect(() => {
    async function loadCache() {
      if (isError) {
        const cached = await asyncStorage.getItem<Service[]>(STORAGE_KEYS.SERVICES_CACHE);
        if (cached) {
          setCachedServices(cached);
          setIsOffline(true);
        }
      }
    }
    loadCache();
  }, [isError]);

  useEffect(() => {
    async function loadInitialCache() {
      const cached = await asyncStorage.getItem<Service[]>(STORAGE_KEYS.SERVICES_CACHE);
      if (cached) {
        setCachedServices(cached);
      }
    }
    loadInitialCache();
  }, []);

  return {
    services: data ?? cachedServices,
    isLoading: isLoading && !cachedServices,
    isOffline,
    isFetching,
    refetch,
    isError: isError && !cachedServices,
  };
}

export function useClearCache() {
  const clearCache = async () => {
    try {
      // FIX: Validar keys antes de borrar para evitar error RCTMakeAndLogError
      if (STORAGE_KEYS.SERVICES_CACHE && typeof STORAGE_KEYS.SERVICES_CACHE === 'string') {
        await asyncStorage.removeItem(STORAGE_KEYS.SERVICES_CACHE);
      }
      if (STORAGE_KEYS.CLIENTS_CACHE && typeof STORAGE_KEYS.CLIENTS_CACHE === 'string') {
        await asyncStorage.removeItem(STORAGE_KEYS.CLIENTS_CACHE);
      }
      // También borra mmkv fallback keys
      await asyncStorage.removeItem(`mmkv:${STORAGE_KEYS.PREFERENCES}`);
      console.log('[Cache] Borrado correctamente');
    } catch (e) {
      console.error('[Cache] Error borrando', e);
    }
  };
  return { clearCache };
}
