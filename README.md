# Semana 05 - TanStack Query + Axios (API, caché y refresh)

## Qué se hizo
Cliente Axios con interceptores (token JWT y refresh en 401) y hooks de React Query: useServices, useClients, useStaff, useSchedules con loading, error y pull-to-refresh.

## Archivos (rutas exactas)
- src/services/api.ts → apiClient + mockApi con delay simulado
- src/hooks/useServices.ts → useQuery/useMutation de las 4 entidades

## Cómo probar
Abrir app → shimmer de carga; arrastrar hacia abajo → refresh; sin internet → vista de caché offline.

## Commit
git commit -m "feat: semana 05 - TanStack Query Axios interceptores loading error refresh - CleanPro 3311987"
