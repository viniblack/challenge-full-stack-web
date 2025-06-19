import { Request, Response } from 'express';
import prisma from '../client';
import { RegisterInput } from "../schemas/studentSchema.js";
import { Prisma } from '@prisma/client';

const studentController = {
  /**
   * POST /api/student - Registro de novo estudante
   */
  create: async (req: Request, res: Response) => {
    try {
      const { name, email, ra, cpf }: RegisterInput = req.body;

      const existingStudent = await prisma.student.findUnique({
        where: {
          email_ra_cpf: {
            email,
            ra,
            cpf
          }
        }
      });

      if (existingStudent) {
        return res.status(409).json({
          error: 'Estudante já cadastrado',
          message: 'Esse estudante já está cadastrado'
        });
      }

      const student = await prisma.student.create({
        data: { name, email, ra, cpf },
      });

      res.status(201).json({
        message: "Aluno criado com sucesso",
        student
      });

    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return res.status(409).json({
            error: 'Estudante já cadastrado',
            message: `Já existe um estudante com o mesmo ${err.meta?.target}`,
          });
        }
      }

      const errorMessage = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({
        message: "Erro ao criar aluno",
        error: errorMessage,
      });
    }
  },

  /**
   * GET /api/student - Retorna todos estudantes
   */
  getAll: async (req: Request, res: Response) => {
    try {
      const students = await prisma.student.findMany();
      res.json(students);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({
        message: "Erro ao listar alunos",
        error: errorMessage
      });
    }
  },

  /**
   * GET /api/student/:id - Busca estudante por id
   */
  getById: async (req: Request, res: Response) => {
    try {
      const studentId = req.params.id;

      const student = await prisma.student.findUnique({
        where: { id: studentId },
      });

      if (!student) {
        return res.status(404).json({
          error: 'Estudante não encontrado',
          message: 'Os dados do perfil não foram encontrados'
        });
      }

      res.json(student);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({
        message: "Erro ao buscar aluno",
        error: errorMessage
      });
    }
  },

  /**
   * PATCH /api/student/:id - Atualiza dados do estudante
   */
  update: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const student = await prisma.student.update({
        where: { id: req.params.id },
        data: { name, email },
      });
      res.json({message: "Aluno atualizado com sucesso", student});
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return res.status(409).json({
            error: 'Dados duplicados',
            message: `Já existe um estudante com o mesmo ${err.meta?.target}`,
          });
        }
      }
      const errorMessage = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({
        message: "Erro ao atualizar aluno",
        error: errorMessage,
      });
    }
  },

  /**
  * DELETE /api/student/:id - Apaga estudante
  */
  delete: async (req: Request, res: Response) => {
    try {
      await prisma.student.delete({
        where: { id: req.params.id },
      });
      res.json({ message: "Aluno excluído com sucesso" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({
        message: "Erro ao excluir aluno",
        error: errorMessage
      });
    }
  },
};

export default studentController;
