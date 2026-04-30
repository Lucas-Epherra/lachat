// Card individual de servicio.
// Recibe un objeto "service" desde data/services.js.

export default function ServiceCard({ service }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-[#D7B56D]/25 bg-[#FFFDF7]/75 p-7 shadow-[0_20px_60px_rgba(8,46,58,0.06)] transition duration-300 hover:-translate-y-1">
      <div className="absolute right-6 top-5 font-serif text-5xl text-[#D7B56D]/15">
        {service.number}
      </div>

      <div className="mb-8 grid h-12 w-12 place-items-center rounded-full bg-[#F3E9D8] text-xl text-[#082E3A] ring-1 ring-[#D7B56D]/25">
        {service.icon}
      </div>

      <h3 className="font-serif text-2xl leading-tight text-[#082E3A]">
        {service.title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-[#355966]">{service.text}</p>

      <div className="mt-7 h-px w-16 bg-[#D7B56D]/60 transition group-hover:w-28" />
    </article>
  );
}