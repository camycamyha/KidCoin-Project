// frontend/src/pages/student/Activities.jsx
import { useState, useEffect } from 'react'
import StudentNav from '../../components/layout/StudentNav'
import Mascot from '../../components/common/Mascot'
import api from '../../services/api'

export default function StudentActivities() {
  const [activities, setActivities] = useState([])
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [coins, setCoins] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [actRes, balRes] = await Promise.all([api.get('/activities'), api.get('/coins/balance')])
        setActivities(actRes.data)
        setCoins(balRes.data.totalCoins)
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  async function openActivity(a) {
    try {
      const res = await api.get(`/activities/${a.id}`)
      setSelected(res.data)
      setAnswers({})
      setResult(null)
    } catch (e) { console.error(e) }
  }

  async function handleSubmit() {
    if (Object.keys(answers).length < selected.questions.length) {
      alert('Responda todas as perguntas! 😊')
      return
    }
    setSubmitting(true)
    try {
      const res = await api.post(`/activities/${selected.id}/submit`, {
        answers: Object.entries(answers).map(([questionId, selected]) => ({ questionId, selected }))
      })
      setResult(res.data)
      const balRes = await api.get('/coins/balance')
      setCoins(balRes.data.totalCoins)
    } catch (e) {
      if (e.response?.data?.message === 'Atividade já respondida') {
        alert('Você já respondeu essa atividade! ✅')
      }
    }
    setSubmitting(false)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>📚</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando...</p>
    </div>
  )

  // Tela de resultado
  if (result) return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <StudentNav coins={coins} />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto', textAlign: 'center', paddingTop: 40 }}>
        <Mascot size={120} mood={result.score >= 60 ? 'celebrating' : 'happy'} />
        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#2D2D5E', marginTop: 20 }}>
          {result.score === 100 ? '🎉 Perfeito!' : result.score >= 60 ? '😄 Muito bem!' : '😊 Continue tentando!'}
        </h2>
        <p style={{ fontSize: 18, color: '#7C7C9A', fontWeight: 600, marginTop: 8 }}>
          Você acertou {result.correct} de {result.total} questões
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, margin: '28px 0' }}>
          {[
            { icon: '🎯', label: 'Score', value: `${result.score}%`, bg: '#DBEAFE' },
            { icon: '🪙', label: 'Moedas', value: `+${result.coinsEarned}`, bg: '#FFF8DC' },
            { icon: '⚡', label: 'XP', value: `+${result.xpEarned}`, bg: '#DCFCE7' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 18, padding: '16px 12px', animation: 'pop 0.4s ease-out' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#2D2D5E' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button onClick={() => { setResult(null); setSelected(null) }} style={{
          background: 'linear-gradient(135deg, #9B72CF, #4D96FF)', color: '#fff',
          border: 'none', borderRadius: 50, padding: '16px 40px', fontSize: 17,
          fontWeight: 900, cursor: 'pointer', boxShadow: '0 6px 20px rgba(124,58,237,0.3)',
        }}>
          🏠 Voltar às atividades
        </button>
      </div>
    </div>
  )

  // Tela de quiz
  if (selected) return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <StudentNav coins={coins} />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>
        <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#7C7C9A', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Voltar
        </button>

        <div style={{ background: 'linear-gradient(135deg, #4D96FF, #9B72CF)', borderRadius: 20, padding: 20, marginBottom: 20, color: '#fff' }}>
          <h2 style={{ fontSize: 20, fontWeight: 900 }}>{selected.title}</h2>
          {selected.description && <p style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>{selected.description}</p>}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 50, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>🪙 +{selected.coinReward}</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 50, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>⚡ +{selected.xpReward} XP</span>
          </div>
        </div>

        {/* Progresso do quiz */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#7C7C9A' }}>{Object.keys(answers).length}/{selected.questions.length} respondidas</span>
          <div style={{ flex: 1, background: '#F0EEF8', borderRadius: 50, height: 8 }}>
            <div style={{ width: `${(Object.keys(answers).length / selected.questions.length) * 100}%`, height: '100%', background: '#9B72CF', borderRadius: 50, transition: 'width 0.3s' }} />
          </div>
        </div>

        {selected.questions.map((q, qi) => {
          const opts = JSON.parse(q.options)
          return (
            <div key={q.id} style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, boxShadow: '0 2px 10px rgba(45,45,94,0.07)', animation: `fadeUp ${0.1 * qi}s ease-out` }}>
              <p style={{ fontWeight: 800, fontSize: 16, color: '#2D2D5E', marginBottom: 16 }}>
                <span style={{ background: '#EDE9FE', color: '#7C3AED', borderRadius: 8, padding: '2px 8px', marginRight: 8, fontSize: 13 }}>{qi + 1}</span>
                {q.text}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {opts.map(opt => {
                  const isSelected = answers[q.id] === opt
                  return (
                    <button key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))} style={{
                      padding: '13px 18px', borderRadius: 14, textAlign: 'left',
                      fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                      background: isSelected ? '#EDE9FE' : '#F8F6FF',
                      border: isSelected ? '2px solid #9B72CF' : '2px solid #E5E3F0',
                      color: isSelected ? '#7C3AED' : '#2D2D5E',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    }}>
                      {isSelected ? '✅ ' : '○ '}{opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        <button onClick={handleSubmit} disabled={submitting} style={{
          width: '100%', padding: 18, borderRadius: 50, fontSize: 18, fontWeight: 900,
          background: 'linear-gradient(135deg, #6BCB77, #4CAF50)', color: '#fff',
          border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(107,203,119,0.4)',
          marginBottom: 20, opacity: submitting ? 0.7 : 1,
        }}>
          {submitting ? '⏳ Enviando...' : '🚀 Enviar respostas!'}
        </button>
      </div>
    </div>
  )

  // Lista de atividades
  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <StudentNav coins={coins} />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#2D2D5E', marginBottom: 6, marginTop: 8 }}>📚 Atividades</h2>
        <p style={{ color: '#7C7C9A', fontWeight: 600, marginBottom: 24 }}>Complete e ganhe KidCoins!</p>

        {activities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Mascot size={100} mood="thinking" message="Nenhuma atividade ainda! Aguarde seu professor 😊" />
          </div>
        ) : activities.map((a, i) => (
          <div key={a.id} onClick={() => a.status === 'PUBLISHED' && openActivity(a)} style={{
            background: '#fff', borderRadius: 20, padding: 20, marginBottom: 14,
            cursor: a.status === 'PUBLISHED' ? 'pointer' : 'default',
            boxShadow: '0 2px 12px rgba(45,45,94,0.08)', transition: 'all 0.2s',
            opacity: a.status !== 'PUBLISHED' ? 0.6 : 1,
            animation: `fadeUp ${0.1 + i * 0.05}s ease-out`,
            border: '2px solid transparent',
          }}
            onMouseEnter={e => { if (a.status === 'PUBLISHED') { e.currentTarget.style.borderColor = '#9B72CF'; e.currentTarget.style.transform = 'translateY(-3px)' } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: a.status === 'PUBLISHED' ? '#EDE9FE' : '#F0EEF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                {a.status === 'PUBLISHED' ? '📝' : '🔒'}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 900, fontSize: 16, color: '#2D2D5E', marginBottom: 4 }}>{a.title}</h3>
                {a.description && <p style={{ fontSize: 13, color: '#7C7C9A', fontWeight: 600, marginBottom: 10 }}>{a.description}</p>}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ background: '#FFF8DC', color: '#92600A', borderRadius: 50, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>🪙 +{a.coinReward}</span>
                  <span style={{ background: '#DCFCE7', color: '#166534', borderRadius: 50, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>⚡ +{a.xpReward} XP</span>
                  <span style={{ background: a.status === 'PUBLISHED' ? '#DBEAFE' : '#F0EEF8', color: a.status === 'PUBLISHED' ? '#1D4ED8' : '#7C7C9A', borderRadius: 50, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>
                    {a.status === 'PUBLISHED' ? '✅ Disponível' : '🔒 Bloqueada'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
