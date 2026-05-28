// frontend/src/components/layout/StudentNav.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import CoinBadge from '../common/CoinBadge'

const navItems = [
  { path: '/student', icon: '🏠', label: 'Início' },
  { path: '/student/activities', icon: '📚', label: 'Atividades' },
  { path: '/student/progress', icon: '🗺️', label: 'Progresso' },
  { path: '/student/shop', icon: '🛍️', label: 'Loja' },
]

export default function StudentNav({ coins = 0 }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  return (
    <>
      {/* Top bar mobile */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff',
        borderBottom: '2px solid #F0EEF8',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(45,45,94,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🪙</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#7C3AED' }}>KidCoin</span>
        </div>

        <CoinBadge amount={coins} size="sm" />

        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg, #9B72CF, #4D96FF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 900, fontSize: 16,
        }}>
          {user?.name?.[0]?.toUpperCase() || 'A'}
        </div>
      </header>

      {/* Bottom nav mobile */}
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
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: 22, filter: active ? 'none' : 'grayscale(0.5)', transform: active ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s' }}>{item.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: active ? '#7C3AED' : '#7C7C9A' }}>{item.label}</span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#7C3AED' }} />}
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
