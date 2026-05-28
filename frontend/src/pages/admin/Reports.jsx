// frontend/src/pages/admin/Reports.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function AdminReports() {
  const navigate = useNavigate()
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [tRes, sRes] = await Promise.all([api.get('/users/teachers'), api.get('/users/students')])
        setTeachers(tRes.data)
        setStudents(sRes.data)
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>📊</div>
    </div>
  )

  const totalCoins = students.reduce((a, s) => a + (s.studentProfile?.totalCoins || 0), 0)
  const totalXp = students.reduce((a, s) => a + (s.studentProfile?.totalXp || 0), 0)
  const avgCoins = students.length ? Math.round(totalCoins / students.length) : 0
  const avgXp = students.length ? Math.round(totalXp / students.length) : 0
  const sorted = [...students].sort((a, b) => (b.studentProfile?.totalXp || 0) - (a.studentProfile?.totalXp || 0))

  const LEVEL_COLORS = { '👑': '#FF6B6B', '📈': '#FF9F43', '💰': '#9B72CF', '🔭': '#4D96FF', '🌱': '#6BCB77' }
  function getLevelIcon(xp) {
    if (xp >= 1000) return '👑'
    if (xp >= 600) return '📈'
    if (xp >= 300) return '💰'
    if (xp >= 100) return '🔭'
    return '🌱'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF' }}>
      <header style={{ background: 'linear-gradient(135deg, #2D2D5E, #7C3AED)', padding: '16px 20px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 50, padding: '8px 14px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>←</button>
        <h2 style={{ fontSize: 20, fontWeight: 900 }}>📊 Relatórios</h2>
      </header>

      <div style={{ padding: '20px', maxWidth: 480, margin: '0 auto' }}>
        {/* Resumo geral */}
        <h3 style={{ fontWeight: 900, fontSize: 16, color: '#2D2D5E', marginBottom: 14 }}>📈 Resumo Geral</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '👨‍🏫', label: 'Professores', value: teachers.length, bg: '#DBEAFE', color: '#1D4ED8' },
            { icon: '👦', label: 'Alunos', value: students.length, bg: '#DCFCE7', color: '#166534' },
            { icon: '🪙', label: 'Total Moedas', value: totalCoins, bg: '#FFF8DC', color: '#92600A' },
            { icon: '⚡', label: 'Total XP', value: totalXp, bg: '#EDE9FE', color: '#7C3AED' },
            { icon: '📊', label: 'Média Moedas', value: avgCoins, bg: '#FFE4E6', color: '#DC2626' },
            { icon: '🎯', label: 'Média XP', value: avgXp, bg: '#FFF0DC', color: '#C2410C' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 18, padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Distribuição por nível */}
        <h3 style={{ fontWeight: 900, fontSize: 16, color: '#2D2D5E', marginBottom: 14 }}>🏆 Distribuição por Nível</h3>
        <div style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 24, boxShadow: '0 2px 12px rgba(45,45,94,0.07)' }}>
          {['👑', '📈', '💰', '🔭', '🌱'].map(icon => {
            const count = students.filter(s => getLevelIcon(s.studentProfile?.totalXp || 0) === icon).length
            const pct = students.length ? Math.round((count / students.length) * 100) : 0
            const names = { '👑': 'Mestre', '📈': 'Investidor', '💰': 'Poupador', '🔭': 'Explorador', '🌱': 'Iniciante' }
            return (
              <div key={icon} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#2D2D5E' }}>{icon} {names[icon]}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#7C7C9A' }}>{count} ({pct}%)</span>
                </div>
                <div style={{ background: '#F0EEF8', borderRadius: 50, height: 10 }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: LEVEL_COLORS[icon], borderRadius: 50, transition: 'width 1s ease-out' }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Ranking completo */}
        <h3 style={{ fontWeight: 900, fontSize: 16, color: '#2D2D5E', marginBottom: 14 }}>🥇 Ranking de Alunos</h3>
        {sorted.map((s, i) => {
          const icon = getLevelIcon(s.studentProfile?.totalXp || 0)
          return (
            <div key={s.id} style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(45,45,94,0.06)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: ['#FFD93D', '#C0C0C0', '#CD7F32'][i] || '#F0EEF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0, color: i < 3 ? '#2D2D5E' : '#7C7C9A' }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 800, fontSize: 14, color: '#2D2D5E' }}>{s.name}</p>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ background: '#FFF8DC', color: '#92600A', padding: '3px 8px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>🪙 {s.studentProfile?.totalCoins || 0}</span>
                <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 8px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>⚡ {s.studentProfile?.totalXp || 0}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
