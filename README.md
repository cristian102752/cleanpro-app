# Semana 08 - Autenticación JWT + SecureStore + Zustand

## Qué se hizo
Login y Registro con RHF+Zod, authStore con Zustand, tokens en SecureStore, interceptor Axios con refresh automático y protección de rutas (Auth vs Main).

## Archivos (rutas exactas)
- src/services/authApi.ts → login/refresh/getMe contra dummyjson
- src/stores/authStore.ts → login/logout/checkAuth/refreshTokens
- src/schemas/authSchema.ts → loginSchema y registerSchema
- src/screens/LoginScreen.tsx → login + modo demo + enlace a registro
- src/screens/RegisterScreen.tsx → registro con confirmación de contraseña

## Cómo probar
Login con emilys/emilyspass (o botón Modo Demo); "Regístrate aquí" crea cuenta con validaciones; Ajustes → Cerrar sesión vuelve al login.

## Commit
git commit -m "feat: semana 08 - auth JWT SecureStore Zustand login registro refresh - CleanPro 3311987"
