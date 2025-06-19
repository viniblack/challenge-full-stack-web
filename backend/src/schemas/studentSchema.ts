import { z } from "zod";

export const registerStudentSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(25, 'Nome não pode exceder 25 caracteres'),

  email: z.string()
    .email('Formato de email inválido'),

  ra: z.string()
    .regex(/^\d{8}$/, 'RA deve conter exatamente 8 números'),

  cpf: z.string()
    .regex(/^\d{11}$/, 'CPF deve conter exatamente 11 números'),
});

export const updateStudentSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(25, 'Nome não pode exceder 25 caracteres'),

  email: z.string()
    .email('Formato de email inválido'),
});

export type RegisterInput = z.infer<typeof registerStudentSchema>;
export type UpdateInput = z.infer<typeof updateStudentSchema>;

export const validateSchema = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }

      return res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
}