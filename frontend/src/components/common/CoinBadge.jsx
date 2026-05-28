// frontend/src/components/common/CoinBadge.jsx
export default function CoinBadge({ amount, size = 'md' }) {
  const sizes = {
    sm: { fontSize: 13, padding: '4px 10px', iconSize: 16 },
    md: { fontSize: 16, padding: '8px 16px', iconSize: 20 },
    lg: { fontSize: 22, padding: '12px 22px', iconSize: 28 },
  }
  const s = sizes[size] || sizes.md

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'linear-gradient(135deg, #FFD93D, #FF9F43)',
      borderRadius: 50,
      padding: s.padding,
      boxShadow: '0 3px 12px rgba(244,180,0,0.35)',
    }}>
      <svg width={s.iconSize} height={s.iconSize} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#F4B400" />
        <circle cx="12" cy="12" r="9" fill="#FFD93D" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#92600A">K</text>
      </svg>
      <span style={{ fontSize: s.fontSize, fontWeight: 900, color: '#fff' }}>{amount}</span>
    </div>
  )
}
