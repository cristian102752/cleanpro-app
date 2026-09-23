# Semana 04 - Zustand favoritos con persistencia

## Qué se hizo
Store de favoritos con Zustand + persist (AsyncStorage). Toggle desde detalle, badge dinámico en el tab y pantalla de favoritos.

## Archivos (rutas exactas)
- src/stores/favoritesStore.ts → store con persist
- src/screens/FavoritesScreen.tsx → lista de favoritos + limpiar

## Cómo probar
Detalle → "Agregar a Favoritos" → tab muestra badge 1; cerrar y abrir app → persiste; "Limpiar" vacía.

## Commit
git commit -m "feat: semana 04 - Zustand favoritos persist badge dinamico - CleanPro 3311987"
