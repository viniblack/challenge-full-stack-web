import { registerStudentSchema, updateStudentSchema, validateSchema } from '../../schemas/studentSchema';
import { Request, Response, NextFunction } from 'express';

describe('Student Schema Validation', () => {
  describe('registerStudentSchema', () => {
    it('should validate correct data', () => {
      const validData = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '12345678',
        cpf: '12345678901',
      };

      const result = registerStudentSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    describe('name validation', () => {
      it('should reject a name that is too short', () => {
        const invalidData = {
          name: 'A',
          email: 'joao.silva@email.com',
          ra: '12345678',
          cpf: '12345678901',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Nome deve ter pelo menos 2 caracteres');
        }
      });

      it('should reject a name that is too long', () => {
        const invalidData = {
          name: 'A'.repeat(26),
          email: 'joao.silva@email.com',
          ra: '12345678',
          cpf: '12345678901',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Nome não pode exceder 25 caracteres');
        }
      });
    });

    describe('email validation', () => {
      it('should reject an invalid email', () => {
        const invalidData = {
          name: 'João Silva',
          email: 'email-invalido',
          ra: '12345678',
          cpf: '12345678901',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('Formato de email inválido');
        }
      });

      it('should accept valid emails', () => {
        const validEmails = [
          'user@example.com',
          'test.email@domain.co.uk',
          'user+tag@example.org',
        ];

        validEmails.forEach(email => {
          const data = {
            name: 'João Silva',
            email,
            ra: '12345678',
            cpf: '12345678901',
          };

          const result = registerStudentSchema.safeParse(data);
          expect(result.success).toBe(true);
        });
      });
    });

    describe('ra validation', () => {
      it('should reject RA with less than 8 digits', () => {
        const invalidData = {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          ra: '1234567',
          cpf: '12345678901',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('RA deve conter exatamente 8 números');
        }
      });

      it('should reject RA with more than 8 digits', () => {
        const invalidData = {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          ra: '123456789',
          cpf: '12345678901',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('RA deve conter exatamente 8 números');
        }
      });

      it('should reject RA with non-numeric characters', () => {
        const invalidData = {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          ra: '1234567a',
          cpf: '12345678901',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('RA deve conter exatamente 8 números');
        }
      });
    });

    describe('cpf validation', () => {
      it('should reject CPF with less than 11 digits', () => {
        const invalidData = {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          ra: '12345678',
          cpf: '1234567890',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('CPF deve conter exatamente 11 números');
        }
      });

      it('should reject CPF with more than 11 digits', () => {
        const invalidData = {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          ra: '12345678',
          cpf: '123456789012',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('CPF deve conter exatamente 11 números');
        }
      });

      it('should reject CPF with non-numeric characters', () => {
        const invalidData = {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          ra: '12345678',
          cpf: '1234567890a',
        };

        const result = registerStudentSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toBe('CPF deve conter exatamente 11 números');
        }
      });
    });
  });

  describe('updateStudentSchema', () => {
    it('should validate correct update data', () => {
      const validData = {
        name: 'João Santos',
        email: 'joao.santos@email.com',
      };

      const result = updateStudentSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should apply the same validations for name and email', () => {
      const invalidData = {
        name: 'A',
        email: 'email-invalido',
      };

      const result = updateStudentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors).toHaveLength(2);
        expect(result.error.errors[0].message).toBe('Nome deve ter pelo menos 2 caracteres');
        expect(result.error.errors[1].message).toBe('Formato de email inválido');
      }
    });
  });

  describe('validateSchema middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
      mockRequest = {
        body: {},
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      mockNext = jest.fn();
    });

    it('should call next() when data is valid', () => {
      mockRequest.body = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '12345678',
        cpf: '12345678901',
      };

      const middleware = validateSchema(registerStudentSchema);
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return a 400 error when data is invalid', () => {
      mockRequest.body = {
        name: 'A',
        email: 'email-invalido',
        ra: '123',
        cpf: '123',
      };

      const middleware = validateSchema(registerStudentSchema);
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Dados inválidos',
        details: expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'Nome deve ter pelo menos 2 caracteres',
          }),
          expect.objectContaining({
            field: 'email',
            message: 'Formato de email inválido',
          }),
          expect.objectContaining({
            field: 'ra',
            message: 'RA deve conter exatamente 8 números',
          }),
          expect.objectContaining({
            field: 'cpf',
            message: 'CPF deve conter exatamente 11 números',
          }),
        ]),
      });
    });

    it('should handle an internal server error', () => {
      // Simular erro não relacionado ao Zod
      const mockSchema = {
        parse: jest.fn().mockImplementation(() => {
          throw new Error('Erro interno');
        }),
      };

      mockRequest.body = { name: 'João Silva' };

      const middleware = validateSchema(mockSchema as any);
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro interno do servidor',
      });
    });
  });
});