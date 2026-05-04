'use client'; // Avisa ao Next que esta página tem botões e formulários (interação)

import Navbar from "../../components/Navbar"; // Dois pontos extras para subir uma pasta a mais

export default function Login() {
  return (
    <main>
      <Navbar />
      
      {/* Usamos a classe hero-section do seu CSS para manter o fundo creminho e o grid */}
      <section className="hero-section" style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Usamos a classe layout-box do seu CSS para o formulário ter a borda grossa Rubber Hose */}
        <div className="layout-box" style={{ padding: '40px', maxWidth: '400px', width: '90%', backgroundColor: 'white' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '2em' }}>Crie sua conta no KidCoin</h2>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>E-mail</label>
              <input type="email" className="layout-box" style={{ padding: '12px' }} placeholder="seu@email.com" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>Senha</label>
              <input type="password" className="layout-box" style={{ padding: '12px' }} placeholder="******" />
            </div>

            <button type="submit" style={{ marginTop: '10px' }}>ENTRAR</button>
          </form>
        </div>

      </section>
    </main>
  );
}