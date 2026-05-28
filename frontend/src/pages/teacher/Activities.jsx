// frontend/src/pages/teacher/Activities.jsx
import { useState, useEffect } from 'react'
import TeacherNav from '../../components/layout/TeacherNav'
import api from '../../services/api'

export default function TeacherActivities() {
  const [activities, setActivities] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', classroomId: '', coinReward: 10, xpReward: 50, questions: [{ text: '', options: ['', '', '', ''], answer: '' }] })

  async function load() {
    try {
      const [actRes, clRes] = await Promise.all([api.get('/activities'), api.get('/classrooms')])
      setActivities(actRes.data)
      setClassrooms(clRes.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function addQuestion() {
    setForm(f => ({ ...f, questions: [...f.questions, { text: '', options: ['', '', '', ''], answer: '' }] }))
  }

  function updateQuestion(qi, field, value) {
    setForm(f => {
      const qs = [...f.questions]
      qs[qi] = { ...qs[qi], [field]: value }
      return { ...f, questions: qs }
    })
  }

  function updateOption(qi, oi, value) {
    setForm(f => {
      const qs = [...f.questions]
      const opts = [...qs[qi].options]
      opts[oi] = value
      qs[qi] = { ...qs[qi], options: opts }
      return { ...f, questions: qs }
    })
  }

  async function handleCreate(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/activities', { ...form, questions: form.questions.map(q => ({ ...q, options: q.options.filter(Boolean) })) })
      setFeedback({ type: 'success', msg: '✅ Atividade criada!' })
      setShowForm(false)
      setForm({ title: '', description: '', classroomId: '', coinReward: 10, xpReward: 50, questions: [{ text: '', options: ['', '', '', ''], answer: '' }] })
      await load()
    } catch (err) {
      setFeedback({ type: 'error', msg: err.response?.data?.message || 'Erro ao criar' })
    }
    setSaving(false)
    setTimeout(() => setFeedback(null), 3000)
  }

  async function handlePublish(id) {
    try {
      await api.patch(`/activities/${id}/publish`)
      setFeedback({ type: 'success', msg: '🚀 Atividade publicada!' })
      await load()
    } catch (e) { console.error(e) }
    setTimeout(() => setFeedback(null), 3000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>📝</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <TeacherNav />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, marginTop: 8 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#2D2D5E' }}>📝 Atividades</h2>
          <button onClick={() => setShowForm(!showForm)} style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 50, padding: '10px 20px', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
            {showForm ? '✕ Cancelar' : '+ Nova'}
          </button>
        </div>
        <p style={{ color: '#7C7C9A', fontWeight: 600, marginBottom: 20 }}>Crie e gerencie atividades</p>

        {feedback && (
          <div style={{ background: feedback.type === 'success' ? '#DCFCE7' : '#FFE4E6', border: `2px solid ${feedback.type === 'success' ? '#6BCB77' : '#FF6B6B'}`, borderRadius: 14, padding: '12px 16px', marginBottom: 16, color: feedback.type === 'success' ? '#166534' : '#DC2626', fontWeight: 700, fontSize: 14, animation: 'pop 0.3s ease-out' }}>
            {feedback.msg}
          </div>
        )}

        {showForm && (
          <div style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: '0 4px 20px rgba(45,45,94,0.10)', animation: 'pop 0.3s ease-out' }}>
            <h3 style={{ fontWeight: 900, fontSize: 16, marginBottom: 16, color: '#2D2D5E' }}>Nova Atividade</h3>
            <form onSubmit={handleCreate}>
              {[{ val: form.title, key: 'title', ph: 'Título da atividade', req: true },
                { val: form.description, key: 'description', ph: 'Descrição (opcional)' }].map(f => (
                <input key={f.key} value={f.val} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.ph} required={f.req}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '2px solid #E5E3F0', fontSize: 14, fontWeight: 600, marginBottom: 12, outline: 'none' }}
                  onFocus={e => e.target.style.border = '2px solid #9B72CF'} onBlur={e => e.target.style.border = '2px solid #E5E3F0'} />
              ))}

              <select value={form.classroomId} onChange={e => setForm(f => ({ ...f, classroomId: e.target.value }))} required
                style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '2px solid #E5E3F0', fontSize: 14, fontWeight: 600, marginBottom: 12, outline: 'none', background: '#fff' }}>
                <option value="">Selecione a sala</option>
                {classrooms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#7C7C9A', display: 'block', marginBottom: 4 }}>🪙 Moedas</label>
                  <input type="number" value={form.coinReward} onChange={e => setForm(f => ({ ...f, coinReward: +e.target.value }))} min={1}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '2px solid #E5E3F0', fontSize: 14, fontWeight: 700, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#7C7C9A', display: 'block', marginBottom: 4 }}>⚡ XP</label>
                  <input type="number" value={form.xpReward} onChange={e => setForm(f => ({ ...f, xpReward: +e.target.value }))} min={1}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '2px solid #E5E3F0', fontSize: 14, fontWeight: 700, outline: 'none' }} />
                </div>
              </div>

              <h4 style={{ fontWeight: 900, fontSize: 14, color: '#2D2D5E', marginBottom: 12 }}>❓ Perguntas</h4>
              {form.questions.map((q, qi) => (
                <div key={qi} style={{ background: '#F8F6FF', borderRadius: 14, padding: 14, marginBottom: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#9B72CF', marginBottom: 8 }}>Pergunta {qi + 1}</p>
                  <input value={q.text} onChange={e => updateQuestion(qi, 'text', e.target.value)} placeholder="Texto da pergunta" required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '2px solid #E5E3F0', fontSize: 13, fontWeight: 600, marginBottom: 8, outline: 'none' }} />
                  {q.options.map((opt, oi) => (
                    <input key={oi} value={opt} onChange={e => updateOption(qi, oi, e.target.value)} placeholder={`Opção ${oi + 1}`}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E3F0', fontSize: 13, fontWeight: 600, marginBottom: 6, outline: 'none' }} />
                  ))}
                  <select value={q.answer} onChange={e => updateQuestion(qi, 'answer', e.target.value)} required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '2px solid #6BCB77', fontSize: 13, fontWeight: 700, outline: 'none', background: '#DCFCE7', color: '#166534' }}>
                    <option value="">✅ Selecione a resposta correta</option>
                    {q.options.filter(Boolean).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}

              <button type="button" onClick={addQuestion} style={{ width: '100%', padding: 12, borderRadius: 50, background: '#F0EEF8', border: '2px dashed #9B72CF', color: '#9B72CF', fontWeight: 800, fontSize: 14, cursor: 'pointer', marginBottom: 14 }}>
                + Adicionar Pergunta
              </button>
              <button type="submit" disabled={saving} style={{ width: '100%', padding: 14, borderRadius: 50, background: '#7C3AED', color: '#fff', border: 'none', fontWeight: 900, fontSize: 15, cursor: 'pointer' }}>
                {saving ? '⏳ Salvando...' : '✅ Criar Atividade'}
              </button>
            </form>
          </div>
        )}

        {activities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(45,45,94,0.07)' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>📝</div>
            <p style={{ fontWeight: 800, color: '#2D2D5E', fontSize: 16 }}>Nenhuma atividade</p>
            <p style={{ color: '#7C7C9A', fontWeight: 600, marginTop: 8 }}>Crie sua primeira atividade!</p>
          </div>
        ) : activities.map((a, i) => (
          <div key={a.id} style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 14, boxShadow: '0 2px 12px rgba(45,45,94,0.08)', animation: `fadeUp ${0.1 + i * 0.05}s ease-out` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 900, fontSize: 16, color: '#2D2D5E' }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: '#7C7C9A', fontWeight: 600, marginTop: 2 }}>{a.classroom?.name}</p>
              </div>
              <span style={{
                fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 50,
                background: a.status === 'PUBLISHED' ? '#DCFCE7' : '#FFF8DC',
                color: a.status === 'PUBLISHED' ? '#166534' : '#92600A',
              }}>
                {a.status === 'PUBLISHED' ? '✅ Publicada' : '📝 Rascunho'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <span style={{ background: '#FFF8DC', color: '#92600A', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>🪙 {a.coinReward}</span>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>⚡ {a.xpReward} XP</span>
              <span style={{ background: '#EDE9FE', color: '#7C3AED', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>❓ {a._count?.questions || 0} questões</span>
              <span style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>📊 {a._count?.submissions || 0} respostas</span>
            </div>
            {a.status === 'DRAFT' && (
              <button onClick={() => handlePublish(a.id)} style={{ width: '100%', padding: '12px', borderRadius: 50, background: 'linear-gradient(135deg, #6BCB77, #4CAF50)', color: '#fff', border: 'none', fontWeight: 900, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px rgba(107,203,119,0.4)' }}>
                🚀 Publicar para os alunos
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
