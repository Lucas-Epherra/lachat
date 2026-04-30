import { whatsappUrl } from "../config/contact";

// Botón flotante de WhatsApp.
// Permite iniciar una consulta rápida desde cualquier parte de la landing.

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full border border-[#D7B56D]/40 bg-[#082E3A] px-5 py-3 text-xs font-bold text-[#FFF9EF] shadow-[0_18px_45px_rgba(8,46,58,0.28)] transition hover:-translate-y-0.5 hover:bg-[#123E4B]"
    >
      WhatsApp
    </a>
  );
}