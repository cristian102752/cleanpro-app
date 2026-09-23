import axios from 'axios';
import { MOCK_SERVICES, MOCK_CLIENTS, MOCK_STAFF, MOCK_SCHEDULES } from '../data/mockData';
import { Service, Client, Staff, Schedule } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para agregar token (Semana 08)
apiClient.interceptors.request.use(async (config) => {
  try {
    // Import dinámico para evitar ciclo
    const { secureStorage } = await import('./storage');
    const token = await secureStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Si 401 y no es retry, intenta refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { secureStorage } = await import('./storage');
        const { authApi } = await import('./authApi');
        const refreshToken = await secureStorage.getItem('refreshToken');
        if (refreshToken) {
          const newTokens = await authApi.refreshToken(refreshToken);
          await authApi.saveTokens(newTokens);
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Si refresh falla, logout
        const { secureStorage } = await import('./storage');
        await secureStorage.removeItem('accessToken');
        await secureStorage.removeItem('refreshToken');
        await secureStorage.removeItem('user');
      }
    }
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);

// MOCK API SIMULADA
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// FIX Semana 07 - Los servicios creados/editados ahora se PERSISTEN en AsyncStorage
const CUSTOM_SERVICES_KEY = '@cleanpro:custom_services';
let customServicesCache: Service[] | null = null;

async function loadCustomServices(): Promise<Service[]> {
  if (customServicesCache) return customServicesCache;
  try {
    const { asyncStorage } = await import('./storage');
    customServicesCache = (await asyncStorage.getItem<Service[]>(CUSTOM_SERVICES_KEY)) ?? [];
  } catch {
    customServicesCache = [];
  }
  return customServicesCache;
}

async function persistCustomServices(list: Service[]): Promise<void> {
  customServicesCache = list;
  try {
    const { asyncStorage } = await import('./storage');
    await asyncStorage.setItem(CUSTOM_SERVICES_KEY, list);
  } catch {}
}

export const mockApi = {
  async getServices(): Promise<Service[]> {
    await delay(800);
    const custom = await loadCustomServices();
    return [...custom, ...MOCK_SERVICES];
  },
  async getServiceById(id: string): Promise<Service | undefined> {
    await delay(500);
    const custom = await loadCustomServices();
    return custom.find((s) => s.id === id) ?? MOCK_SERVICES.find((s) => s.id === id);
  },
  async createService(payload: Partial<Service>): Promise<Service> {
    await delay(700);
    const newService: Service = {
      id: `srv${Date.now()}`,
      name: payload.name || 'Nuevo Servicio',
      description: payload.description || 'Descripción',
      price: payload.price || 100000,
      durationMinutes: payload.durationMinutes || 120,
      category: (payload.category as any) || 'residencial',
      imageUri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
      rating: 5.0,
      includes: ['Servicio nuevo'],
      subtitle: 'Nuevo',
    };
    // FIX: guarda el servicio nuevo para que aparezca en la lista y sobreviva reinicios
    const custom = await loadCustomServices();
    await persistCustomServices([newService, ...custom]);
    return newService;
  },
  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    await delay(600);
    const custom = await loadCustomServices();
    const idx = custom.findIndex((s) => s.id === id);
    if (idx >= 0) {
      const updated = { ...custom[idx], ...data, id } as Service;
      const next = [...custom];
      next[idx] = updated;
      await persistCustomServices(next);
      return updated;
    }
    const inMock = MOCK_SERVICES.find((s) => s.id === id);
    if (!inMock) throw new Error('Servicio no encontrado');
    const updated = { ...inMock, ...data, id } as Service;
    Object.assign(inMock, data);
    return updated;
  },
  async getClients(): Promise<Client[]> {
    await delay(600);
    return MOCK_CLIENTS;
  },
  async getClientById(id: string): Promise<Client | undefined> {
    await delay(400);
    return MOCK_CLIENTS.find((c) => c.id === id);
  },
  async getStaff(): Promise<Staff[]> {
    await delay(600);
    return MOCK_STAFF;
  },
  async getSchedules(): Promise<Schedule[]> {
    await delay(700);
    return MOCK_SCHEDULES;
  },
  async createSchedule(payload: any): Promise<Schedule> {
    await delay(800);
    return {
      id: `ag${Date.now()}`,
      clientId: payload.clientId,
      clientName: MOCK_CLIENTS.find((c) => c.id === payload.clientId)?.name || 'Cliente',
      serviceId: payload.serviceId,
      serviceName: MOCK_SERVICES.find((s) => s.id === payload.serviceId)?.name || 'Servicio',
      date: payload.date,
      time: payload.time,
      address: payload.address,
      status: 'pendiente',
      price: MOCK_SERVICES.find((s) => s.id === payload.serviceId)?.price || 0,
    };
  },
  async getPostsFromRealAPI() {
    const { data } = await apiClient.get('/posts?_limit=10');
    return data;
  },
};
