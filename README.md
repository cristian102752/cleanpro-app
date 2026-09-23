# Semana 06 - Formularios con React Hook Form + Zod

## Qué se hizo
Formularios de crear y editar servicio con useForm, Controller, zodResolver, errores inline, isDirty/isSubmitting y FormField reutilizable.

## Archivos (rutas exactas)
- src/schemas/serviceSchema.ts → esquema Zod del servicio
- src/components/FormField.tsx → campo reutilizable + CategoryField chips
- src/screens/CreateServiceScreen.tsx → POST con validación
- src/screens/EditServiceScreen.tsx → defaultValues + reset() desde API

## Cómo probar
+ Nuevo → tocar Crear vacío → errores rojos Zod; llenar y crear → aparece en lista; detalle → Editar → campos pre-llenados.

## Commit
git commit -m "feat: semana 06 - formularios RHF Zod FormField reutilizable EditScreen - CleanPro 3311987"
