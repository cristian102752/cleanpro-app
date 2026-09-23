import axios from 'axios';
import { MOCK_SERVICES, MOCK_CLIENTS, MOCK_STAFF, MOCK_SCHEDULES } from '../data/mockData';
import { Service, Client, Staff, Schedule } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Semana 06 - create y update simulados en memoria
const memoryServices: Service[] = [...MOCK_SERVICES];

export const mockApi = {
  async getServices(): Promise<Service[]> {
    await delay(800);
    return memoryServices;
  },
  async getServiceById(id: string): Promise<Service | undefined> {
    await delay(500);
    return memoryServices.find((s) => s.id === id);
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
    memoryServices.unshift(newService);
    return newService;
  },
  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    await delay(600);
    const idx = memoryServices.findIndex((s) => s.id === id);
    if (idx < 0) throw new Error('Servicio no encontrado');
    const updated = { ...memoryServices[idx], ...data, id } as Service;
    memoryServices[idx] = updated;
    return updated;
  },
  async getClients(): Promise<Client[]> {
    await delay(600);
    return MOCK_CLIENTS;
  },
  async getStaff(): Promise<Staff[]> {
    await delay(600);
    return MOCK_STAFF;
  },
  async getSchedules(): Promise<Schedule[]> {
    await delay(700);
    return MOCK_SCHEDULES;
  },
};
