import apiClient from './apiClient'

export interface Student {
  id: string
  name: string
  email: string
  ra: string
  cpf: string
  createdAt?: string
}

export type CreateStudentRequest = {
  name: string
  email: string
  ra: string
  cpf: string
}

export type UpdateStudentRequest = {
  name?: string
  email?: string
}

export type StudentResponse = {
  student: {
    name: string
    email: string
    ra: string
    cpf: string
  }
}

const studentAPI = {
  create: async (payload: CreateStudentRequest): Promise<StudentResponse> => {
    const res = await apiClient.post<StudentResponse>('/api/student', payload)
    return res.data
  },

  getAll: async () => {
    const res = await apiClient.get('/api/student')
    return res.data
  },

  getById: async (id: string) => {
    const res = await apiClient.get(`/api/student/${id}`)
    return res.data
  },

  update: async (id: string, payload: UpdateStudentRequest) => {
    const res = await apiClient.patch<StudentResponse>(`/api/student/${id}`, payload)
    return res.data
  },

  delete: async (id: string) => {
    const res = await apiClient.delete(`/api/student/${id}`)
    return res.data
  },
}

export default studentAPI
