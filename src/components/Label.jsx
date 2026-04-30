// Etiqueta editorial reutilizable.
// Sirve para títulos pequeños como "Servicios", "Contacto" o "Guía práctica".

export default function Label({ children, dark = false }) {
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