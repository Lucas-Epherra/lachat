import Label from "../components/Label";
import LeafSprig from "../components/LeafSprig";
import { approachItems } from "../data/approachItems";

// Bloque de enfoque diferencial.
// Usa azul profundo como contraste fuerte dentro de la identidad visual.

export default function Approach() {
  return (
    <section className="relative overflow-hidden bg-[#082E3A] px-6 py-20 text-[#FFF9EF]">
      <div className="absolute -left-24 -top-36 h-80 w-80 rounded-full border border-[#D7B56D]/25" />
      <LeafSprig className="right-16 top-8 h-56 w-32 text-[#D7B56D]/18" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Label dark>Enfoque</Label>

          <h2 className="mt-7 max-w-lg font-serif text-4xl leading-tight md:text-5xl">
            Prevención jurídica con lenguaje claro.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {approachItems.map((item, index) => (
            <article
              key={item}
              className="rounded-[1.8rem] border border-[#FFF9EF]/12 bg-[#FFF9EF]/7 p-7"
            >
              <p className="font-serif text-3xl text-[#D7B56D]">
                0{index + 1}
              </p>
              <p className="mt-5 text-sm leading-7 text-[#FFF9EF]/75">
                {item}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}