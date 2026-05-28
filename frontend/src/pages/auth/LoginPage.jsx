import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Mascot from '../../components/common/Mascot'

const ROLE_HOME = { ADMIN: '/admin', TEACHER: '/teacher', STUDENT: '/student' }

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mascotMood, setMascotMood] = useState('happy')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setMascotMood('thinking')
    try {
      const user = await login(form.email, form.password)
      setMascotMood('celebrating')
      setTimeout(() => navigate(ROLE_HOME[user.role] || '/'), 600)
    } catch (err) {
      setMascotMood('happy')
      setError(err.response?.data?.message || 'E-mail ou senha incorretos!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #EDE9FE 0%, #DBEAFE 50%, #DCFCE7 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: [60,40,80,50,70,45][i], height: [60,40,80,50,70,45][i],
          borderRadius: '50%',
          background: ['#FFD93D','#FF9F43','#9B72CF','#6BCB77','#4D96FF','#FF6B6B'][i],
          opacity: 0.15,
          top: ['10%','70%','20%','85%','5%','60%'][i],
          left: ['5%','8%','85%','80%','50%','90%'][i],
          animation: `bounce ${[3,4,3.5,4.5,3,4][i]}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }} />
      ))}
      <div style={{ width: '100%', maxWidth: 420, animation: 'fadeUp 0.5s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Mascot size={110} mood={mascotMood} message={
            mascotMood === 'celebrating' ? '🎉 Bem-vindo de volta!' :
            mascotMood === 'thinking' ? '🔍 Verificando...' : 'Olá! Entre para aprender! 😄'
          } />
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#7C3AED', marginTop: 16, letterSpacing: -1 }}>🪙 KidCoin</h1>
          <p style={{ color: '#7C7C9A', fontWeight: 600, fontSize: 15 }}>Educação financeira divertida!</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 28, padding: 32, boxShadow: '0 8px 40px rgba(124,58,237,0.15)' }}>
          {error && (
            <div style={{ background: '#FFE4E6', border: '2px solid #FF6B6B', borderRadius: 14, padding: '12px 16px', marginBottom: 20, color: '#DC2626', fontWeight: 700, fontSize: 14, animation: 'pop 0.3s ease-out' }}>
              😅 {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 14, fontWeight: 800, color: '#2D2D5E', display: 'block', marginBottom: 8 }}>📧 E-mail</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="seu@email.com" required
                style={{ width: '100%', padding: '14px 18px', borderRadius: 14, border: '2px solid #E5E3F0', fontSize: 15, fontWeight: 600, outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #9B72CF'}
                onBlur={e => e.target.style.border = '2px solid #E5E3F0'} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 14, fontWeight: 800, color: '#2D2D5E', display: 'block', marginBottom: 8 }}>🔒 Senha</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" required
                style={{ width: '100%', padding: '14px 18px', borderRadius: 14, border: '2px solid #E5E3F0', fontSize: 15, fontWeight: 600, outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #9B72CF'}
                onBlur={e => e.target.style.border = '2px solid #E5E3F0'} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: 16, borderRadius: 50, fontSize: 18, fontWeight: 900, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #9B72CF, #4D96FF)', color: '#fff',
              boxShadow: '0 6px 20px rgba(124,58,237,0.35)', opacity: loading ? 0.75 : 1, transition: 'all 0.2s',
            }}>
              {loading ? '⏳ Entrando...' : '🚀 Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
