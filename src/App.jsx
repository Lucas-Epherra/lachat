const WHATSAPP_NUMBER = "542983406416"; // Cambiar por el real
const EMAIL = "rominalachat@gmail.com"; // Cambiar por el real
const INSTAGRAM = "https://www.instagram.com/lachatyasoc/"; // Cambiar por el real

const whatsappText = encodeURIComponent(
  "Hola, quisiera consultar por asesoramiento en contratos, locaciones, arrendamientos o intimaciones."
);

const services = [
  {
    number: "01",
    title: "Locaciones urbanas",
    text: "Contratos de vivienda, locales, consultorios, oficinas y galpones.",
    icon: "⌂",
  },
  {
    number: "02",
    title: "Contratos comerciales",
    text: "Cláusulas sobre precio, actualización, garantías, mora y restitución.",
    icon: "◇",
  },
  {
    number: "03",
    title: "Arrendamientos rurales",
    text: "Uso de campo, parcelas, pastoreo, agricultura, mejoras y conservación.",
    icon: "✦",
  },
  {
    number: "04",
    title: "Intimaciones",
    text: "Cartas documento por falta de pago, daños o incumplimientos.",
    icon: "✉",
  },
];

const faqs = [
  {
    q: "¿Conviene revisar un contrato antes de firmar?",
    a: "Sí. Una revisión previa permite detectar omisiones, riesgos y cláusulas que pueden generar conflictos futuros.",
  },
  {
    q: "¿Cuándo corresponde intimar por carta documento?",
    a: "Cuando existe falta de pago, incumplimiento contractual, daños, uso indebido o falta de restitución del inmueble.",
  },
  {
    q: "¿La consulta puede realizarse online?",
    a: "Sí. La documentación puede enviarse digitalmente y la consulta puede resolverse de forma online.",
  },
];

function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative grid h-11 w-11 place-items-center rounded-full border ${
          light
            ? "border-[#D7B56D]/50 bg-[#FFF9EF]"
            : "border-[#D7B56D]/50 bg-[#FFF9EF]/80"
        }`}
      >
        <span className="font-serif text-2xl text-[#082E3A]">L</span>
        <span className="absolute -right-1 -top-1 text-[10px] text-[#B99752]">
          ✦
        </span>
      </div>

      <div className="leading-none">
        <p
          className={`text-[9px] uppercase tracking-[0.34em] ${
            light ? "text-[#FFF9EF]/65" : "text-[#082E3A]/55"
          }`}
        >
          Estudio Jurídico
        </p>
        <p
          className={`mt-1 font-serif text-xl tracking-[0.22em] ${
            light ? "text-[#FFF9EF]" : "text-[#082E3A]"
          }`}
        >
          LACHAT
        </p>
      </div>
    </div>
  );
}

function Label({ children, dark = false }) {
  return (
    <div
      className={`inline-flex items-center gap-3 border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] ${
        dark
          ? "border-[#D7B56D]/40 text-[#D7B56D]"
          : "border-[#D7B56D]/45 bg-[#FFF9EF]/75 text-[#082E3A]/70"
      }`}
    >
      <span className="h-px w-5 bg-[#D7B56D]" />
      {children}
      <span className="h-1 w-1 rounded-full bg-[#D7B56D]" />
    </div>
  );
}

function Button({ href, children, variant = "primary" }) {
  const style =
    variant === "primary"
      ? "bg-[#082E3A] text-[#FFF9EF] hover:bg-[#123E4B]"
      : "border border-[#D7B56D]/50 bg-[#FFF9EF]/70 text-[#082E3A] hover:bg-[#F5ECDD]";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold transition hover:-translate-y-0.5 ${style}`}
    >
      {children}
    </a>
  );
}

function LeafSprig({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
    >
      <path
        d="M61 208C58 151 61 83 94 18"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {[
        [75, 43, 34],
        [84, 70, -18],
        [67, 96, 28],
        [78, 125, -24],
        [57, 150, 26],
        [70, 176, -20],
      ].map(([x, y, r], index) => (
        <ellipse
          key={index}
          cx={x}
          cy={y}
          rx="8"
          ry="24"
          transform={`rotate(${r} ${x} ${y})`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function OrganicDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#EFE4D2]/75" />
      <div className="absolute -left-16 -top-12 h-[28rem] w-[28rem] rounded-full border border-[#D7B56D]/35" />

      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#F1E7D8]/70" />
      <div className="absolute -right-10 top-24 h-72 w-72 rounded-full border border-[#D7B56D]/30" />

      <div className="absolute -bottom-36 left-10 h-80 w-[34rem] rounded-[50%] bg-[#EADFCC]/55" />

      <LeafSprig className="right-16 top-24 h-56 w-32 text-[#C8AA6A]/35" />
    </div>
  );
}

function Divider() {
  return (
    <div className="my-7 flex max-w-xs items-center justify-center gap-3 text-[#C8AA6A]">
      <span className="h-px flex-1 bg-current/70" />
      <span className="text-xs">◆</span>
      <span className="h-px flex-1 bg-current/70" />
    </div>
  );
}

function CenterDivider() {
  return (
    <div className="mx-auto my-7 flex max-w-xs items-center justify-center gap-3 text-[#C8AA6A]">
      <span className="h-px flex-1 bg-current/70" />
      <span className="text-xs">◆</span>
      <span className="h-px flex-1 bg-current/70" />
    </div>
  );
}

function ServiceCard({ service }) {
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

function FAQItem({ item }) {
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
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
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
              <Button href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}>
                Consultar por WhatsApp
              </Button>

              <Button
                href={`mailto:${EMAIL}?subject=Consulta legal - Estudio Lachat`}
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
              <Button href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}>
                WhatsApp
              </Button>

              <a
                href={`mailto:${EMAIL}?subject=Consulta legal - Estudio Lachat`}
                className="inline-flex items-center justify-center rounded-full border border-[#D7B56D]/50 px-6 py-3 text-xs font-bold text-[#FFF9EF] transition hover:bg-[#FFF9EF]/10"
              >
                Email
              </a>
            </div>
          </div>

          <div className="relative border-t border-[#FFF9EF]/10 bg-[#FFF9EF]/5 p-9 md:p-14 lg:border-l lg:border-t-0">
            <Logo light />

            <div className="mt-10 space-y-5 text-sm text-[#FFF9EF]/75">
              <p>✉ {EMAIL}</p>
              <p>☏ WhatsApp directo</p>
              <p>⌂ Atención online y presencial</p>
            </div>

            <a
              href={INSTAGRAM}
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