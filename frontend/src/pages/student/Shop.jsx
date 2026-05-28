// frontend/src/pages/student/Shop.jsx
import { useState, useEffect } from 'react'
import StudentNav from '../../components/layout/StudentNav'
import Mascot from '../../components/common/Mascot'
import api from '../../services/api'

const CATEGORIES = [
  { key: '', label: 'Tudo', icon: '🛍️' },
  { key: 'hat', label: 'Chapéus', icon: '🎩' },
  { key: 'shirt', label: 'Roupas', icon: '👕' },
  { key: 'shoes', label: 'Sapatos', icon: '👟' },
  { key: 'accessory', label: 'Acessórios', icon: '🕶️' },
]

export default function StudentShop() {
  const [items, setItems] = useState([])
  const [myItems, setMyItems] = useState([])
  const [coins, setCoins] = useState(0)
  const [category, setCategory] = useState('')
  const [buying, setBuying] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('shop')

  async function load() {
    try {
      const [shopRes, myRes, balRes] = await Promise.all([
        api.get('/shop'),
        api.get('/shop/my-items'),
        api.get('/coins/balance'),
      ])
      setItems(shopRes.data)
      setMyItems(myRes.data)
      setCoins(balRes.data.totalCoins)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleBuy(item) {
    if (coins < item.price) {
      setFeedback({ type: 'error', msg: `Você precisa de mais ${item.price - coins} moedas! 😅` })
      setTimeout(() => setFeedback(null), 3000)
      return
    }
    setBuying(item.id)
    try {
      const res = await api.post(`/shop/buy/${item.id}`)
      setCoins(res.data.remainingCoins)
      setFeedback({ type: 'success', msg: `🎉 Você comprou ${item.name}!` })
      setTimeout(() => setFeedback(null), 3000)
      await load()
    } catch (e) {
      setFeedback({ type: 'error', msg: e.response?.data?.message || 'Erro na compra 😅' })
      setTimeout(() => setFeedback(null), 3000)
    }
    setBuying(null)
  }

  const filtered = category ? items.filter(i => i.category === category) : items
  const ownedIds = new Set(myItems.map(p => p.itemId))

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ animation: 'bounce 1s infinite', fontSize: 48 }}>🛍️</div>
      <p style={{ fontWeight: 700, color: '#7C7C9A' }}>Carregando loja...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6FF', paddingTop: 76, paddingBottom: 90 }}>
      <StudentNav coins={coins} />
      <div style={{ padding: '0 20px', maxWidth: 480, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #FF9F43, #FFD93D)', borderRadius: 24, padding: 20, marginBottom: 20, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 6px 24px rgba(255,159,67,0.35)' }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>🛍️ Loja KidCoin</h2>
            <p style={{ fontSize: 14, opacity: 0.9, marginTop: 4, fontWeight: 600 }}>Use suas moedas!</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 13, opacity: 0.8, fontWeight: 600 }}>Seu saldo</p>
            <p style={{ fontSize: 28, fontWeight: 900 }}>{coins} 🪙</p>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{
            background: feedback.type === 'success' ? '#DCFCE7' : '#FFE4E6',
            border: `2px solid ${feedback.type === 'success' ? '#6BCB77' : '#FF6B6B'}`,
            borderRadius: 14, padding: '12px 16px', marginBottom: 16,
            color: feedback.type === 'success' ? '#166534' : '#DC2626',
            fontWeight: 700, fontSize: 15, animation: 'pop 0.3s ease-out',
          }}>
            {feedback.msg}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#fff', borderRadius: 14, padding: 4, marginBottom: 20, boxShadow: '0 2px 8px rgba(45,45,94,0.06)' }}>
          {[{ key: 'shop', label: '🏪 Loja' }, { key: 'myitems', label: '🎒 Meus Itens' }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: tab === t.key ? '#9B72CF' : 'transparent',
              color: tab === t.key ? '#fff' : '#7C7C9A',
              fontWeight: 800, fontSize: 14, transition: 'all 0.2s',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'shop' ? (
          <>
            {/* Filtros de categoria */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
              {CATEGORIES.map(c => (
                <button key={c.key} onClick={() => setCategory(c.key)} style={{
                  padding: '8px 14px', borderRadius: 50, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                  background: category === c.key ? '#9B72CF' : '#fff',
                  color: category === c.key ? '#fff' : '#7C7C9A',
                  fontWeight: 700, fontSize: 13, boxShadow: '0 2px 8px rgba(45,45,94,0.07)',
                  transition: 'all 0.2s',
                }}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>

            {/* Grid de itens */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {filtered.map((item, i) => {
                const owned = ownedIds.has(item.id)
                const canAfford = coins >= item.price
                return (
                  <div key={item.id} style={{
                    background: '#fff', borderRadius: 20, padding: 16,
                    boxShadow: '0 2px 12px rgba(45,45,94,0.08)',
                    border: owned ? '2px solid #6BCB77' : '2px solid transparent',
                    animation: `fadeUp ${0.1 + i * 0.05}s ease-out`,
                    opacity: owned ? 0.85 : 1,
                  }}>
                    <div style={{ width: '100%', height: 90, background: '#F8F6FF', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, marginBottom: 10 }}>
                      {item.category === 'hat' ? '🎩' : item.category === 'shirt' ? '👕' : item.category === 'shoes' ? '👟' : item.category === 'pants' ? '👖' : '🕶️'}
                    </div>
                    <p style={{ fontWeight: 800, fontSize: 13, color: '#2D2D5E', marginBottom: 6, lineHeight: 1.3 }}>{item.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 900, fontSize: 15, color: '#92600A' }}>{item.price} 🪙</span>
                      {owned ? (
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', background: '#DCFCE7', padding: '4px 8px', borderRadius: 50 }}>✅ Seu</span>
                      ) : (
                        <button onClick={() => handleBuy(item)} disabled={buying === item.id} style={{
                          background: canAfford ? 'linear-gradient(135deg, #9B72CF, #4D96FF)' : '#E5E3F0',
                          color: canAfford ? '#fff' : '#7C7C9A',
                          border: 'none', borderRadius: 50, padding: '6px 12px', fontSize: 12,
                          fontWeight: 800, cursor: canAfford ? 'pointer' : 'not-allowed',
                        }}>
                          {buying === item.id ? '⏳' : canAfford ? 'Comprar' : '🔒'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <h3 style={{ fontWeight: 900, fontSize: 18, color: '#2D2D5E', marginBottom: 16 }}>🎒 Meus Itens ({myItems.length})</h3>
            {myItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <Mascot size={100} mood="thinking" message="Você ainda não comprou nada! Vai lá na loja 🛍️" />
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {myItems.map((p, i) => (
                  <div key={p.id} style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(45,45,94,0.08)', border: '2px solid #6BCB77', animation: `fadeUp ${0.1 + i * 0.05}s ease-out` }}>
                    <div style={{ width: '100%', height: 90, background: '#DCFCE7', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, marginBottom: 10 }}>
                      {p.item?.category === 'hat' ? '🎩' : p.item?.category === 'shirt' ? '👕' : p.item?.category === 'shoes' ? '👟' : '🕶️'}
                    </div>
                    <p style={{ fontWeight: 800, fontSize: 13, color: '#2D2D5E' }}>{p.item?.name}</p>
                    <p style={{ fontSize: 11, color: '#7C7C9A', fontWeight: 600, marginTop: 4 }}>Pago: {p.pricePaid} 🪙</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
