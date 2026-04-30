import Label from "../components/Label";
import FAQItem from "../components/FAQItem";
import { faqs } from "../data/faqs";

// Sección de preguntas frecuentes.
// Ayuda a reducir fricción antes de que la persona consulte.

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Label>Preguntas frecuentes</Label>

          <h2 className="mt-7 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
            Dudas comunes antes de contratar.
          </h2>

          <p className="mt-6 max-w-md text-sm leading-8 text-[#355966]">
            Información clara para tomar decisiones con menos incertidumbre y
            mayor respaldo jurídico.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <FAQItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}