// frontend/src/pages/auth/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const ROLE_HOME = { ADMIN: '/admin', TEACHER: '/teacher', STUDENT: '/student' }

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(ROLE_HOME[user.role] || '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#1a1a2e' }}>🪙 KidCoin</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Educação financeira para crianças</p>

        {error && (
          <div style={{ background: '#fff0f0', border: '1px solid #ffcdd2', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', color: '#c62828', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="seu@email.com"
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '1rem', fontSize: '1rem', boxSizing: 'border-box' }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Senha</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="••••••••"
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '1.5rem', fontSize: '1rem', boxSizing: 'border-box' }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '0.875rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
