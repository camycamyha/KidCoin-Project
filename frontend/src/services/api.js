// frontend/src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
})

// Injeta JWT em toda requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@kidcoin:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Redireciona p/ login se o token expirar
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@kidcoin:token')
      localStorage.removeItem('@kidcoin:user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
