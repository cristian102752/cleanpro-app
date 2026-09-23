import { z } from 'zod';

// Schema para Empresa de Limpieza - CleanPro
// Semana 06 - RHF + Zod

export const serviceSchema = z.object({
  name: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(80, 'Máximo 80 caracteres'),

  description: z
    .string()
    .min(10, 'Mínimo 10 caracteres - describe qué incluye')
    .max(500, 'Máximo 500 caracteres'),

  price: z.coerce
    .number({ invalid_type_error: 'Debe ser un número' })
    .positive('Debe ser mayor a 0')
    .min(1000, 'Mínimo $1.000 COP')
    .max(10000000, 'Máximo $10.000.000 COP'),

  durationMinutes: z.coerce
    .number({ invalid_type_error: 'Debe ser un número' })
    .int('Debe ser entero')
    .min(30, 'Mínimo 30 minutos')
    .max(480, 'Máximo 8 horas (480 min)'),

  category: z.enum(
    ['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion'],
    { errorMap: () => ({ message: 'Selecciona una categoría válida' }) }
  ),

  includes: z
    .string()
    .optional()
    .transform((val) => val?.split(',').map((s) => s.trim()).filter(Boolean) ?? []),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// Schema para Cliente (para practicar)
export const clientSchema = z.object({
  name: z.string().min(2, 'Nombre requerido').max(60),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7, 'Teléfono mínimo 7 dígitos').max(15),
  address: z.string().min(5, 'Dirección requerida').max(100),
  type: z.enum(['residencial', 'empresarial']),
});

export type ClientFormData = z.infer<typeof clientSchema>;

// Schema para Agendamiento
export const scheduleSchema = z.object({
  date: z.string().min(1, 'Fecha requerida').regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD'),
  time: z.string().min(1, 'Hora requerida').regex(/^\d{2}:\d{2}$/, 'Formato HH:MM'),
  address: z.string().min(5, 'Dirección requerida'),
  notes: z.string().max(200, 'Máx 200 caracteres').optional(),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;
