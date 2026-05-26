// frontend/src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('@kidcoin:user')
    const token = localStorage.getItem('@kidcoin:token')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('@kidcoin:token', data.token)
    localStorage.setItem('@kidcoin:user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('@kidcoin:token')
    localStorage.removeItem('@kidcoin:user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro do AuthProvider')
  return ctx
}
