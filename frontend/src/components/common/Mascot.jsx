// frontend/src/components/common/Mascot.jsx
export default function Mascot({ size = 120, mood = 'happy', message = null }) {
  const moods = {
    happy: { eyeY: 54, mouthPath: 'M44 66 Q56 76 68 66', color: '#FFD93D' },
    excited: { eyeY: 52, mouthPath: 'M42 64 Q56 78 70 64', color: '#FF9F43' },
    thinking: { eyeY: 55, mouthPath: 'M48 68 Q56 72 64 68', color: '#9B72CF' },
    celebrating: { eyeY: 50, mouthPath: 'M40 62 Q56 80 72 62', color: '#6BCB77' },
  }
  const m = moods[mood] || moods.happy

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <svg width={size} height={size} viewBox="0 0 112 112" style={{ animation: mood === 'celebrating' ? 'bounce 1.2s ease-in-out infinite' : 'bounce 3s ease-in-out infinite' }}>
        {/* Sombra */}
        <ellipse cx="56" cy="106" rx="28" ry="6" fill="rgba(0,0,0,0.08)" />
        {/* Corpo */}
        <circle cx="56" cy="56" r="46" fill={m.color} />
        {/* Bochecha */}
        <circle cx="34" cy="68" r="9" fill="#FFB3C6" opacity="0.6" />
        <circle cx="78" cy="68" r="9" fill="#FFB3C6" opacity="0.6" />
        {/* Olho esquerdo */}
        <circle cx="42" cy={m.eyeY} r="9" fill="#fff" />
        <circle cx="44" cy={m.eyeY + 1} r="5" fill="#2D2D5E" />
        <circle cx="46" cy={m.eyeY - 1} r="2" fill="#fff" />
        {/* Olho direito */}
        <circle cx="70" cy={m.eyeY} r="9" fill="#fff" />
        <circle cx="72" cy={m.eyeY + 1} r="5" fill="#2D2D5E" />
        <circle cx="74" cy={m.eyeY - 1} r="2" fill="#fff" />
        {/* Boca */}
        <path d={m.mouthPath} stroke="#2D2D5E" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Orelhas */}
        <circle cx="12" cy="46" r="10" fill={m.color} />
        <circle cx="12" cy="46" r="6" fill="#FFB3C6" opacity="0.5" />
        <circle cx="100" cy="46" r="10" fill={m.color} />
        <circle cx="100" cy="46" r="6" fill="#FFB3C6" opacity="0.5" />
        {/* Moeda no bolso */}
        <circle cx="72" cy="82" r="8" fill="#F4B400" />
        <text x="72" y="86" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">$</text>
      </svg>

      {message && (
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '12px 18px',
          boxShadow: '0 4px 16px rgba(45,45,94,0.12)',
          maxWidth: 220,
          textAlign: 'center',
          position: 'relative',
          fontSize: 14,
          fontWeight: 700,
          color: '#2D2D5E',
          lineHeight: 1.5,
        }}>
          <div style={{
            position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
            width: 16, height: 16, background: '#fff',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            rotate: '180deg',
          }} />
          {message}
        </div>
      )}
    </div>
  )
}
