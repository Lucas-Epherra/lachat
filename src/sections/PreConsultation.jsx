import { useState } from "react";
import Label from "../components/Label";
import { buildWhatsAppUrl } from "../config/contact";

// Formulario liviano de preconsulta.
// No guarda datos ni requiere backend: arma un mensaje ordenado y lo abre en WhatsApp.

const consultationTypes = [
  "Locación urbana",
  "Contrato comercial",
  "Arrendamiento rural",
  "Carta documento / intimación",
  "Revisión de contrato antes de firmar",
  "Otra consulta",
];

const initialForm = {
  name: "",
  type: "",
  hasDocuments: "",
  message: "",
};

export default function PreConsultation() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.type || !form.message.trim()) {
      setError("Completá tu nombre, el tipo de consulta y una breve descripción.");
      return;
    }

    const whatsappMessage = `Hola, soy ${form.name.trim()}.

Quiero realizar una consulta sobre: ${form.type}.

¿Tengo documentación para enviar?: ${
      form.hasDocuments || "No especificado"
    }.

Breve descripción:
${form.message.trim()}

Gracias.`;

    window.open(buildWhatsAppUrl(whatsappMessage), "_blank", "noopener,noreferrer");

    setForm(initialForm);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="overflow-hidden rounded-[2.5rem] border border-[#D7B56D]/30 bg-[#082E3A] shadow-[0_30px_100px_rgba(8,46,58,0.22)]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative p-8 text-[#FFF9EF] md:p-12">
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#D7B56D]/10 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#FFF9EF]/10 blur-3xl" />

            <div className="relative z-10">
              <Label variant="light">Preconsulta</Label>

              <h2 className="mt-6 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-5xl">
                Contá brevemente tu situación y consultá por WhatsApp.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#E9DDC8]">
                Este formulario ayuda a ordenar la consulta inicial. No reemplaza
                el asesoramiento profesional, pero permite enviar el primer
                mensaje con la información mínima necesaria.
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-[#FFF9EF]/15 bg-[#FFF9EF]/8 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#D7B56D]">
                  Recomendación
                </p>
                <p className="mt-3 text-base leading-7 text-[#E9DDC8]">
                  Evitá enviar datos sensibles o documentación completa hasta que
                  el estudio te indique cómo continuar.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#FFF9EF] p-6 md:p-10 lg:p-12"
          >
            <div className="grid gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-[#082E3A]"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Tu nombre"
                  className="mt-3 w-full rounded-2xl border border-[#D7B56D]/30 bg-white px-5 py-4 text-[#082E3A] outline-none transition focus:border-[#D7B56D] focus:ring-4 focus:ring-[#D7B56D]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-[#082E3A]"
                >
                  Tipo de consulta
                </label>
                <select
                  id="type"
                  value={form.type}
                  onChange={(event) => updateField("type", event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-[#D7B56D]/30 bg-white px-5 py-4 text-[#082E3A] outline-none transition focus:border-[#D7B56D] focus:ring-4 focus:ring-[#D7B56D]/15"
                >
                  <option value="">Seleccionar una opción</option>
                  {consultationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.18em] text-[#082E3A]">
                  ¿Tenés documentación?
                </legend>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {["Sí", "No", "No estoy seguro/a"].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D7B56D]/25 bg-white px-4 py-3 text-sm font-medium text-[#3E5A62] transition hover:border-[#D7B56D]/60"
                    >
                      <input
                        type="radio"
                        name="hasDocuments"
                        value={option}
                        checked={form.hasDocuments === option}
                        onChange={(event) =>
                          updateField("hasDocuments", event.target.value)
                        }
                        className="h-4 w-4 accent-[#082E3A]"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-[#082E3A]"
                >
                  Breve descripción
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Ej: Estoy por firmar un contrato de alquiler y quisiera revisar algunas cláusulas."
                  rows="5"
                  className="mt-3 w-full resize-none rounded-2xl border border-[#D7B56D]/30 bg-white px-5 py-4 text-[#082E3A] outline-none transition focus:border-[#D7B56D] focus:ring-4 focus:ring-[#D7B56D]/15"
                />
              </div>

              {error && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-[#082E3A] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFF9EF] shadow-[0_18px_40px_rgba(8,46,58,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0B3C4B] focus:outline-none focus:ring-4 focus:ring-[#D7B56D]/25 md:w-auto md:self-end"
              >
                Enviar consulta por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}