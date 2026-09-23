# Semana 03 - React Navigation (Stack + Tabs) con parámetros tipados

## Qué se hizo
Navegación por pestañas (Servicios, Ajustes, Clientes, Personal, Agenda, Favoritos) y stack de servicios con detalle, creación y edición. Parámetros tipados con TypeScript.

## Archivos (rutas exactas)
- src/navigation/RootNavigator.tsx → TabNavigator + ServicesStack anidado + badge de favoritos
- src/navigation/types.ts → RootTabParamList y ServicesStackParamList tipados
- src/navigation/AuthNavigator.tsx → stack Login/Register

## Cómo probar
Tocar tarjeta → detalle con título dinámico (route.params.name); flecha atrás regresa; cambiar entre 6 tabs.

## Commit
git commit -m "feat: semana 03 - React Navigation Stack Tabs params tipados badge - CleanPro 3311987"
