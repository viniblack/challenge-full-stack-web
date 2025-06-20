import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import StudentController from '../../controllers/StudentController';
import { mockStudent, mockStudents, clearMocks } from '../setup';

const mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
const studentController = StudentController(mockPrisma);

const mockRequest = (body: any = {}, params: any = {}) => ({
  body,
  params
}) as Request;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}


describe('StudentController', () => {
  beforeEach(() => {
    clearMocks();
  });

  describe('create', () => {
    it('should create a student successfully', async () => {
      const req = mockRequest({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '12345678',
        cpf: '12345678901',
      });
      const res = mockResponse();

      (mockPrisma.student.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.student.create as jest.Mock).mockResolvedValue(mockStudent);

      await studentController.create(req, res);

      expect(mockPrisma.student.findUnique).toHaveBeenCalledWith({
        where: {
          email_ra_cpf: {
            email: 'joao.silva@email.com',
            ra: '12345678',
            cpf: '12345678901',
          },
        },
      });

      expect(mockPrisma.student.create).toHaveBeenCalledWith({
        data: {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          ra: '12345678',
          cpf: '12345678901',
        },
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Aluno criado com sucesso',
        student: mockStudent,
      });
    })

    it('should return a 409 error when the student already exists', async () => {
      const req = mockRequest({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '12345678',
        cpf: '12345678901',
      });
      const res = mockResponse();

      (mockPrisma.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);

      await studentController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Estudante já cadastrado',
        message: 'Esse estudante já está cadastrado',
      });
    });

    it('should handle a unique constraint violation error', async () => {
      const req = mockRequest({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '12345678',
        cpf: '12345678901',
      });
      const res = mockResponse();

      (mockPrisma.student.findUnique as jest.Mock).mockResolvedValue(null);

      const prismaError = {
        code: 'P2002',
        meta: { target: ['email'] },
        message: 'Unique constraint failed on the fields: (`email`)',
        name: 'PrismaClientKnownRequestError',
      };

      (mockPrisma.student.create as jest.Mock).mockRejectedValue(prismaError);

      await studentController.create(req, res);

      // expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Estudante já cadastrado',
        message: 'Já existe um estudante com o mesmo email',
      });
    });

    it('should handle an internal server error', async () => {
      const req = mockRequest({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        ra: '12345678',
        cpf: '12345678901',
      });
      const res = mockResponse();

      (mockPrisma.student.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.student.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await studentController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao criar aluno',
        error: 'Database error',
      });
    });
  });

  describe('getAll', () => {
    it('should return all students', async () => {
      const req = mockRequest();
      const res = mockResponse();

      (mockPrisma.student.findMany as jest.Mock).mockResolvedValue(mockStudents);

      await studentController.getAll(req, res);

      expect(mockPrisma.student.findMany).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockStudents);
    });

    it('should handle an error when fetching students', async () => {
      const req = mockRequest();
      const res = mockResponse();

      (mockPrisma.student.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

      await studentController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao listar alunos',
        error: 'Database error',
      });
    });
  });


  describe('getById', () => {
    it('should return a student by ID', async () => {
      const req = mockRequest({}, { id: mockStudent.id });
      const res = mockResponse();

      (mockPrisma.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);

      await studentController.getById(req, res);

      expect(mockPrisma.student.findUnique).toHaveBeenCalledWith({
        where: { id: mockStudent.id },
      });
      expect(res.json).toHaveBeenCalledWith(mockStudent);
    });

    it('should return 404 when the student is not found', async () => {
      const req = mockRequest({}, { id: 'non-existent-id' });
      const res = mockResponse();

      (mockPrisma.student.findUnique as jest.Mock).mockResolvedValue(null);

      await studentController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Estudante não encontrado',
        message: 'Os dados do perfil não foram encontrados',
      });
    });

    it('should handle an internal error', async () => {
      const req = mockRequest({}, { id: mockStudent.id });
      const res = mockResponse();

      (mockPrisma.student.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

      await studentController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao buscar aluno',
        error: 'Database error',
      });
    });
  });

  describe('update', () => {
    it('should update a student successfully', async () => {
      const updateData = { name: 'João Santos', email: 'joao.santos@email.com' };
      const req = mockRequest(updateData, { id: mockStudent.id });
      const res = mockResponse();

      const updatedStudent = { ...mockStudent, ...updateData };
      (mockPrisma.student.update as jest.Mock).mockResolvedValue(updatedStudent);

      await studentController.update(req, res);

      expect(mockPrisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudent.id },
        data: updateData,
      });

      expect(res.json).toHaveBeenCalledWith({
        message: 'Aluno atualizado com sucesso',
        student: updatedStudent,
      });
    });

    it('should handle a duplicate data error', async () => {
      const req = mockRequest(
        { name: 'João Santos', email: 'joao.santos@email.com' },
        { id: mockStudent.id }
      );
      const res = mockResponse();

      const prismaError = {
        code: 'P2002',
        meta: { target: ['email'] },
      };
      (mockPrisma.student.update as jest.Mock).mockRejectedValue(prismaError);

      await studentController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Dados duplicados',
        message: 'Já existe um estudante com o mesmo email',
      });
    });
  });

  describe('delete', () => {
    it('should delete a student successfully', async () => {
      const req = mockRequest({}, { id: mockStudent.id });
      const res = mockResponse();

      (mockPrisma.student.delete as jest.Mock).mockResolvedValue(mockStudent);

      await studentController.delete(req, res);

      expect(mockPrisma.student.delete).toHaveBeenCalledWith({
        where: { id: mockStudent.id },
      });

      expect(res.json).toHaveBeenCalledWith({
        message: 'Aluno excluído com sucesso',
      });
    });

    it('should handle an error when deleting a student', async () => {
      const req = mockRequest({}, { id: mockStudent.id });
      const res = mockResponse();

      (mockPrisma.student.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await studentController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao excluir aluno',
        error: 'Database error',
      });
    });
  });
});