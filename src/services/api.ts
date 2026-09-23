import axios from 'axios';
import { MOCK_SERVICES, MOCK_CLIENTS, MOCK_STAFF, MOCK_SCHEDULES } from '../data/mockData';
import { Service, Client, Staff, Schedule } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  try {
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
      } catch {
        const { secureStorage } = await import('./storage');
        await secureStorage.removeItem('accessToken');
        await secureStorage.removeItem('refreshToken');
        await secureStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const mockApi = {
  async getServices(): Promise<Service[]> { await delay(800); return MOCK_SERVICES; },
  async getServiceById(id: string): Promise<Service | undefined> { await delay(500); return MOCK_SERVICES.find((s) => s.id === id); },
  async createService(payload: Partial<Service>): Promise<Service> {
    await delay(700);
    return { id: (MOCK_SERVICES.length + 1).toString(), name: payload.name || 'Nuevo', description: payload.description || '', price: payload.price || 100000, durationMinutes: payload.durationMinutes || 120, category: (payload.category as any) || 'residencial', imageUri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', rating: 5.0, includes: ['Nuevo'], subtitle: 'Nuevo' } as Service;
  },
  async getClients(): Promise<Client[]> { await delay(600); return MOCK_CLIENTS; },
  async getStaff(): Promise<Staff[]> { await delay(600); return MOCK_STAFF; },
  async getSchedules(): Promise<Schedule[]> { await delay(700); return MOCK_SCHEDULES; },
  async createSchedule(payload: any): Promise<Schedule> {
    await delay(800);
    return { id: `ag${Date.now()}`, clientId: payload.clientId, clientName: 'Cliente', serviceId: payload.serviceId, serviceName: 'Servicio', date: payload.date, time: payload.time, address: payload.address, status: 'pendiente', price: 0 };
  },
};