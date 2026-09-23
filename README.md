# Semana 02 - FlatList, búsqueda en tiempo real y tema global

## Qué se hizo
Lista con FlatList, TextInput de búsqueda que filtra al escribir, chips de categorías, empty state y sistema de tema (COLORS/TYPOGRAPHY/SPACING/RADIUS) usado con StyleSheet.

## Archivos (rutas exactas)
- src/screens/ServicesListScreen.tsx → búsqueda + filtros + FlatList
- src/theme/index.ts → paleta dark + light y getColors()
- src/hooks/useThemeColors.ts → hook de tema dinámico

## Cómo probar
Escribir "vidrios" filtra al instante; buscar "xxx" muestra empty state; chip oficina filtra 2 servicios.

## Commit
git commit -m "feat: semana 02 - FlatList busqueda tiempo real chips y theme global - CleanPro 3311987"
