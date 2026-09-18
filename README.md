# 🧹 CleanPro - Empresa de Limpieza

**Autor:** Cristian Alvarado Guerrero  
**Ficha:** 3311987  
**Bootcamp:** bc-flutter (React Native) - bc-reactnative semanas 1-5  
**Correo:** alvaradocristian1027@gmail.com  
**Dominio:** Empresa de limpieza  
**Entidades:** clients, services, staff, schedules

> App móvil para gestión de empresa de limpieza, construida desde cero con React Native + Expo, cumpliendo rúbricas semanas 1 a 5 del bootcamp `ergrato-dev/bc-reactnative`.

---

## 🎯 Objetivo del dominio

CleanPro es una empresa bogotana de limpieza que ofrece servicios residenciales, corporativos, industriales y de desinfección. La app permite:

- **Services:** Ver catálogo de 12 servicios con precios en COP, filtrar por categoría, buscar en tiempo real
- **Clients:** Listar 8 clientes (residencial y empresarial) con historial
- **Staff:** Ver 6 colaboradores (operarios, supervisores, especialistas) con disponibilidad
- **Schedules:** Gestionar 10 agendamientos con estados (pendiente, en_curso, completado)
- **Favoritos:** Guardar servicios favoritos con persistencia (Zustand + AsyncStorage)

---

## 🛠️ Stack Tecnológico (Semanas 1-5)

| Tecnología | Versión | Uso | Semana |
|------------|---------|-----|--------|
| React Native | 0.86 | Framework | 1 |
| Expo SDK | 57 | Plataforma | 1 |
| TypeScript | 6.0 | Lenguaje | 1 |
| React Navigation | 7.3 | Navegación Stack + Tabs | 3 |
| Zustand | 5.0 | Estado global favoritos | 4 |
| AsyncStorage | 2.2 | Persistencia | 4 |
| TanStack Query | 5.101 | Server state, cache | 5 |
| Axios | 1.18 | HTTP client | 5 |

---

## 📚 Cumplimiento por semana

### Semana 1 - Core Components y Flexbox
- [x] View, Text, Image, ScrollView, Pressable
- [x] StyleSheet.create (sin inline)
- [x] Flexbox: flexDirection, justifyContent, alignItems, flex, gap
- [x] Header + 3+ tarjetas con imagen, nombre, subtítulo
- [x] TypeScript interfaces
- **Archivo clave:** `src/components/ServiceCard.tsx`

### Semana 2 - Listas, Inputs y Estilos
- [x] FlatList con 12 items (no ScrollView)
- [x] keyExtractor con id (no index)
- [x] TextInput búsqueda tiempo real
- [x] useMemo para filtrado, useCallback para renderItem
- [x] Theme constants COLORS, TYPOGRAPHY, SPACING
- [x] ListEmptyComponent, ItemSeparator
- **Archivo clave:** `src/screens/ServicesListScreen.tsx`

### Semana 3 - React Navigation 7
- [x] NavigationContainer
- [x] Stack Navigator (ServicesList → ServiceDetail)
- [x] Tab Navigator (5 tabs: Servicios, Clientes, Personal, Agenda, Favoritos)
- [x] Navegación anidada Tab → Stack
- [x] Pasar params con navigate, leer con useRoute
- [x] Tipado RootTabParamList, ServicesStackParamList
- [x] Iconos Ionicons
- **Archivo clave:** `src/navigation/RootNavigator.tsx`

### Semana 4 - Zustand
- [x] create store con estado y acciones
- [x] Selectores para optimizar re-renders
- [x] Persist middleware con AsyncStorage
- [x] Distinguir Zustand (favoritos) vs useState (búsqueda)
- [x] Badge dinámico en tab Favoritos
- [x] Toggle favorito desde lista y detalle
- **Archivo clave:** `src/stores/favoritesStore.ts`

### Semana 5 - Networking TanStack Query
- [x] Axios instance con baseURL, interceptors
- [x] mockApi con delay simulando red (para no depender de backend)
- [x] useQuery para GET (services, clients, staff, schedules)
- [x] useMutation para POST (create service) + invalidateQueries
- [x] Estados: isLoading → ActivityIndicator, isError → retry button, empty, pull-to-refresh
- [x] QueryClientProvider en App.tsx
- [x] Sin server state en Zustand
- **Archivos clave:** `src/services/api.ts`, `src/hooks/useServices.ts`

---

## 🚀 Cómo correr

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar Expo
pnpm start

# 3. Escanear QR con Expo Go (iOS/Android) o presionar:
# a → Android emulator
# i → iOS simulator
# w → web
```

### Variables de entorno (opcional)
Crea `.env.local`:
```
EXPO_PUBLIC_API_URL=https://tu-mockapi.io/api
```
Si no existe, usa mock local con delay + jsonplaceholder para demo real.

---

## 📁 Estructura

```
src/
├── theme/               # Semana 2 - COLORS, TYPOGRAPHY
├── types/               # Semana 1 - Service, Client, Staff, Schedule
├── data/mockData.ts     # 12 servicios, 8 clientes, 6 staff, 10 agendas
├── services/api.ts      # Semana 5 - axios + mockApi
├── hooks/useServices.ts # Semana 5 - useQuery, useMutation
├── stores/favoritesStore.ts # Semana 4 - Zustand persist
├── components/
│   ├── ServiceCard.tsx  # Semana 1 - Flexbox card
│   ├── ClientCard.tsx
│   ├── StaffCard.tsx
│   └── ScheduleCard.tsx
├── navigation/
│   ├── RootNavigator.tsx # Semana 3 - Tabs + Stacks
│   └── types.ts
└── screens/
    ├── ServicesListScreen.tsx  # S2 + S5 - FlatList + search + useQuery
    ├── ServiceDetailScreen.tsx # S3 + S4 - params + favoritos
    ├── CreateServiceScreen.tsx # S5 - useMutation
    ├── ClientsScreen.tsx
    ├── StaffScreen.tsx
    ├── AgendaScreen.tsx
    └── FavoritesScreen.tsx     # S4 - Zustand
```

---

## 🎨 Decisiones de diseño (Dominio Limpieza)

- **Paleta:** Cyan #22d3ee (limpieza, frescura) + Emerald #34d399 (desinfección, éxito) + dark background #0d1117 (profesional)
- **Categorías con colores:** residencial cyan, oficina morado, vidrios azul, postObra amarillo, industrial rosa, desinfeccion verde
- **Precios COP:** Formato colombiano $120.000, no dólares
- **Datos bogotanos:** Direcciones Calle 85, Carrera 7, clientes con nombres colombianos
- **Entidades completas:** No solo services, también clients, staff, schedules en tabs separados para demostrar dominio completo

---

## 📸 Screenshots (tomar en simulador)

1. Servicios lista con búsqueda
2. Filtro por categoría
3. Detalle servicio con incluye y botones
4. Favoritos con badge
5. Clientes, Personal, Agenda
6. Pull-to-refresh y loading
7. Formulario crear servicio

---

## 🔗 Repo oficial bootcamp

https://github.com/ergrato-dev/bc-reactnative

---

## 👤 Autor

Cristian Alvarado Guerrero - Ficha 3311987 - SENA CGMLTI Bogotá - 2026
