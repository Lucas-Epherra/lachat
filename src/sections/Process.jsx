import Label from "../components/Label";
import { CenterDivider } from "../components/Dividers";
import { processSteps } from "../data/processSteps";

// Sección de método de trabajo.
// Explica el proceso en tres pasos simples.

export default function Process() {
  return (
    <section id="metodo" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Label>Cómo trabajamos</Label>

        <h2 className="mt-7 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
          Un proceso simple para resolver sin vueltas.
        </h2>

        <CenterDivider />
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
        {processSteps.map((step, index) => (
          <article
            key={step}
            className="rounded-[1.8rem] border border-[#D7B56D]/25 bg-[#FFFDF7]/75 p-8 text-center shadow-[0_20px_60px_rgba(8,46,58,0.06)]"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#082E3A] font-serif text-xl text-[#FFF9EF]">
              {index + 1}
            </div>
            <p className="mt-6 text-sm leading-7 text-[#355966]">{step}</p>
          </article>
        ))}
      </div>
    </section>
  );
}