// TYPES - Empresa de Limpieza CleanPro
// Dominio: clients, services, staff, schedules
// Autor: Cristian Alvarado Guerrero - Ficha 3311987 - bc-flutter (React Native)

export type ServiceCategory =
  | 'residencial'
  | 'oficina'
  | 'vidrios'
  | 'postObra'
  | 'industrial'
  | 'desinfeccion';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number; // COP
  durationMinutes: number;
  category: ServiceCategory;
  imageUri: string;
  rating: number;
  includes: string[];
  // Para compatibilidad con bootcamp (Item genérico)
  subtitle?: string;
}

export interface Client {
  id: string;
  name: string;
  companyName?: string;
  address: string;
  phone: string;
  email: string;
  type: 'residencial' | 'empresarial';
  totalServices: number;
  imageUri: string;
  lastServiceDate?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'operario' | 'supervisor' | 'especialista';
  phone: string;
  avatarUri: string;
  rating: number;
  completedServices: number;
  available: boolean;
  specialties: ServiceCategory[];
}

export type ScheduleStatus = 'pendiente' | 'en_curso' | 'completado' | 'cancelado';

export interface Schedule {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  staffId?: string;
  staffName?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  address: string;
  status: ScheduleStatus;
  price: number;
  notes?: string;
}

// Para compatibilidad con los ejercicios del bootcamp que usan Item
export interface Item {
  id: string;
  name: string;
  description?: string;
  imageUri: string;
  subtitle?: string;
}

export interface CreateServicePayload {
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  durationMinutes: number;
}

export interface CreateSchedulePayload {
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  address: string;
}
