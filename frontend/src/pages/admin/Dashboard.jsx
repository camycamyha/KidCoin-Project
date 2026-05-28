// frontend/src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>🏛️</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando...</p>
    </div>
  )

  const totalCoins = students.reduce((a, s) => a + (s.studentProfile?.totalCoins || 0), 0)
  const totalXp = students.reduce((a, s) => a + (s.studentProfile?.totalXp || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF' }}>
      {/* Header */}
      <header style={{ background: 'linear-gradient(135deg, #2D2D5E, #7C3AED)', padding: '20px 24px 24px', color: '#fff' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 28 }}>🪙</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900 }}>KidCoin</div>
                <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 600 }}>Painel Administrativo</div>
              </div>
            </div>
            <button onClick={logout} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 50, padding: '8px 16px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Sair 👋
            </button>
          </div>
          <p style={{ opacity: 0.8, fontWeight: 600, fontSize: 14 }}>Olá, {user?.name?.split(' ')[0]}!</p>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginTop: 4 }}>Visão Geral da Escola</h2>
        </div>
      </header>

      <div style={{ padding: '24px 20px', maxWidth: 480, margin: '0 auto' }}>
        {/* Stats principais */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24, animation: 'fadeUp 0.4s ease-out' }}>
          {[
            { icon: '👨‍🏫', label: 'Professores', value: teachers.length, bg: '#DBEAFE', color: '#1D4ED8' },
            { icon: '👦', label: 'Alunos', value: students.length, bg: '#DCFCE7', color: '#166534' },
            { icon: '🪙', label: 'Total Moedas', value: totalCoins, bg: '#FFF8DC', color: '#92600A' },
            { icon: '⚡', label: 'Total XP', value: totalXp, bg: '#EDE9FE', color: '#7C3AED' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 20, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#7C7C9A', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ações */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '👨‍🏫', label: 'Professores', path: '/admin/teachers', bg: '#DBEAFE', border: '#4D96FF' },
            { icon: '📊', label: 'Relatórios', path: '/admin/reports', bg: '#EDE9FE', border: '#9B72CF' },
          ].map(c => (
            <button key={c.path} onClick={() => navigate(c.path)} style={{ background: c.bg, border: `2px solid ${c.border}`, borderRadius: 20, padding: '22px 16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#2D2D5E' }}>{c.label}</div>
            </button>
          ))}
        </div>

        {/* Lista de professores */}
        <h3 style={{ fontWeight: 900, fontSize: 18, color: '#2D2D5E', marginBottom: 14 }}>👨‍🏫 Professores</h3>
        {teachers.slice(0, 5).map((t, i) => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 16, padding: '14px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(45,45,94,0.06)', animation: `fadeUp ${0.1 + i * 0.05}s ease-out` }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #4D96FF, #6BCB77)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18 }}>
              {t.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: '#2D2D5E' }}>{t.name}</p>
              <p style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>{t.email}</p>
            </div>
            <span style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>
              🏫 {t.teacherProfile?.classrooms?.length || 0} salas
            </span>
          </div>
        ))}

        {/* Top alunos */}
        <h3 style={{ fontWeight: 900, fontSize: 18, color: '#2D2D5E', marginBottom: 14, marginTop: 20 }}>🏆 Top Alunos</h3>
        {[...students].sort((a, b) => (b.studentProfile?.totalCoins || 0) - (a.studentProfile?.totalCoins || 0)).slice(0, 5).map((s, i) => (
          <div key={s.id} style={{ background: '#fff', borderRadius: 16, padding: '14px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(45,45,94,0.06)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: ['#FFD93D', '#C0C0C0', '#CD7F32', '#E5E3F0', '#E5E3F0'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: '#2D2D5E' }}>{s.name}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ background: '#FFF8DC', color: '#92600A', padding: '4px 8px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>🪙 {s.studentProfile?.totalCoins || 0}</span>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 8px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>⚡ {s.studentProfile?.totalXp || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
