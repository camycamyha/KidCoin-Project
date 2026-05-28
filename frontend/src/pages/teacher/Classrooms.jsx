// frontend/src/pages/teacher/Classrooms.jsx
import { useState, useEffect } from 'react'
import TeacherNav from '../../components/layout/TeacherNav'
import api from '../../services/api'

export default function TeacherClassrooms() {
  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)

  async function load() {
    try {
      const res = await api.get('/classrooms')
      setClassrooms(res.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function handleCreate(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/classrooms', form)
      setFeedback({ type: 'success', msg: '🎉 Sala criada com sucesso!' })
      setShowForm(false)
      setForm({ name: '', description: '' })
      await load()
    } catch (err) {
      setFeedback({ type: 'error', msg: err.response?.data?.message || 'Erro ao criar sala' })
    }
    setSaving(false)
    setTimeout(() => setFeedback(null), 3000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>🏫</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando salas...</p>
    </div>
  )

  // Detalhes da sala
  if (selected) return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <TeacherNav />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>
        <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#7C7C9A', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>← Voltar</button>
        <div style={{ background: 'linear-gradient(135deg, #4D96FF, #6BCB77)', borderRadius: 24, padding: 24, marginBottom: 20, color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900 }}>{selected.name}</h2>
          <p style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>{selected.description}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 50, fontSize: 13, fontWeight: 700 }}>🔑 {selected.code}</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 50, fontSize: 13, fontWeight: 700 }}>👦 {selected._count?.students || selected.students?.length || 0} alunos</span>
          </div>
        </div>

        <h3 style={{ fontWeight: 900, fontSize: 16, color: '#2D2D5E', marginBottom: 12 }}>👦 Alunos na sala</h3>
        {(selected.students || []).length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 18, padding: 24, textAlign: 'center', color: '#7C7C9A', fontWeight: 600 }}>
            Nenhum aluno nessa sala ainda 😊
          </div>
        ) : (
          (selected.students || []).map(s => (
            <div key={s.studentId} style={{ background: '#fff', borderRadius: 16, padding: '14px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(45,45,94,0.06)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #9B72CF, #4D96FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 16 }}>
                {s.student?.user?.name?.[0] || 'A'}
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: 14, color: '#2D2D5E' }}>{s.student?.user?.name}</p>
                <p style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>{s.student?.user?.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <TeacherNav />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, marginTop: 8 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#2D2D5E' }}>🏫 Salas</h2>
          <button onClick={() => setShowForm(!showForm)} style={{ background: '#2563EB', color: '#fff', border: 'none', borderRadius: 50, padding: '10px 20px', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
            {showForm ? '✕ Cancelar' : '+ Nova Sala'}
          </button>
        </div>
        <p style={{ color: '#7C7C9A', fontWeight: 600, marginBottom: 20 }}>Gerencie suas turmas</p>

        {feedback && (
          <div style={{ background: feedback.type === 'success' ? '#DCFCE7' : '#FFE4E6', border: `2px solid ${feedback.type === 'success' ? '#6BCB77' : '#FF6B6B'}`, borderRadius: 14, padding: '12px 16px', marginBottom: 16, color: feedback.type === 'success' ? '#166534' : '#DC2626', fontWeight: 700, fontSize: 14, animation: 'pop 0.3s ease-out' }}>
            {feedback.msg}
          </div>
        )}

        {showForm && (
          <div style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: '0 4px 20px rgba(45,45,94,0.10)', animation: 'pop 0.3s ease-out' }}>
            <h3 style={{ fontWeight: 900, fontSize: 16, marginBottom: 16, color: '#2D2D5E' }}>Nova Sala</h3>
            <form onSubmit={handleCreate}>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome da sala (ex: 5º Ano A)" required
                style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '2px solid #E5E3F0', fontSize: 14, fontWeight: 600, marginBottom: 12, outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #4D96FF'} onBlur={e => e.target.style.border = '2px solid #E5E3F0'} />
              <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descrição (opcional)"
                style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '2px solid #E5E3F0', fontSize: 14, fontWeight: 600, marginBottom: 16, outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #4D96FF'} onBlur={e => e.target.style.border = '2px solid #E5E3F0'} />
              <button type="submit" disabled={saving} style={{ width: '100%', padding: 14, borderRadius: 50, background: '#2563EB', color: '#fff', border: 'none', fontWeight: 900, fontSize: 15, cursor: 'pointer' }}>
                {saving ? '⏳ Criando...' : '🏫 Criar Sala'}
              </button>
            </form>
          </div>
        )}

        {classrooms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(45,45,94,0.07)' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🏫</div>
            <p style={{ fontWeight: 800, color: '#2D2D5E', fontSize: 16 }}>Nenhuma sala ainda</p>
            <p style={{ color: '#7C7C9A', fontWeight: 600, marginTop: 8 }}>Crie sua primeira sala!</p>
          </div>
        ) : classrooms.map((c, i) => (
          <div key={c.id} onClick={async () => { const r = await api.get(`/classrooms/${c.id}`); setSelected(r.data) }} style={{
            background: '#fff', borderRadius: 20, padding: 20, marginBottom: 14, cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(45,45,94,0.08)', transition: 'all 0.2s',
            animation: `fadeUp ${0.1 + i * 0.05}s ease-out`, border: '2px solid transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#4D96FF'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 50, height: 50, borderRadius: 16, background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏫</div>
                <div>
                  <h3 style={{ fontWeight: 900, fontSize: 16, color: '#2D2D5E' }}>{c.name}</h3>
                  {c.description && <p style={{ fontSize: 13, color: '#7C7C9A', fontWeight: 600, marginTop: 2 }}>{c.description}</p>}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>👦 {c._count?.students || 0} alunos</span>
              <span style={{ background: '#EDE9FE', color: '#7C3AED', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>📝 {c._count?.activities || 0} atividades</span>
              <span style={{ background: '#F0EEF8', color: '#7C7C9A', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>🔑 {c.code}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
