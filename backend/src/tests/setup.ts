import { PrismaClient } from '@prisma/client';

// Mock do Prisma Client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    student: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}));

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/testdb';
  process.env.PORT = '3001';
});

afterAll(() => {
  jest.clearAllMocks();
});

export const clearMocks = () => {
  jest.clearAllMocks();
};

export const mockStudent = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  ra: '12345678',
  cpf: '12345678901',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-01T00:00:00.000Z'),
};

export const mockStudents = [
  mockStudent,
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    ra: '87654321',
    cpf: '10987654321',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z'),
  },
];

export const createTestStudent = (overrides: Partial<typeof mockStudent> = {}) => ({
  ...mockStudent,
  ...overrides,
});

export const createValidStudentBody = (overrides: any = {}) => ({
  name: 'João Silva',
  email: 'joao.silva@email.com',
  ra: '12345678',
  cpf: '12345678901',
  ...overrides,
});