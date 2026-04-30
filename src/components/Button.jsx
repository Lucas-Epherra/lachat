// Botón reutilizable para acciones principales y secundarias.
// variant="primary" se usa para CTA fuertes.
// variant="secondary" se usa para acciones alternativas.

export default function Button({ href, children, variant = "primary" }) {
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