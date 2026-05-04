import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="hero-section">
        <div className="hero-content">
          <h1>Educação Financeira para todos. Aprenda o valor do dinheiro, jogando.</h1>
          <p>
            Somos a plataforma de Educação Financeira para toda a escola. 
            Alinhamos o aprendizado à BNCC, unindo a gamificação e interdisciplinaridade.
          </p>
          <button>SOLICITAR DEMONSTRAÇÃO PARA MINHA ESCOLA</button>
        </div>

        <div className="hero-image">
          {/* O Next.js vai procurar em public/assets/Centy_abertura.png */}
          <Image 
            src="/assets/Centy_abertura.png" 
            alt="Mascote Centy" 
            width={500} 
            height={500}
            priority 
          />
        </div>
      </section>
    </main>
  );
}