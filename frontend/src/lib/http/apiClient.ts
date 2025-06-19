import type { AxiosInstance } from 'axios'
import axios from 'axios'

const baseURL = import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:3001'

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export default apiClient
