import axios from 'axios';
import { MOCK_SERVICES, MOCK_CLIENTS, MOCK_STAFF, MOCK_SCHEDULES } from '../data/mockData';
import { Service, Client, Staff, Schedule } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

// Semana 05 - cliente Axios + mock API con delays simulados
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const mockApi = {
  async getServices(): Promise<Service[]> {
    await delay(800);
    return MOCK_SERVICES;
  },
  async getServiceById(id: string): Promise<Service | undefined> {
    await delay(500);
    return MOCK_SERVICES.find((s) => s.id === id);
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
