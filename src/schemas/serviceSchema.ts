import { z } from 'zod';

// Semana 06 - esquema Zod del servicio de limpieza
export const serviceSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres').max(80, 'Máximo 80'),
  description: z.string().min(10, 'Mínimo 10 caracteres').max(500, 'Máximo 500'),
  price: z.coerce.number({ message: 'Precio requerido' }).positive('Debe ser mayor a 0').min(1000, 'Mínimo $1.000').max(10000000, 'Máximo $10.000.000'),
  durationMinutes: z.coerce.number({ message: 'Duración requerida' }).int('Debe ser entero').min(30, 'Mínimo 30 min').max(480, 'Máximo 8 horas'),
  category: z.enum(['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion'], { message: 'Categoría requerida' }),
  includes: z.string().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
