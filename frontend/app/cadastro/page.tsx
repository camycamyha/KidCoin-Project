'use client';
import { useState } from 'react';
import Navbar from "../../components/Navbar";

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState(''); // Começa vazio para forçar a escolha

  const lidarComCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tipo) {
      alert("Por favor, selecione se você é Aluno ou Professor!");
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3001/api/usuarios/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, login: email, senha, tipo }),
      });

      if (resposta.ok) {
        alert(`Conta de ${tipo.toLowerCase()} criada com sucesso! 🚀`);
      } else {
        alert("Erro no cadastro. Verifique os dados.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    }
  };

  return (
    <main>
      <Navbar />
      <section className="hero-section">
        <div className="layout-box" style={{ padding: '40px', backgroundColor: 'white' }}>
          <h2>Criar sua conta</h2>
          <form onSubmit={lidarComCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input placeholder="Nome" onChange={e => setNome(e.target.value)} required />
            <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} required />
            
            <label>O que você é?</label>
            <select 
              value={tipo} 
              onChange={e => setTipo(e.target.value)} 
              required 
              style={{ padding: '10px' }}
            >
              <option value="" disabled>Selecione uma opção...</option>
              <option value="ALUNO">Aluno</option>
              <option value="PROFESSOR">Professor</option>
            </select>

            <button type="submit">CADASTRAR NO KIDCOIN</button>
          </form>
        </div>
      </section>
    </main>
  );
}