import axios from 'axios';
import { MOCK_SERVICES, MOCK_CLIENTS, MOCK_STAFF, MOCK_SCHEDULES } from '../data/mockData';
import { Service, Client, Staff, Schedule } from '../types';

// URL base - puedes cambiarla por tu MockAPI o JSONPlaceholder
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);

// =====================
// MOCK API SIMULADA (para cuando no hay backend real)
// Simula delay de red y retorna datos locales
// =====================

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const mockApi = {
  // SERVICES
  async getServices(): Promise<Service[]> {
    await delay(800);
    return MOCK_SERVICES;
  },
  async getServiceById(id: string): Promise<Service | undefined> {
    await delay(500);
    return MOCK_SERVICES.find((s) => s.id === id);
  },
  async createService(payload: Partial<Service>): Promise<Service> {
    await delay(700);
    const newService: Service = {
      id: (MOCK_SERVICES.length + 1).toString(),
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
    return newService;
  },

  // CLIENTS
  async getClients(): Promise<Client[]> {
    await delay(600);
    return MOCK_CLIENTS;
  },
  async getClientById(id: string): Promise<Client | undefined> {
    await delay(400);
    return MOCK_CLIENTS.find((c) => c.id === id);
  },

  // STAFF
  async getStaff(): Promise<Staff[]> {
    await delay(600);
    return MOCK_STAFF;
  },

  // SCHEDULES
  async getSchedules(): Promise<Schedule[]> {
    await delay(700);
    return MOCK_SCHEDULES;
  },
  async getSchedulesByStatus(status: string): Promise<Schedule[]> {
    await delay(500);
    return MOCK_SCHEDULES.filter((s) => s.status === status);
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

  // JSONPlaceholder real (para demostrar networking real)
  async getPostsFromRealAPI() {
    const { data } = await apiClient.get('/posts?_limit=10');
    return data;
  },
};
