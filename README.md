# CleanPro - Empresa de Limpieza

**Autor:** Cristian Alvarado Guerrero

**Ficha:** 3311987

**Bootcamp:** bc-reactnative — semanas 1 a 9

**Correo:** alvaradocristian1027@gmail.com

**Dominio:** Empresa de limpieza

**Entidades:** clients, services, staff, schedules

> App móvil para gestión de empresa de limpieza, construida desde cero con **React Native + Expo + TypeScript**, cumpliendo las rúbricas de las semanas 1 a 9 del bootcamp `ergrato-dev/bc-reactnative`.

---

## 🌳 Estructura del repositorio (evaluación por semana)

El repositorio sigue el flujo de `eval-semanal`: **una rama por semana**, cada una con **un solo commit** que contiene únicamente el código que existía hasta esa semana (modo estricto), más su `README.md` explicativo.

| Rama | Semana | Contenido de la entrega |
|------|--------|--------------------------|
| `week-01` | 01 | Core Components y Flexbox: `ServiceCard`, tema global, tipos y mockData |
| `week-02` | 02 | FlatList, búsqueda en tiempo real, chips de categoría y empty state |
| `week-03` | 03 | React Navigation: Stack anidado en Tabs, parámetros tipados, detalle |
| `week-04` | 04 | Zustand con persist (AsyncStorage): favoritos, badge dinámico |
| `week-05` | 05 | TanStack Query + Axios: loading, error, pull-to-refresh, caché |
| `week-06` | 06 | React Hook Form + Zod: crear/editar servicios, FormField reutilizable |
| `week-07` | 07 | Persistencia local: preferencias, tema dark/light, vista grid, SafeArea, Ajustes |
| `week-08` | 08 | Auth JWT + SecureStore + Zustand: login, registro, refresh automático |
| `week-09` | 09 | Animaciones: fade escalonado, scale al presionar, shimmer, LayoutAnimation |
| `main` | — | Aplicación completa y funcional (las 9 semanas integradas) |

Para revisar una semana: selector de ramas → `week-XX` → 1 commit + README de esa semana.

---

## 🎯 Objetivo del dominio

CleanPro es una empresa bogotana de limpieza que ofrece servicios residenciales, corporativos, industriales y de desinfección. La app permite:

- **Services:** Catálogo de 12 servicios con precios en COP, filtro por categoría, búsqueda en tiempo real, creación y edición con validación
- **Clients:** Listar 8 clientes (residencial y empresarial) con historial
- **Staff:** Ver 6 colaboradores (operarios, supervisores, especialistas) con disponibilidad
- **Schedules:** Gestionar 10 agendamientos con estados (pendiente, en_curso, completado)
- **Favorites:** Guardar servicios favoritos con persistencia (Zustand + AsyncStorage)
- **Auth:** Login y registro con JWT (accessToken + refreshToken) guardados en SecureStore
- **Preferences:** Tema dark/light, vista lista/grid y ordenamiento persistidos

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos
- Node.js 18+
- Expo Go instalado en el celular (Android/iOS)
- Celular y computador en la misma red WiFi

### Pasos

```bash
# 1. Clonar y entrar
git clone https://github.com/cristian102752/cleanpro-app.git
cd cleanpro-app

# 2. Instalar dependencias
npm install --force

# 3. Arrancar Metro
npx expo start --clear --host lan

# 4. Escanear el QR con Expo Go (Android) o Cámara (iOS)
```

### Credenciales demo (Semana 08)

| Usuario | Contraseña |
|---------|------------|
| `emilys` | `emilyspass` |

Si la API externa no responde, la app ofrece el botón **🚀 Entrar en Modo Demo** que genera una sesión local.

---

## 📱 Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | React Native + Expo SDK 57 |
| Lenguaje | TypeScript |
| Navegación | @react-navigation (native-stack + bottom-tabs) |
| Estado global | Zustand (con middleware persist) |
| Datos remotos | TanStack Query (React Query) + Axios |
| Formularios | React Hook Form + Zod (zodResolver) |
| Persistencia | AsyncStorage, expo-secure-store (tokens JWT) |
| Animaciones | Animated API + LayoutAnimation |
| Tema | Sistema propio COLORS/TYPOGRAPHY/SPACING/RADIUS con dark/light |

---

## 🗂️ Estructura del código (main)

```
src/
├── components/     # ServiceCard, AnimatedServiceCard, FormField, cards, shimmer
├── data/           # mockData: 12 servicios, 8 clientes, 6 staff, 10 agendas
├── hooks/          # useServices, usePreferences, useThemeColors, useAnimations, useOfflineCache
├── navigation/     # RootNavigator (6 tabs), AuthNavigator, types tipados
├── schemas/        # serviceSchema y authSchema (Zod)
├── screens/        # ServicesList, Detail, Create, Edit, Clients, Staff, Agenda, Favorites, Settings, Login, Register
├── services/       # api (Axios + mockApi), authApi, storage (AsyncStorage/SecureStore)
├── stores/         # favoritesStore, authStore (Zustand)
├── theme/          # paletas dark y light
└── types/          # Service, Client, Staff, Schedule
```

---

## ✅ Funcionalidades por semana (resumen)

### Semana 01 — Core Components y Flexbox
Tarjeta `ServiceCard` con imagen, badge de categoría, precio formateado en COP y chips de "incluye", maquetada con Flexbox sobre el tema global.

### Semana 02 — Listas y búsqueda
`FlatList` con búsqueda que filtra al escribir, chips de categoría con toggle, empty state y contador de resultados.

### Semana 03 — Navegación
TabNavigator con 5 pestañas y Stack anidado para Servicios → Detalle. Parámetros tipados (`ServicesStackParamList`), título dinámico desde `route.params` e iconos Ionicons con estado focused.

### Semana 04 — Estado global
`favoritesStore` con Zustand + persist en AsyncStorage. Toggle desde el detalle, badge dinámico en el tab y pantalla de favoritos con limpieza.

### Semana 05 — Datos remotos
`apiClient` Axios con interceptores y `mockApi` con delays. Hooks `useServices`, `useClients`, `useStaff`, `useSchedules` con estados de loading/error y pull-to-refresh.

### Semana 06 — Formularios
`useForm` + `Controller` + `zodResolver` con errores inline, `isDirty`/`isSubmitting`. `FormField` y `CategoryField` reutilizables. Edición con `defaultValues` + `reset()` desde la API.

### Semana 07 — Persistencia y preferencias
Preferencias persistidas (tema, vista lista/grid, orden), `useSafeAreaInsets` para el buscador, caché offline con fallback, pantalla de Ajustes y tema dark/light aplicado a toda la app.

### Semana 08 — Autenticación
Login y registro con RHF+Zod, tokens JWT en SecureStore, `authStore` con `checkAuth`/`refreshTokens`, interceptor que agrega `Authorization` y refresca en 401, y protección de rutas Auth ↔ Main.

### Semana 09 — Animaciones
Entrada escalonada de tarjetas (fade + translate con delay `index*80`), scale 0.95 al presionar con spring, shimmer de carga con `Animated.loop` y `LayoutAnimation` al filtrar.

---

## 📸 Prueba rápida (recorrido sugerido)

1. Inicia sesión con `emilys / emilyspass` (Semana 08)
2. Servicios: búsqueda, categorías, fade escalonado y shimmer (Semanas 02/09)
3. `+ Nuevo`: validaciones Zod inline y creación persistida (Semana 06/07)
4. Detalle: favoritos con badge y persistencia al reiniciar (Semana 04)
5. Ajustes: tema claro/oscuro, vista grid, orden por precio, borrar caché y cerrar sesión (Semanas 07/08)
6. Clientes, Personal y Agenda: listado de las 4 entidades del dominio (Semanas 03/05)

---

## 📝 Commits

Cada rama `week-XX` contiene exactamente **un commit** con el mensaje:

```
feat: entrega semana XX - <resumen de la semana> - CleanPro 3311987
```

La rama `main` conserva el historial completo de desarrollo con un commit por semana más los fixes de funcionamiento.
