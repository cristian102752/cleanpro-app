import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres').max(30),
  password: z.string().min(6, 'Mínimo 6 caracteres').max(50),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Nombre requerido').max(60),
  email: z.string().email('Email inválido'),
  username: z.string().min(3, 'Mín 3').max(20),
  password: z.string().min(6, 'Mín 6').max(50),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});
export type RegisterFormData = z.infer<typeof registerSchema>;