# Semana 07 - Persistencia local + tema dinámico + vista grid

## Qué se hizo
Preferencias persistidas (AsyncStorage con fallback MMKV), pantalla de Ajustes, caché offline, tema dark/light aplicado a toda la app, vista lista/grid, orden por name/price/rating, SafeArea en buscador y fix de claves en storage. Los servicios creados/editados persisten.

## Archivos (rutas exactas)
- src/services/storage.ts → asyncStorage/secureStorage/mmkvStorage con validación de claves
- src/hooks/usePreferences.ts → preferencias con reload al enfocar
- src/hooks/useOfflineCache.ts → caché offline + clearCache seguro
- src/hooks/useThemeColors.ts → paleta según preferencia
- src/screens/SettingsScreen.tsx → ajustes + sesión + logout

## Cómo probar
Ajustes → cambiar tema claro/oscuro (toda la app cambia), vista grid (2 columnas), orden price; cerrar app → preferencias persisten; Borrar caché sin crash.

## Commit
git commit -m "feat: semana 07 - persistencia preferencias tema dinamico grid orden SafeArea fix storage - CleanPro 3311987"
