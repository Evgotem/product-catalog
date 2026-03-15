import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Логин обязателен'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;