import Button from "../components/Button";
import Label from "../components/Label";
import { commonSituations } from "../data/commonSituations";
import { buildWhatsAppUrl } from "../config/contact";

// Sección orientada a conversión.
// Traduce servicios legales en problemas concretos que el usuario reconoce rápido.

export default function CommonSituations() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Label>Situaciones frecuentes</Label>

          <h2 className="mt-6 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#082E3A] md:text-5xl">
            Si estás en alguna de estas situaciones, conviene consultar antes de
            avanzar.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#3E5A62]">
            Un contrato mal revisado o una intimación mal planteada puede generar
            más problemas que soluciones. La prevención legal suele ser más
            simple, más rápida y más económica que corregir el conflicto después.
          </p>
        </div>

        <div className="grid gap-5">
          {commonSituations.map((situation) => {
            const situationWhatsappUrl = buildWhatsAppUrl(
              situation.whatsappMessage
            );

            return (
              <article
                key={situation.title}
                className="group rounded-[2rem] border border-[#D7B56D]/25 bg-[#FFF9EF]/80 p-7 shadow-[0_20px_70px_rgba(8,46,58,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#D7B56D]/50 hover:shadow-[0_28px_85px_rgba(8,46,58,0.11)]"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#082E3A]">
                      {situation.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#3E5A62]">
                      {situation.text}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Button
                      href={situationWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                    >
                      {situation.cta}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}