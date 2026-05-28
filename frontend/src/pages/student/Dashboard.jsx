// frontend/src/pages/student/Dashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import StudentNav from '../../components/layout/StudentNav'
import Mascot from '../../components/common/Mascot'
import api from '../../services/api'

const LEVELS = [
  { name: 'Iniciante', minXp: 0, icon: '🌱' },
  { name: 'Explorador', minXp: 100, icon: '🔭' },
  { name: 'Poupador', minXp: 300, icon: '💰' },
  { name: 'Investidor', minXp: 600, icon: '📈' },
  { name: 'Mestre', minXp: 1000, icon: '👑' },
]

function getLevel(xp) {
  let lvl = LEVELS[0]
  for (const l of LEVELS) { if (xp >= l.minXp) lvl = l }
  return lvl
}

function getNextLevel(xp) {
  for (let i = 0; i < LEVELS.length - 1; i++) {
    if (xp < LEVELS[i + 1].minXp) return LEVELS[i + 1]
  }
  return null
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [profileRes, actRes] = await Promise.all([
          api.get('/coins/balance'),
          api.get('/activities'),
        ])
        setProfile(profileRes.data)
        setActivities(actRes.data.slice(0, 3))
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  const coins = profile?.totalCoins || 0
  const xp = profile?.totalXp || 0
  const level = getLevel(xp)
  const nextLevel = getNextLevel(xp)
  const xpProgress = nextLevel
    ? Math.round(((xp - level.minXp) / (nextLevel.minXp - level.minXp)) * 100)
    : 100

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s ease-in-out infinite', fontSize: 48 }}>🪙</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <StudentNav coins={coins} />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>

        {/* Saudação */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, animation: 'fadeUp 0.4s ease-out' }}>
          <div>
            <p style={{ fontSize: 14, color: '#7C7C9A', fontWeight: 600 }}>Olá,</p>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#2D2D5E' }}>{user?.name?.split(' ')[0]} {level.icon}</h2>
          </div>
          <Mascot size={80} mood="happy" />
        </div>

        {/* Card principal */}
        <div style={{
          background: 'linear-gradient(135deg, #9B72CF 0%, #4D96FF 100%)',
          borderRadius: 24, padding: 24, marginBottom: 20,
          color: '#fff', position: 'relative', overflow: 'hidden',
          animation: 'fadeUp 0.5s ease-out',
          boxShadow: '0 8px 32px rgba(124,58,237,0.3)',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 13, opacity: 0.8, fontWeight: 600 }}>Minhas KidCoins</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 42, fontWeight: 900 }}>{coins}</span>
                <span style={{ fontSize: 24 }}>🪙</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 13, opacity: 0.8, fontWeight: 600 }}>Nível</p>
              <p style={{ fontSize: 22, fontWeight: 900, marginTop: 4 }}>{level.name}</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, opacity: 0.8, fontWeight: 700 }}>XP: {xp}</span>
              {nextLevel && <span style={{ fontSize: 12, opacity: 0.8, fontWeight: 700 }}>Próximo: {nextLevel.minXp} XP</span>}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 50, height: 10 }}>
              <div style={{ width: `${xpProgress}%`, height: '100%', background: '#FFD93D', borderRadius: 50, transition: 'width 1s ease-out', boxShadow: '0 0 8px rgba(255,217,61,0.6)' }} />
            </div>
          </div>
        </div>

        {/* Cards de navegação */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24, animation: 'fadeUp 0.6s ease-out' }}>
          {[
            { icon: '📚', label: 'Atividades', sub: `${activities.length} disponíveis`, bg: '#DBEAFE', border: '#4D96FF', path: '/student/activities' },
            { icon: '🗺️', label: 'Progresso', sub: 'Ver jornada', bg: '#EDE9FE', border: '#9B72CF', path: '/student/progress' },
            { icon: '🛍️', label: 'Loja', sub: 'Gastar moedas', bg: '#FFF8DC', border: '#FFD93D', path: '/student/shop' },
            { icon: '🏆', label: 'Conquistas', sub: 'Ver medalhas', bg: '#DCFCE7', border: '#6BCB77', path: '/student/progress' },
          ].map(card => (
            <button key={card.label} onClick={() => navigate(card.path)} style={{
              background: card.bg, border: `2px solid ${card.border}`,
              borderRadius: 20, padding: '18px 16px', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(45,45,94,0.08)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,45,94,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(45,45,94,0.08)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#2D2D5E' }}>{card.label}</div>
              <div style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600, marginTop: 2 }}>{card.sub}</div>
            </button>
          ))}
        </div>

        {/* Atividades recentes */}
        {activities.length > 0 && (
          <div style={{ animation: 'fadeUp 0.7s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#2D2D5E' }}>📋 Atividades</h3>
              <button onClick={() => navigate('/student/activities')} style={{ background: 'none', border: 'none', color: '#7C3AED', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Ver tudo →</button>
            </div>
            {activities.map((a, i) => (
              <div key={a.id} onClick={() => navigate('/student/activities')} style={{
                background: '#fff', borderRadius: 18, padding: '16px 18px', marginBottom: 10,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 2px 10px rgba(45,45,94,0.07)', transition: 'all 0.2s',
                animation: `fadeUp ${0.6 + i * 0.1}s ease-out`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,45,94,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(45,45,94,0.07)' }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 14, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>📝</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#2D2D5E' }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>{a.classroom?.name}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, background: '#FFF8DC', color: '#92600A', padding: '3px 8px', borderRadius: 50 }}>+{a.coinReward}🪙</span>
                  <span style={{ fontSize: 11, color: a.status === 'PUBLISHED' ? '#4CAF50' : '#7C7C9A', fontWeight: 700 }}>
                    {a.status === 'PUBLISHED' ? '✅ Disponível' : '🔒 Bloqueada'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
