import Logo from "../components/Logo";
import { whatsappUrl } from "../config/contact";

// Header fijo superior.
// Contiene logo, navegación interna y CTA principal de consulta.

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D7B56D]/20 bg-[#FFF9EF]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />

        <nav className="hidden items-center gap-10 text-[11px] font-bold text-[#082E3A]/60 md:flex">
          <a href="#servicios" className="hover:text-[#082E3A]">
            Servicios
          </a>
          <a href="#metodo" className="hover:text-[#082E3A]">
            Método
          </a>
          <a href="#faq" className="hover:text-[#082E3A]">
            Preguntas
          </a>
          <a href="#contacto" className="hover:text-[#082E3A]">
            Contacto
          </a>
        </nav>

        <a
          href={whatsappUrl}
          className="rounded-full bg-[#082E3A] px-5 py-2.5 text-[11px] font-bold text-[#FFF9EF] transition hover:bg-[#123E4B]"
        >
          Consultar
        </a>
      </div>
    </header>
  );
}