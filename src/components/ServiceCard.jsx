import Button from "./Button";
import { buildWhatsAppUrl } from "../config/contact";

// Card individual de servicio.
// Recibe un objeto "service" desde data/services.js.

export default function ServiceCard({ service }) {
  const serviceWhatsappUrl = buildWhatsAppUrl(service.whatsappMessage);

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-[#D7B56D]/25 bg-[#FFF9EF]/80 p-8 shadow-[0_24px_80px_rgba(8,46,58,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#D7B56D]/50 hover:shadow-[0_30px_90px_rgba(8,46,58,0.12)]">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-serif text-5xl text-[#D7B56D]/70">
          {service.number}
        </span>

        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#082E3A] text-xl text-[#FFF9EF]">
          {service.icon}
        </span>
      </div>

      <h3 className="font-serif text-2xl font-semibold text-[#082E3A]">
        {service.title}
      </h3>

      <p className="mt-4 text-base leading-7 text-[#3E5A62]">
        {service.text}
      </p>

      <div className="mt-8">
        <Button
          href={serviceWhatsappUrl}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          {service.cta}
        </Button>
      </div>
    </article>
  );
}