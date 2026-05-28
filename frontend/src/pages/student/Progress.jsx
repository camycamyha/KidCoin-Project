// frontend/src/pages/student/Progress.jsx
import { useState, useEffect } from 'react'
import StudentNav from '../../components/layout/StudentNav'
import Mascot from '../../components/common/Mascot'
import api from '../../services/api'

const LEVELS = [
  { name: 'Iniciante', minXp: 0, icon: '🌱', color: '#6BCB77', desc: 'Você está começando sua jornada!' },
  { name: 'Explorador', minXp: 100, icon: '🔭', color: '#4D96FF', desc: 'Explorando o mundo das finanças!' },
  { name: 'Poupador', minXp: 300, icon: '💰', color: '#9B72CF', desc: 'Aprendendo a guardar dinheiro!' },
  { name: 'Investidor', minXp: 600, icon: '📈', color: '#FF9F43', desc: 'Fazendo seu dinheiro crescer!' },
  { name: 'Mestre', minXp: 1000, icon: '👑', color: '#FF6B6B', desc: 'Mestre das finanças!' },
]

function getLevel(xp) {
  let idx = 0
  for (let i = 0; i < LEVELS.length; i++) { if (xp >= LEVELS[i].minXp) idx = i }
  return idx
}

export default function StudentProgress() {
  const [profile, setProfile] = useState(null)
  const [history, setHistory] = useState([])
  const [coins, setCoins] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [balRes, histRes] = await Promise.all([
          api.get('/coins/balance'),
          api.get('/coins/history'),
        ])
        setProfile(balRes.data)
        setCoins(balRes.data.totalCoins)
        setHistory(histRes.data)
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>🗺️</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando jornada...</p>
    </div>
  )

  const xp = profile?.totalXp || 0
  const lvlIdx = getLevel(xp)
  const currentLevel = LEVELS[lvlIdx]
  const nextLevel = LEVELS[lvlIdx + 1]
  const xpProgress = nextLevel ? Math.round(((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100) : 100

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <StudentNav coins={coins} />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>

        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#2D2D5E', marginBottom: 6, marginTop: 8 }}>🗺️ Minha Jornada</h2>
        <p style={{ color: '#7C7C9A', fontWeight: 600, marginBottom: 24 }}>Veja seu progresso!</p>

        {/* Card do nível atual */}
        <div style={{
          background: `linear-gradient(135deg, ${currentLevel.color}, ${LEVELS[Math.min(lvlIdx + 1, LEVELS.length - 1)].color})`,
          borderRadius: 24, padding: 24, marginBottom: 24, color: '#fff',
          boxShadow: `0 8px 28px ${currentLevel.color}55`, animation: 'fadeUp 0.4s ease-out',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 70, height: 70, borderRadius: 20, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
              {currentLevel.icon}
            </div>
            <div>
              <p style={{ fontSize: 13, opacity: 0.85, fontWeight: 600 }}>Nível atual</p>
              <h3 style={{ fontSize: 26, fontWeight: 900 }}>{currentLevel.name}</h3>
              <p style={{ fontSize: 13, opacity: 0.85, fontWeight: 600 }}>{currentLevel.desc}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>⚡ {xp} XP</span>
            {nextLevel && <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>Próximo: {nextLevel.minXp} XP</span>}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 50, height: 12 }}>
            <div style={{ width: `${xpProgress}%`, height: '100%', background: '#FFD93D', borderRadius: 50, transition: 'width 1s', boxShadow: '0 0 8px rgba(255,217,61,0.7)' }} />
          </div>
          {nextLevel && <p style={{ fontSize: 12, opacity: 0.8, marginTop: 6, fontWeight: 600, textAlign: 'center' }}>Faltam {nextLevel.minXp - xp} XP para {nextLevel.name} {nextLevel.icon}</p>}
        </div>

        {/* Mapa de progresso */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(45,45,94,0.08)', animation: 'fadeUp 0.5s ease-out' }}>
          <h3 style={{ fontWeight: 900, fontSize: 18, color: '#2D2D5E', marginBottom: 20 }}>🏆 Trilha de Níveis</h3>
          <div style={{ position: 'relative' }}>
            {/* Linha da trilha */}
            <div style={{ position: 'absolute', left: 28, top: 20, bottom: 20, width: 3, background: '#F0EEF8', borderRadius: 50 }} />
            <div style={{ position: 'absolute', left: 28, top: 20, width: 3, height: `${(lvlIdx / (LEVELS.length - 1)) * 100}%`, background: 'linear-gradient(to bottom, #6BCB77, #4D96FF, #9B72CF)', borderRadius: 50, transition: 'height 1s ease-out' }} />

            {LEVELS.map((lvl, i) => {
              const unlocked = i <= lvlIdx
              const isCurrent = i === lvlIdx
              return (
                <div key={lvl.name} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: i < LEVELS.length - 1 ? 28 : 0, position: 'relative' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', flexShrink: 0, zIndex: 1,
                    background: unlocked ? lvl.color : '#E5E3F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, boxShadow: isCurrent ? `0 0 0 4px ${lvl.color}44, 0 4px 16px ${lvl.color}55` : 'none',
                    transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s',
                    filter: unlocked ? 'none' : 'grayscale(1)',
                  }}>
                    {unlocked ? lvl.icon : '🔒'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <p style={{ fontWeight: 900, fontSize: 15, color: unlocked ? '#2D2D5E' : '#B0AEC8' }}>{lvl.name}</p>
                      {isCurrent && <span style={{ fontSize: 11, fontWeight: 800, background: '#EDE9FE', color: '#7C3AED', padding: '2px 8px', borderRadius: 50 }}>Você está aqui!</span>}
                    </div>
                    <p style={{ fontSize: 12, color: unlocked ? '#7C7C9A' : '#B0AEC8', fontWeight: 600, marginTop: 2 }}>{lvl.minXp} XP • {lvl.desc}</p>
                  </div>
                  {unlocked && !isCurrent && <span style={{ fontSize: 18 }}>✅</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24, animation: 'fadeUp 0.6s ease-out' }}>
          {[
            { icon: '🪙', label: 'KidCoins', value: coins, bg: '#FFF8DC', color: '#92600A' },
            { icon: '⚡', label: 'XP Total', value: xp, bg: '#DCFCE7', color: '#166534' },
            { icon: '📝', label: 'Atividades', value: history.filter(h => h.amount > 0).length, bg: '#DBEAFE', color: '#1D4ED8' },
            { icon: '🛍️', label: 'Compras', value: history.filter(h => h.amount < 0).length, bg: '#EDE9FE', color: '#7C3AED' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 18, padding: '18px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#7C7C9A', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Histórico de moedas */}
        {history.length > 0 && (
          <div style={{ animation: 'fadeUp 0.7s ease-out' }}>
            <h3 style={{ fontWeight: 900, fontSize: 18, color: '#2D2D5E', marginBottom: 14 }}>📜 Histórico</h3>
            {history.slice(0, 8).map((h, i) => (
              <div key={h.id} style={{
                background: '#fff', borderRadius: 16, padding: '14px 16px', marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: '0 2px 8px rgba(45,45,94,0.06)',
                animation: `fadeUp ${0.1 + i * 0.04}s ease-out`,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: h.amount > 0 ? '#DCFCE7' : '#FFE4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {h.amount > 0 ? '💰' : '🛍️'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: '#2D2D5E', lineHeight: 1.3 }}>{h.description}</p>
                  <p style={{ fontSize: 11, color: '#7C7C9A', fontWeight: 600, marginTop: 2 }}>
                    {new Date(h.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span style={{ fontWeight: 900, fontSize: 16, color: h.amount > 0 ? '#166534' : '#DC2626' }}>
                  {h.amount > 0 ? '+' : ''}{h.amount} 🪙
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
