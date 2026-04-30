import Label from "../components/Label";
import LeafSprig from "../components/LeafSprig";
import Logo from "../components/Logo";
import { contact, whatsappUrl, emailUrl } from "../config/contact";

// CTA final de contacto.
// Concentra los canales principales para convertir visitas en consultas.

export default function Contact() {
  return (
    <section id="contacto" className="px-6 py-24">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#082E3A] text-[#FFF9EF] shadow-[0_35px_100px_rgba(8,46,58,0.22)] lg:grid-cols-[1fr_0.85fr]">
        <LeafSprig className="right-10 top-8 h-64 w-36 text-[#D7B56D]/16" />

        <div className="relative p-9 md:p-14">
          <Label dark>Contacto</Label>

          <h2 className="mt-8 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            ¿Tenés un contrato para revisar o necesitás intimar?
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-[#FFF9EF]/72">
            Escribí con una breve descripción del caso y, si ya existe
            documentación, preparala para una primera revisión.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#FFF9EF] px-6 py-3 text-xs font-bold text-[#082E3A] transition hover:-translate-y-0.5 hover:bg-[#F5ECDD]"
            >
            Consultar Por WhatsApp
            </a>

            <a
              href={emailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#D7B56D]/50 px-6 py-3 text-xs font-bold text-[#FFF9EF] transition hover:bg-[#FFF9EF]/10"
            >
             Enviar Email
            </a>
          </div>
        </div>

        <div className="relative border-t border-[#FFF9EF]/10 bg-[#FFF9EF]/5 p-9 md:p-14 lg:border-l lg:border-t-0">
          <Logo light />

          <div className="mt-10 space-y-5 text-sm text-[#FFF9EF]/75">
            <p>✉ {contact.email}</p>
            <p>☏ WhatsApp directo</p>
            <p>⌂ Atención online y presencial</p>
          </div>

          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block text-sm font-bold text-[#D7B56D] hover:text-[#FFF9EF]"
          >
            Ver Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
