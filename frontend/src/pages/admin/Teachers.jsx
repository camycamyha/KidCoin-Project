// frontend/src/pages/admin/Teachers.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function AdminTeachers() {
  const navigate = useNavigate()
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)

  async function load() {
    try {
      const res = await api.get('/users/teachers')
      setTeachers(res.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function handleCreate(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/users/teachers', form)
      setFeedback({ type: 'success', msg: '✅ Professor cadastrado!' })
      setShowForm(false)
      setForm({ name: '', email: '', password: '' })
      await load()
    } catch (err) {
      setFeedback({ type: 'error', msg: err.response?.data?.message || 'Erro ao cadastrar' })
    }
    setSaving(false)
    setTimeout(() => setFeedback(null), 3000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>👨‍🏫</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF' }}>
      <header style={{ background: 'linear-gradient(135deg, #2D2D5E, #7C3AED)', padding: '16px 20px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 50, padding: '8px 14px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>←</button>
        <h2 style={{ fontSize: 20, fontWeight: 900 }}>👨‍🏫 Professores</h2>
      </header>

      <div style={{ padding: '20px', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 50, padding: '10px 20px', fontWeight: 800, cursor: 'pointer' }}>
            {showForm ? '✕ Cancelar' : '+ Novo Professor'}
          </button>
        </div>

        {feedback && (
          <div style={{ background: feedback.type === 'success' ? '#DCFCE7' : '#FFE4E6', border: `2px solid ${feedback.type === 'success' ? '#6BCB77' : '#FF6B6B'}`, borderRadius: 14, padding: '12px 16px', marginBottom: 16, color: feedback.type === 'success' ? '#166534' : '#DC2626', fontWeight: 700, animation: 'pop 0.3s ease-out' }}>
            {feedback.msg}
          </div>
        )}

        {showForm && (
          <div style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: '0 4px 20px rgba(45,45,94,0.10)', animation: 'pop 0.3s ease-out' }}>
            <h3 style={{ fontWeight: 900, fontSize: 16, marginBottom: 14, color: '#2D2D5E' }}>Novo Professor</h3>
            <form onSubmit={handleCreate}>
              {[{ val: form.name, key: 'name', ph: 'Nome completo', type: 'text', req: true },
                { val: form.email, key: 'email', ph: 'E-mail', type: 'email', req: true },
                { val: form.password, key: 'password', ph: 'Senha', type: 'password', req: true }].map(f => (
                <input key={f.key} type={f.type} value={f.val} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.ph} required={f.req}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '2px solid #E5E3F0', fontSize: 14, fontWeight: 600, marginBottom: 10, outline: 'none' }}
                  onFocus={e => e.target.style.border = '2px solid #7C3AED'} onBlur={e => e.target.style.border = '2px solid #E5E3F0'} />
              ))}
              <button type="submit" disabled={saving} style={{ width: '100%', padding: 14, borderRadius: 50, background: '#7C3AED', color: '#fff', border: 'none', fontWeight: 900, fontSize: 15, cursor: 'pointer', marginTop: 4 }}>
                {saving ? '⏳ Salvando...' : '✅ Cadastrar'}
              </button>
            </form>
          </div>
        )}

        {teachers.map((t, i) => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 18, padding: '16px 18px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 10px rgba(45,45,94,0.07)', animation: `fadeUp ${0.1 + i * 0.05}s ease-out` }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #4D96FF, #6BCB77)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 20, flexShrink: 0 }}>
              {t.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 800, fontSize: 15, color: '#2D2D5E' }}>{t.name}</p>
              <p style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600, marginTop: 2 }}>{t.email}</p>
            </div>
            <span style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>
              🏫 {t.teacherProfile?.classrooms?.length || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
