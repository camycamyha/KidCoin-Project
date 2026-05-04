import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <Image 
          src="/assets/logo_kidCoin.png" 
          alt="Kidcoin Logo" 
          width={150} 
          height={50} 
          className="navbar-logo"
        />
      </Link>

      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="#">Sobre</Link></li>
        <li><Link href="#">Preços</Link></li>
        <li><Link href="/login">ENTRAR</Link></li>
      </ul>

      <Link href="/cadastro">
  <button className="nav-button">CADASTRE-SE</button>
</Link>
    </nav>
  );
}