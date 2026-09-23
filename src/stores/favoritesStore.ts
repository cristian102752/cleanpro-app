import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service, Schedule } from '../types';

interface FavoritesState {
  favoriteServiceIds: string[];
  favoriteServices: Service[];
  schedules: Schedule[];
  
  addFavorite: (service: Service) => void;
  removeFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  toggleFavorite: (service: Service) => void;
  clearFavorites: () => void;
  
  addSchedule: (schedule: Schedule) => void;
  removeSchedule: (scheduleId: string) => void;
  updateScheduleStatus: (id: string, status: Schedule['status']) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteServiceIds: [],
      favoriteServices: [],
      schedules: [],

      addFavorite: (service) =>
        set((state) => {
          if (state.favoriteServiceIds.includes(service.id)) return state;
          return {
            favoriteServiceIds: [...state.favoriteServiceIds, service.id],
            favoriteServices: [...state.favoriteServices, service],
          };
        }),

      removeFavorite: (serviceId) =>
        set((state) => ({
          favoriteServiceIds: state.favoriteServiceIds.filter((id) => id !== serviceId),
          favoriteServices: state.favoriteServices.filter((s) => s.id !== serviceId),
        })),

      isFavorite: (serviceId) => get().favoriteServiceIds.includes(serviceId),

      toggleFavorite: (service) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(service.id)) {
          removeFavorite(service.id);
        } else {
          addFavorite(service);
        }
      },

      clearFavorites: () => set({ favoriteServiceIds: [], favoriteServices: [] }),

      addSchedule: (schedule) =>
        set((state) => ({
          schedules: [schedule, ...state.schedules],
        })),

      removeSchedule: (scheduleId) =>
        set((state) => ({
          schedules: state.schedules.filter((s) => s.id !== scheduleId),
        })),

      updateScheduleStatus: (id, status) =>
        set((state) => ({
          schedules: state.schedules.map((s) =>
            s.id === id ? { ...s, status } : s
          ),
        })),
    }),
    {
      name: 'cleanpro-favorites',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favoriteServiceIds: state.favoriteServiceIds,
        favoriteServices: state.favoriteServices,
        schedules: state.schedules,
      }),
    }
  )
);
