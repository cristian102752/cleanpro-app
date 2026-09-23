import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(3, 'Mínimo 3').max(80),
  description: z.string().min(10, 'Mín 10').max(500),
  price: z.coerce.number().positive().min(1000).max(10000000),
  durationMinutes: z.coerce.number().int().min(30).max(480),
  category: z.enum(['residencial','oficina','vidrios','postObra','industrial','desinfeccion']),
  includes: z.string().optional().transform((val) => val?.split(',').map(s=>s.trim()).filter(Boolean) ?? []),
});
export type ServiceFormData = z.infer<typeof serviceSchema>;