// Footer simple.
// Mantiene cierre institucional y año dinámico.

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D7B56D]/20 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-[#355966]/70 md:flex-row">
        <p>
          <a
            href="https://lucas-epherra.github.io/Portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-[#0D7B56] underline underline-offset-4"
          >
            Web desarrollada por Lucas Epherra
          </a>{" "}
          © {currentYear} Estudio Jurídico Lachat. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}