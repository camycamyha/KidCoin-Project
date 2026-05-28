// frontend/src/pages/teacher/Students.jsx
import { useState, useEffect } from 'react'
import TeacherNav from '../../components/layout/TeacherNav'
import api from '../../services/api'

export default function TeacherStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/users/students')
        setStudents(res.data)
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>👦</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando alunos...</p>
    </div>
  )

  const COLORS = ['#9B72CF', '#4D96FF', '#6BCB77', '#FF9F43', '#FF6B6B', '#FFD93D']

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <TeacherNav />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#2D2D5E', marginBottom: 6, marginTop: 8 }}>👦 Alunos</h2>
        <p style={{ color: '#7C7C9A', fontWeight: 600, marginBottom: 24 }}>{students.length} aluno(s) cadastrado(s)</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '👦', label: 'Total', value: students.length, bg: '#DBEAFE', color: '#1D4ED8' },
            { icon: '🪙', label: 'Média Moedas', value: students.length ? Math.round(students.reduce((a, s) => a + (s.studentProfile?.totalCoins || 0), 0) / students.length) : 0, bg: '#FFF8DC', color: '#92600A' },
            { icon: '⚡', label: 'Média XP', value: students.length ? Math.round(students.reduce((a, s) => a + (s.studentProfile?.totalXp || 0), 0) / students.length) : 0, bg: '#DCFCE7', color: '#166534' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#7C7C9A', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {students.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(45,45,94,0.07)' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>👦</div>
            <p style={{ fontWeight: 800, color: '#2D2D5E', fontSize: 16 }}>Nenhum aluno ainda</p>
          </div>
        ) : students.map((s, i) => (
          <div key={s.id} style={{
            background: '#fff', borderRadius: 20, padding: '18px 20px', marginBottom: 12,
            boxShadow: '0 2px 12px rgba(45,45,94,0.08)', animation: `fadeUp ${0.1 + i * 0.05}s ease-out`,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: COLORS[i % COLORS.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 20, flexShrink: 0 }}>
              {s.name[0].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 900, fontSize: 15, color: '#2D2D5E' }}>{s.name}</p>
              <p style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600, marginTop: 2 }}>{s.email}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{ background: '#FFF8DC', color: '#92600A', padding: '3px 8px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>🪙 {s.studentProfile?.totalCoins || 0}</span>
                <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 8px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>⚡ {s.studentProfile?.totalXp || 0} XP</span>
              </div>
            </div>
            {/* Mini barra de progresso */}
            <div style={{ textAlign: 'center', minWidth: 44 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F8F6FF', border: '3px solid #EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                {(s.studentProfile?.totalXp || 0) >= 1000 ? '👑' : (s.studentProfile?.totalXp || 0) >= 600 ? '📈' : (s.studentProfile?.totalXp || 0) >= 300 ? '💰' : (s.studentProfile?.totalXp || 0) >= 100 ? '🔭' : '🌱'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
