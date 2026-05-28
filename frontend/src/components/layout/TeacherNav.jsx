// frontend/src/components/layout/TeacherNav.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { path: '/teacher', icon: '🏠', label: 'Início' },
  { path: '/teacher/classrooms', icon: '🏫', label: 'Salas' },
  { path: '/teacher/activities', icon: '📝', label: 'Atividades' },
  { path: '/teacher/students', icon: '👦', label: 'Alunos' },
]

export default function TeacherNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff',
        borderBottom: '2px solid #F0EEF8',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(45,45,94,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🪙</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#7C3AED' }}>KidCoin</div>
            <div style={{ fontSize: 11, color: '#7C7C9A', fontWeight: 600 }}>Professor</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#2D2D5E' }}>Olá, {user?.name?.split(' ')[0]}! 👋</span>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4D96FF, #6BCB77)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 16,
          }}>
            {user?.name?.[0]?.toUpperCase() || 'P'}
          </div>
        </div>
      </header>

      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff',
        borderTop: '2px solid #F0EEF8',
        display: 'flex',
        boxShadow: '0 -2px 20px rgba(45,45,94,0.10)',
      }}>
        {navItems.map(item => {
          const active = location.pathname === item.path
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              flex: 1, padding: '10px 0 12px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 22, transform: active ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s' }}>{item.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: active ? '#2563EB' : '#7C7C9A' }}>{item.label}</span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#2563EB' }} />}
            </button>
          )
        })}
        <button onClick={logout} style={{
          flex: 1, padding: '10px 0 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}>
          <span style={{ fontSize: 22 }}>👋</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#7C7C9A' }}>Sair</span>
        </button>
      </nav>
    </>
  )
}
