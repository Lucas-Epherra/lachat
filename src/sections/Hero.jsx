import Button from "../components/Button";
import Label from "../components/Label";
import LeafSprig from "../components/LeafSprig";
import OrganicDecor from "../components/OrganicDecor";
import { Divider } from "../components/Dividers";
import { whatsappUrl, emailUrl } from "../config/contact";

// Sección principal de presentación.
// Es el primer impacto visual y comercial de la landing.

export default function Hero() {
  const expressItems = [
    "Contratos personalizados",
    "Revisión preventiva",
    "Locaciones y garantías",
    "Cartas documento",
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <OrganicDecor />

      <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Label>Contratos claros. Reclamos firmes.</Label>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[#082E3A] md:text-7xl">
            Asesoramiento legal para alquilar, arrendar o intimar con respaldo.
          </h1>

          <Divider />

          <p className="max-w-2xl text-base leading-8 text-[#355966] md:text-lg">
            Redacción y revisión de contratos de locación, arrendamientos
            rurales e intimaciones por carta documento, con una mirada clara,
            preventiva y estratégica.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappUrl}>Consultar por WhatsApp</Button>

            <Button href={emailUrl} variant="secondary">
              Enviar email
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-[#D7B56D]/35" />
          <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-[#EFE4D2]/20 blur-sm" />

          <div className="relative overflow-hidden rounded-[2.4rem] bg-[#082E3A] p-8 text-[#FFF9EF] shadow-[0_35px_90px_rgba(8,46,58,0.24)]">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#D7B56D]/20" />
            <div className="absolute -bottom-20 -right-12 h-48 w-48 rounded-full bg-[#FFF9EF]/5" />

            <LeafSprig className="-right-5 top-12 h-44 w-24 text-[#D7B56D]/24" />

            <div className="relative z-10">
              <Label dark>Servicio express</Label>

              <h2 className="mt-8 font-serif text-4xl leading-tight">
                Antes de firmar, asesorate. Antes de reclamar, intimá
                correctamente.
              </h2>

              <div className="mt-10 space-y-4">
                {expressItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#FFF9EF]/12 bg-[#FFF9EF]/6 px-5 py-4 text-sm text-[#FFF9EF]/90"
                  >
                    <span className="mr-2 text-[#D7B56D]">✦</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}