// frontend/src/pages/LandingPage.jsx
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MascotHero({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" style={{ filter: 'drop-shadow(0 12px 32px rgba(155,114,207,0.35))', animation: 'float 3s ease-in-out infinite' }}>
      <defs>
        <radialGradient id="bodyGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#FFB800" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="152" rx="38" ry="8" fill="rgba(0,0,0,0.08)" />
      <circle cx="14" cy="72" r="16" fill="url(#bodyGrad)" />
      <circle cx="14" cy="72" r="10" fill="#FFD93D" opacity="0.5" />
      <circle cx="146" cy="72" r="16" fill="url(#bodyGrad)" />
      <circle cx="146" cy="72" r="10" fill="#FFD93D" opacity="0.5" />
      <circle cx="80" cy="78" r="66" fill="url(#bodyGrad)" />
      <circle cx="80" cy="78" r="62" fill="#FFD93D" opacity="0.3" />
      <circle cx="52" cy="72" r="14" fill="#fff" />
      <circle cx="55" cy="74" r="8" fill="#2D2D5E" />
      <circle cx="58" cy="71" r="3" fill="#fff" />
      <circle cx="108" cy="72" r="14" fill="#fff" />
      <circle cx="111" cy="74" r="8" fill="#2D2D5E" />
      <circle cx="114" cy="71" r="3" fill="#fff" />
      <circle cx="48" cy="96" r="12" fill="#FFB3C6" opacity="0.5" />
      <circle cx="112" cy="96" r="12" fill="#FFB3C6" opacity="0.5" />
      <path d="M60 98 Q80 114 100 98" stroke="#2D2D5E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="104" cy="110" r="12" fill="#F4B400" />
      <circle cx="104" cy="110" r="9" fill="#FFD93D" />
      <text x="104" y="114.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92600A">K</text>
      <path d="M62 52 Q80 40 98 52" stroke="#F4B400" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function FloatingCoin({ x, y, delay, size = 28 }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, animation: `float ${3 + delay}s ease-in-out infinite`, animationDelay: `${delay}s`, zIndex: 0, opacity: 0.7 }}>
      <svg width={size} height={size} viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="13" fill="#F4B400" />
        <circle cx="14" cy="14" r="10" fill="#FFD93D" />
        <text x="14" y="18" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92600A">K</text>
      </svg>
    </div>
  )
}

function StarBurst({ x, y, color = '#FFD93D', size = 20 }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, fontSize: size, animation: 'twinkle 2s ease-in-out infinite', zIndex: 0 }}>⭐</div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: '#F8F6FF', color: '#2D2D5E', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(8deg)} }
        @keyframes twinkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pop { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .hero-btn { transition: all 0.22s; }
        .hero-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 12px 32px rgba(124,58,237,0.38) !important; }
        .card-hover { transition: all 0.22s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(45,45,94,0.14) !important; }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #9B72CF; }
        .cta-shine { background: linear-gradient(90deg, #9B72CF, #4D96FF, #9B72CF); background-size: 200% auto; animation: shimmer 2.5s linear infinite; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrollY > 40 ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrollY > 40 ? 'blur(16px)' : 'none',
        borderBottom: scrollY > 40 ? '1.5px solid #F0EEF8' : 'none',
        transition: 'all 0.3s',
        padding: '0 32px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width={34} height={34} viewBox="0 0 34 34">
              <circle cx="17" cy="17" r="16" fill="#F4B400" />
              <circle cx="17" cy="17" r="12" fill="#FFD93D" />
              <text x="17" y="21.5" textAnchor="middle" fontSize="13" fontWeight="900" fill="#92600A">K</text>
            </svg>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#7C3AED', letterSpacing: -0.5 }}>KidCoin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <span className="nav-link" style={{ fontWeight: 700, fontSize: 15, color: '#2D2D5E' }} onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>Sobre</span>
            <span className="nav-link" style={{ fontWeight: 700, fontSize: 15, color: '#2D2D5E' }} onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}>Como funciona</span>
            <span className="nav-link" style={{ fontWeight: 700, fontSize: 15, color: '#2D2D5E' }} onClick={() => document.getElementById('para-quem')?.scrollIntoView({ behavior: 'smooth' })}>Para quem</span>
            <button onClick={() => navigate('/login')} style={{
              background: 'linear-gradient(135deg, #9B72CF, #4D96FF)', color: '#fff',
              border: 'none', borderRadius: 50, padding: '10px 24px',
              fontWeight: 900, fontSize: 15, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(124,58,237,0.28)',
              fontFamily: 'Nunito, sans-serif',
            }} className="hero-btn">
              Entrar →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #EDE9FE 0%, #DBEAFE 55%, #DCFCE7 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Blobs de fundo */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(155,114,207,0.12)', top: -100, left: -120, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(77,150,255,0.10)', bottom: -60, right: -80, filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(107,203,119,0.10)', bottom: 100, left: '30%', filter: 'blur(40px)' }} />

        {/* Elementos flutuantes decorativos */}
        <FloatingCoin x="6%" y="18%" delay={0} size={36} />
        <FloatingCoin x="88%" y="22%" delay={1} size={26} />
        <FloatingCoin x="12%" y="75%" delay={0.5} size={22} />
        <FloatingCoin x="82%" y="70%" delay={1.5} size={32} />
        <StarBurst x="22%" y="12%" size={22} />
        <StarBurst x="75%" y="10%" size={18} />
        <StarBurst x="5%" y="55%" size={16} />
        <StarBurst x="92%" y="48%" size={20} />
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: [50, 35, 65, 40, 55, 30, 70, 45][i],
            height: [50, 35, 65, 40, 55, 30, 70, 45][i],
            borderRadius: '50%',
            background: ['#FFD93D','#FF9F43','#9B72CF','#6BCB77','#4D96FF','#FF6B6B','#A8E6CF','#FFB3C6'][i],
            opacity: 0.12,
            top: [`8%`,`78%`,`15%`,`88%`,`3%`,`65%`,`35%`,`50%`][i],
            left: [`18%`,`5%`,`92%`,`75%`,`62%`,`88%`,`2%`,`50%`][i],
            animation: `floatSlow ${[3.5,4,3,4.5,3.2,4.2,3.8,4.8][i]}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
        ))}

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Texto esquerda */}
          <div style={{ animation: 'fadeUp 0.7s ease-out' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 50, padding: '8px 18px', marginBottom: 24, boxShadow: '0 2px 12px rgba(45,45,94,0.10)' }}>
              <span style={{ fontSize: 16 }}>✨</span>
              <span style={{ fontWeight: 800, fontSize: 13, color: '#7C3AED' }}>Educação financeira para crianças</span>
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.1, color: '#2D2D5E', marginBottom: 22, letterSpacing: -1.5 }}>
              Aprender sobre{' '}
              <span style={{ background: 'linear-gradient(135deg, #9B72CF, #4D96FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                dinheiro
              </span>{' '}
              nunca foi tão{' '}
              <span style={{ color: '#FFB800', WebkitTextFillColor: '#FFB800' }}>divertido!</span>
            </h1>

            <p style={{ fontSize: 18, color: '#5A5A7E', fontWeight: 600, lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
              O KidCoin é uma plataforma que ensina educação financeira para crianças de 8 a 10 anos por meio de missões, desafios e recompensas.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/login')} className="hero-btn cta-shine" style={{
                color: '#fff', border: 'none', borderRadius: 50,
                padding: '16px 36px', fontSize: 17, fontWeight: 900,
                cursor: 'pointer', boxShadow: '0 8px 28px rgba(124,58,237,0.32)',
                fontFamily: 'Nunito, sans-serif',
              }}>
                🚀 Começar agora
              </button>
              <button onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })} style={{
                background: '#fff', border: '2px solid #E5E3F0', borderRadius: 50,
                padding: '16px 32px', fontSize: 17, fontWeight: 800,
                cursor: 'pointer', color: '#2D2D5E', transition: 'all 0.2s',
                fontFamily: 'Nunito, sans-serif',
              }}>
                Saiba mais →
              </button>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36 }}>
              <div style={{ display: 'flex' }}>
                {['#9B72CF','#4D96FF','#6BCB77','#FF9F43'].map((c, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#fff' }}>
                    {['A','P','E','K'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2 }}>{'⭐⭐⭐⭐⭐'.split('').map((s, i) => <span key={i} style={{ fontSize: 14 }}>{s}</span>)}</div>
                <p style={{ fontSize: 13, color: '#7C7C9A', fontWeight: 700 }}>Aprovado por alunos e professores</p>
              </div>
            </div>
          </div>

          {/* Mascote direita */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'fadeUp 0.9s ease-out' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,217,61,0.18) 0%, transparent 70%)' }} />
              <MascotHero size={260} />

              {/* Balão de fala */}
              <div style={{
                position: 'absolute', top: -10, right: -20,
                background: '#fff', borderRadius: 20, padding: '12px 16px',
                boxShadow: '0 6px 24px rgba(45,45,94,0.14)', maxWidth: 160,
                animation: 'float 3.5s ease-in-out infinite', animationDelay: '0.5s',
              }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#2D2D5E', lineHeight: 1.4 }}>Vamos aprender sobre dinheiro! 🪙</p>
              </div>

              {/* Badge de moedas */}
              <div style={{
                position: 'absolute', bottom: 20, left: -30,
                background: 'linear-gradient(135deg, #FFD93D, #FF9F43)',
                borderRadius: 16, padding: '10px 16px',
                boxShadow: '0 6px 20px rgba(255,159,67,0.4)',
                animation: 'float 4s ease-in-out infinite', animationDelay: '1s',
              }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>+150 🪙 KidCoins</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>ganhos hoje!</p>
              </div>

              {/* Badge de nível */}
              <div style={{
                position: 'absolute', top: 60, left: -40,
                background: 'linear-gradient(135deg, #6BCB77, #4CAF50)',
                borderRadius: 16, padding: '10px 14px',
                boxShadow: '0 6px 20px rgba(107,203,119,0.4)',
                animation: 'float 3.8s ease-in-out infinite', animationDelay: '0.3s',
              }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>🏆 Nível 3</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Poupador!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s ease-in-out infinite', zIndex: 1 }}>
          <div style={{ width: 28, height: 44, border: '2.5px solid #9B72CF', borderRadius: 14, display: 'flex', justifyContent: 'center', paddingTop: 6, opacity: 0.6 }}>
            <div style={{ width: 4, height: 10, background: '#9B72CF', borderRadius: 2 }} />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: 'linear-gradient(135deg, #9B72CF, #4D96FF)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
          {[
            { icon: '👦', value: '8–10', label: 'Anos de idade' },
            { icon: '🪙', value: '∞', label: 'KidCoins disponíveis' },
            { icon: '📚', value: '5+', label: 'Módulos de aprendizado' },
            { icon: '🏆', value: '3', label: 'Perfis de usuário' },
          ].map(s => (
            <div key={s.label} style={{ color: '#fff' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, opacity: 0.85, fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" style={{ padding: '96px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ background: '#EDE9FE', color: '#7C3AED', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 800 }}>🎯 Nossa missão</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#2D2D5E', marginTop: 16, marginBottom: 16, letterSpacing: -1 }}>
              O que é o KidCoin?
            </h2>
            <p style={{ fontSize: 18, color: '#5A5A7E', fontWeight: 600, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Uma plataforma que transforma educação financeira em aventura, com missões, recompensas e personagens que guiam a criança pelo caminho do aprendizado.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { icon: '🎯', title: 'Missões e Desafios', desc: 'Atividades criadas por professores com perguntas divertidas sobre dinheiro, poupança e consumo consciente.', color: '#EDE9FE', border: '#9B72CF' },
              { icon: '🪙', title: 'Sistema de Moedas', desc: 'Ao completar atividades, as crianças ganham KidCoins que podem usar para personalizar seus avatares na loja.', color: '#FFF8DC', border: '#FFD93D' },
              { icon: '📈', title: 'Progressão de Nível', desc: 'De Iniciante a Mestre das Finanças — cada resposta certa traz XP e evolução na jornada de aprendizado.', color: '#DCFCE7', border: '#6BCB77' },
              { icon: '🏫', title: 'Integração Escolar', desc: 'Professores criam salas, aplicam atividades e acompanham o progresso de cada aluno individualmente.', color: '#DBEAFE', border: '#4D96FF' },
              { icon: '📊', title: 'Relatórios Completos', desc: 'Administradores têm visão total do desempenho da escola, rankings e métricas de engajamento.', color: '#FFE4E6', border: '#FF6B6B' },
              { icon: '🛍️', title: 'Loja de Recompensas', desc: 'Com as moedas ganhas, as crianças compram roupinhas e acessórios para seu personagem, reforçando o conceito de gastar conscientemente.', color: '#FFF0DC', border: '#FF9F43' },
            ].map((card, i) => (
              <div key={card.title} className="card-hover" style={{
                background: card.color, borderRadius: 24, padding: 28,
                border: `2px solid ${card.border}`, cursor: 'default',
                boxShadow: '0 4px 16px rgba(45,45,94,0.07)',
                animation: `fadeUp ${0.4 + i * 0.1}s ease-out`,
              }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>{card.icon}</div>
                <h3 style={{ fontWeight: 900, fontSize: 18, color: '#2D2D5E', marginBottom: 10 }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: '#5A5A7E', fontWeight: 600, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: '96px 24px', background: '#F8F6FF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ background: '#DCFCE7', color: '#166534', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 800 }}>⚙️ Como funciona</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#2D2D5E', marginTop: 16, marginBottom: 16, letterSpacing: -1 }}>
              Simples para todos
            </h2>
            <p style={{ fontSize: 18, color: '#5A5A7E', fontWeight: 600, maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              Três perfis, uma só plataforma — cada um com sua jornada exclusiva.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                role: 'Escola / Admin', icon: '🏛️', color: 'linear-gradient(135deg, #2D2D5E, #7C3AED)', steps: [
                  'Cadastra professores e alunos',
                  'Monitora o desempenho geral',
                  'Acessa relatórios completos',
                  'Visualiza rankings da escola',
                ]
              },
              {
                role: 'Professor', icon: '👨‍🏫', color: 'linear-gradient(135deg, #4D96FF, #6BCB77)', steps: [
                  'Cria e gerencia salas',
                  'Elabora atividades com quiz',
                  'Publica para os alunos',
                  'Acompanha o progresso',
                ]
              },
              {
                role: 'Aluno', icon: '👦', color: 'linear-gradient(135deg, #FF9F43, #FFD93D)', steps: [
                  'Acessa as atividades da sala',
                  'Responde os quizzes',
                  'Ganha KidCoins e XP',
                  'Compra itens na loja!',
                ]
              },
            ].map((profile, i) => (
              <div key={profile.role} className="card-hover" style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(45,45,94,0.10)' }}>
                <div style={{ background: profile.color, padding: '24px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 44, marginBottom: 8 }}>{profile.icon}</div>
                  <h3 style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>{profile.role}</h3>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  {profile.steps.map((step, si) => (
                    <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: si < profile.steps.length - 1 ? 14 : 0 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color: '#7C3AED', flexShrink: 0 }}>
                        {si + 1}
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#2D2D5E' }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE GAMIFICAÇÃO */}
      <section style={{ padding: '96px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <span style={{ background: '#FFF8DC', color: '#92600A', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 800 }}>🎮 Por que gamificação?</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 900, color: '#2D2D5E', marginTop: 16, marginBottom: 20, lineHeight: 1.15, letterSpacing: -1 }}>
              Aprender brincando gera resultados reais
            </h2>
            <p style={{ fontSize: 17, color: '#5A5A7E', fontWeight: 600, lineHeight: 1.7, marginBottom: 32 }}>
              Quando o aprendizado vem embrulhado em diversão, as crianças absorvem mais, lembram melhor e pedem para voltar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '⚡', title: 'Engajamento real', desc: 'Missões e recompensas mantêm a atenção focada e motivada.' },
                { icon: '🧠', title: 'Aprendizado ativo', desc: 'Fazer, errar e tentar de novo é mais eficaz que só ouvir.' },
                { icon: '💡', title: 'Conceitos concretos', desc: 'Ganhar, poupar e gastar moedas torna finanças tangíveis.' },
                { icon: '🔄', title: 'Hábitos duradouros', desc: 'Repetição prazerosa forma hábitos que duram a vida toda.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: '#FFF8DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 15, color: '#2D2D5E' }}>{item.title}</p>
                    <p style={{ fontSize: 14, color: '#7C7C9A', fontWeight: 600, marginTop: 2 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual gamification */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🌱', label: 'Iniciante', xp: '0 XP', pct: 15, color: '#6BCB77' },
              { icon: '🔭', label: 'Explorador', xp: '100 XP', pct: 35, color: '#4D96FF' },
              { icon: '💰', label: 'Poupador', xp: '300 XP', pct: 55, color: '#9B72CF' },
              { icon: '📈', label: 'Investidor', xp: '600 XP', pct: 80, color: '#FF9F43' },
              { icon: '👑', label: 'Mestre', xp: '1000 XP', pct: 100, color: '#FF6B6B' },
            ].map((lvl, i) => (
              <div key={lvl.label} className="card-hover" style={{ background: '#F8F6FF', borderRadius: 18, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 10px rgba(45,45,94,0.07)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${lvl.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{lvl.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: '#2D2D5E' }}>{lvl.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#7C7C9A' }}>{lvl.xp}</span>
                  </div>
                  <div style={{ background: '#E5E3F0', borderRadius: 50, height: 8 }}>
                    <div style={{ width: `${lvl.pct}%`, height: '100%', background: lvl.color, borderRadius: 50, transition: 'width 1s ease-out', boxShadow: `0 0 8px ${lvl.color}66` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE 8-10 ANOS */}
      <section id="para-quem" style={{ padding: '96px 24px', background: 'linear-gradient(160deg, #EDE9FE 0%, #DBEAFE 100%)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ background: '#fff', color: '#7C3AED', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 800 }}>👶 Faixa etária ideal</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#2D2D5E', marginTop: 16, marginBottom: 16, letterSpacing: -1 }}>
            Por que 8 a 10 anos?
          </h2>
          <p style={{ fontSize: 18, color: '#5A5A7E', fontWeight: 600, maxWidth: 560, margin: '0 auto 56px', lineHeight: 1.6 }}>
            É a janela de ouro para formação de hábitos financeiros que duram para sempre.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '🌟', title: 'Formação de hábitos', desc: 'Nessa fase, hábitos se formam com facilidade e tendem a permanecer por toda a vida adulta.', bg: '#fff' },
              { icon: '🎮', title: 'Aprendizado lúdico', desc: 'Alta capacidade de absorção por meio de jogos, histórias e desafios visuais e interativos.', bg: '#fff' },
              { icon: '💡', title: 'Conceitos abstratos', desc: 'Começam a entender causa e efeito, valor das coisas e consequências de escolhas financeiras.', bg: '#fff' },
            ].map((item, i) => (
              <div key={item.title} className="card-hover" style={{ background: item.bg, borderRadius: 24, padding: 28, boxShadow: '0 4px 20px rgba(45,45,94,0.10)', animation: `fadeUp ${0.4 + i * 0.1}s ease-out` }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontWeight: 900, fontSize: 18, color: '#2D2D5E', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: '#5A5A7E', fontWeight: 600, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #2D2D5E 0%, #7C3AED 50%, #4D96FF 100%)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,217,61,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107,203,119,0.08) 0%, transparent 40%)' }} />
        <FloatingCoin x="5%" y="20%" delay={0} size={40} />
        <FloatingCoin x="88%" y="15%" delay={1} size={32} />
        <FloatingCoin x="10%" y="70%" delay={0.5} size={24} />
        <FloatingCoin x="85%" y="65%" delay={1.5} size={36} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <MascotHero size={130} />
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, color: '#fff', marginTop: 28, marginBottom: 16, letterSpacing: -1, lineHeight: 1.15 }}>
            Pronto para começar a jornada?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.82)', fontWeight: 600, marginBottom: 40, lineHeight: 1.6 }}>
            Faça login agora e comece a construir o futuro financeiro das crianças!
          </p>
          <button onClick={() => navigate('/login')} className="hero-btn" style={{
            background: 'linear-gradient(135deg, #FFD93D, #FF9F43)',
            color: '#2D2D5E', border: 'none', borderRadius: 50,
            padding: '18px 48px', fontSize: 20, fontWeight: 900,
            cursor: 'pointer', boxShadow: '0 10px 36px rgba(255,159,67,0.5)',
            fontFamily: 'Nunito, sans-serif',
          }}>
            🚀 Entrar no KidCoin
          </button>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 20, fontWeight: 600 }}>
            Gratuito para escolas parceiras
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1A1A3E', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <svg width={28} height={28} viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="13" fill="#F4B400" />
            <circle cx="14" cy="14" r="10" fill="#FFD93D" />
            <text x="14" y="18" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92600A">K</text>
          </svg>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>KidCoin</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, fontWeight: 600 }}>
          Educação financeira para crianças de 8 a 10 anos
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 12, fontWeight: 600 }}>
          © 2025 KidCoin — Todos os direitos reservados
        </p>
      </footer>
    </div>
  )
}
