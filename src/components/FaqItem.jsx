// Ítem desplegable para preguntas frecuentes.
// Usa <details> y <summary>, así evitamos agregar estado React innecesario.

export default function FAQItem({ item }) {
  return (
    <details className="group rounded-[1.35rem] border border-[#D7B56D]/25 bg-[#FFFDF7]/75 p-6 shadow-[0_15px_45px_rgba(8,46,58,0.05)] open:bg-[#F8F0E4]">
      <summary className="cursor-pointer list-none font-serif text-xl text-[#082E3A]">
        <span className="flex items-center justify-between gap-5">
          {item.q}

          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#D7B56D]/45 text-[#B99752] transition group-open:rotate-45">
            +
          </span>
        </span>
      </summary>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#355966]">
        {item.a}
      </p>
    </details>
  );
}