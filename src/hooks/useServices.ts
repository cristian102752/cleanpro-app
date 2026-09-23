import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api';
import { Service, Client, Staff, Schedule } from '../types';

// Semana 05 - hooks de TanStack Query
export const SERVICES_KEY = ['services'] as const;
export const CLIENTS_KEY = ['clients'] as const;
export const STAFF_KEY = ['staff'] as const;
export const SCHEDULES_KEY = ['schedules'] as const;

export function useServices() {
  return useQuery<Service[]>({ queryKey: SERVICES_KEY, queryFn: () => mockApi.getServices() });
}

export function useServiceById(id: string) {
  return useQuery<Service | undefined>({ queryKey: [...SERVICES_KEY, id], queryFn: () => mockApi.getServiceById(id), enabled: !!id });
}

export function useClients() {
  return useQuery<Client[]>({ queryKey: CLIENTS_KEY, queryFn: () => mockApi.getClients() });
}

export function useStaff() {
  return useQuery<Staff[]>({ queryKey: STAFF_KEY, queryFn: () => mockApi.getStaff() });
}

export function useSchedules() {
  return useQuery<Schedule[]>({ queryKey: SCHEDULES_KEY, queryFn: () => mockApi.getSchedules() });
}
