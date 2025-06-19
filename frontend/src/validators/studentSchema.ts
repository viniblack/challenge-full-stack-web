import { z } from 'zod'

export const studentSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(25, 'Nome não pode exceder 25 caracteres'),

  email: z.string()
    .email('Formato de email inválido'),

  ra: z.string()
    .regex(/^\d{8}$/, 'RA deve conter exatamente 8 números'),

  cpf: z.string()
    .regex(/^\d{11}$/, 'CPF deve conter exatamente 11 números'),
})
