// frontend/src/pages/teacher/Dashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import TeacherNav from '../../components/layout/TeacherNav'
import api from '../../services/api'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [classrooms, setClassrooms] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [clRes, actRes] = await Promise.all([
          api.get('/classrooms'),
          api.get('/activities'),
        ])
        setClassrooms(clRes.data)
        setActivities(actRes.data)
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>🏫</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando...</p>
    </div>
  )

  const totalStudents = classrooms.reduce((acc, c) => acc + (c._count?.students || 0), 0)
  const published = activities.filter(a => a.status === 'PUBLISHED').length

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <TeacherNav />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 24, marginTop: 8, animation: 'fadeUp 0.4s ease-out' }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#2D2D5E' }}>Olá, {user?.name?.split(' ')[0]}! 👋</h2>
          <p style={{ color: '#7C7C9A', fontWeight: 600 }}>Veja o resumo da sua turma</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24, animation: 'fadeUp 0.5s ease-out' }}>
          {[
            { icon: '🏫', label: 'Salas', value: classrooms.length, bg: '#DBEAFE', color: '#1D4ED8' },
            { icon: '👦', label: 'Alunos', value: totalStudents, bg: '#DCFCE7', color: '#166534' },
            { icon: '📝', label: 'Atividades', value: activities.length, bg: '#EDE9FE', color: '#7C3AED' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 18, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ações rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28, animation: 'fadeUp 0.6s ease-out' }}>
          {[
            { icon: '🏫', label: 'Minhas Salas', sub: `${classrooms.length} sala(s)`, bg: '#DBEAFE', border: '#4D96FF', path: '/teacher/classrooms' },
            { icon: '📝', label: 'Atividades', sub: `${published} publicadas`, bg: '#EDE9FE', border: '#9B72CF', path: '/teacher/activities' },
            { icon: '👦', label: 'Alunos', sub: `${totalStudents} aluno(s)`, bg: '#DCFCE7', border: '#6BCB77', path: '/teacher/students' },
            { icon: '📊', label: 'Progresso', sub: 'Ver relatório', bg: '#FFF8DC', border: '#FFD93D', path: '/teacher/students' },
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

        {/* Salas recentes */}
        {classrooms.length > 0 && (
          <div style={{ animation: 'fadeUp 0.7s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#2D2D5E' }}>🏫 Suas Salas</h3>
              <button onClick={() => navigate('/teacher/classrooms')} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Ver tudo →</button>
            </div>
            {classrooms.slice(0, 3).map((c, i) => (
              <div key={c.id} onClick={() => navigate('/teacher/classrooms')} style={{
                background: '#fff', borderRadius: 18, padding: '16px 18px', marginBottom: 10,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 2px 10px rgba(45,45,94,0.07)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 14, background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🏫</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#2D2D5E' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>Código: {c.code}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>{c._count?.students || 0} alunos</div>
                  <div style={{ fontSize: 11, color: '#7C7C9A', fontWeight: 600 }}>{c._count?.activities || 0} atividades</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
