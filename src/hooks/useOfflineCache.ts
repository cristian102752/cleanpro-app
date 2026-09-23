import { useState, useEffect } from 'react';
import { useServices } from './useServices';
import { asyncStorage, STORAGE_KEYS } from '../services/storage';
import { Service } from '../types';

// Semana 07 - Patrón offline-first con TanStack Query + AsyncStorage

export function useOfflineServices() {
  const [cachedServices, setCachedServices] = useState<Service[] | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  
  const { data, isLoading, isError, refetch, isFetching } = useServices();

  // Cuando llegan datos de la API, guarda en caché
  useEffect(() => {
    if (data) {
      asyncStorage.setItem(STORAGE_KEYS.SERVICES_CACHE, data);
      setCachedServices(data);
      setIsOffline(false);
    }
  }, [data]);

  // Si hay error, intenta cargar caché
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

  // Cargar caché inicial mientras hace fetch
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
    await asyncStorage.removeItem(STORAGE_KEYS.SERVICES_CACHE);
    await asyncStorage.removeItem(STORAGE_KEYS.CLIENTS_CACHE);
  };
  return { clearCache };
}
