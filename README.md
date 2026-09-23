# Semana 09 - Animaciones con Animated API

## Qué se hizo
Animaciones de entrada escalonada (fade+translate por índice), scale al presionar, shimmer de carga con Animated.loop y LayoutAnimation al filtrar.

## Archivos (rutas exactas)
- src/hooks/useAnimations.ts → useFadeIn, useScaleOnPress, useShimmer
- src/components/AnimatedServiceCard.tsx → tarjeta animada con delay index*80
- src/components/LoadingShimmer.tsx → skeleton con brillo animado

## Cómo probar
Abrir Servicios → tarjetas aparecen una tras otra; tocar tarjeta → escala 0.95; escribir en buscador → LayoutAnimation suave; carga inicial → shimmer.

## Commit
git commit -m "feat: semana 09 - animaciones Animated API shimmer LayoutAnimation stagger - CleanPro 3311987"
