import Label from "../components/Label";
import LeafSprig from "../components/LeafSprig";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

// Sección de servicios principales.
// Renderiza las cards desde data/services.js.

export default function Services() {
  return (
    <section id="servicios" className="relative mx-auto max-w-7xl px-6 py-20">
      <LeafSprig className="left-4 top-6 h-48 w-28 rotate-180 text-[#C8AA6A]/25" />

      <div className="relative z-10 max-w-3xl">
        <Label>Servicios</Label>

        <h2 className="mt-7 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
          Soluciones legales concretas para situaciones frecuentes.
        </h2>
      </div>

      <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}