import Logo from "./components/Logo";
import Label from "./components/Label";
import Button from "./components/Button";
import LeafSprig from "./components/LeafSprig";
import OrganicDecor from "./components/OrganicDecor";
import ServiceCard from "./components/ServiceCard";
import FAQItem from "./components/FAQItem";
import { Divider, CenterDivider } from "./components/Dividers";

import { services } from "./data/services";
import { faqs } from "./data/faqs";
import { processSteps } from "./data/processSteps";
import { approachItems } from "./data/approachItems";

import { contact, whatsappUrl, emailUrl } from "./config/contact";

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9EF] text-[#082E3A]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(215,181,109,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(8,46,58,0.05),transparent_25%)]" />

      <header className="sticky top-0 z-50 border-b border-[#D7B56D]/20 bg-[#FFF9EF]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Logo />

          <nav className="hidden items-center gap-10 text-[11px] font-bold text-[#082E3A]/60 md:flex">
            <a href="#servicios" className="hover:text-[#082E3A]">
              Servicios
            </a>
            <a href="#metodo" className="hover:text-[#082E3A]">
              Método
            </a>
            <a href="#faq" className="hover:text-[#082E3A]">
              Preguntas
            </a>
            <a href="#contacto" className="hover:text-[#082E3A]">
              Contacto
            </a>
          </nav>

          <a
            href={whatsappUrl}
            className="rounded-full bg-[#082E3A] px-5 py-2.5 text-[11px] font-bold text-[#FFF9EF] transition hover:bg-[#123E4B]"
          >
            Consultar
          </a>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <OrganicDecor />

        <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Label>Contratos claros. Reclamos firmes.</Label>

            <h1 className="mt-8 max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[#082E3A] md:text-7xl">
              Asesoramiento legal para alquilar, arrendar o intimar con
              respaldo.
            </h1>

            <Divider />

            <p className="max-w-2xl text-base leading-8 text-[#355966] md:text-lg">
              Redacción y revisión de contratos de locación, arrendamientos
              rurales e intimaciones por carta documento, con una mirada clara,
              preventiva y estratégica.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappUrl}>
                Consultar por WhatsApp
              </Button>

              <Button
                href={emailUrl}
                variant="secondary"
              >
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
                  {[
                    "Contratos personalizados",
                    "Revisión preventiva",
                    "Locaciones y garantías",
                    "Cartas documento",
                  ].map((item) => (
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
            {[
              "Evitar modelos genéricos que no contemplan riesgos reales.",
              "Ordenar obligaciones, plazos, pagos, garantías y consecuencias.",
              "Actuar rápido frente a incumplimientos para proteger tu posición.",
            ].map((item, index) => (
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

      <section id="metodo" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Label>Cómo trabajamos</Label>

          <h2 className="mt-7 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
            Un proceso simple para resolver sin vueltas.
          </h2>

          <CenterDivider />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            "Contás tu situación y enviás la documentación disponible.",
            "Se analiza el caso y se define el camino más conveniente.",
            "Recibís el contrato, revisión o intimación lista para avanzar.",
          ].map((step, index) => (
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
              <Button href={whatsappUrl}>
                WhatsApp
              </Button>

              <a
                href={emailUrl}
                className="inline-flex items-center justify-center rounded-full border border-[#D7B56D]/50 px-6 py-3 text-xs font-bold text-[#FFF9EF] transition hover:bg-[#FFF9EF]/10"
              >
                Email
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
              className="mt-10 inline-block text-sm font-bold text-[#D7B56D] hover:text-[#FFF9EF]"
            >
              Ver Instagram →
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#D7B56D]/20 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-[#355966]/70 md:flex-row">
          <p>
            © {new Date().getFullYear()} Estudio Jurídico Lachat. Todos los
            derechos reservados.
          </p>
          <p>Diseño web con identidad clara, elegante y profesional.</p>
        </div>
      </footer>
    </main>
  );
}