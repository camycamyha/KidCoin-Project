// frontend/src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ROLE_HOME = {
  ADMIN: '/admin',
  TEACHER: '/teacher',
  STUDENT: '/student',
}

export function PrivateRoute({ children, allowedRoles }) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) return <div>Carregando...</div>

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />
  }

  return children
}
