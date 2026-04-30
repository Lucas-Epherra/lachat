// Divisores decorativos.
// El primero queda alineado al flujo normal del contenido.
// El segundo se centra, útil para secciones con texto centrado.

export function Divider() {
  return (
    <div className="my-7 flex max-w-xs items-center justify-center gap-3 text-[#C8AA6A]">
      <span className="h-px flex-1 bg-current/70" />
      <span className="text-xs">◆</span>
      <span className="h-px flex-1 bg-current/70" />
    </div>
  );
}

export function CenterDivider() {
  return (
    <div className="mx-auto my-7 flex max-w-xs items-center justify-center gap-3 text-[#C8AA6A]">
      <span className="h-px flex-1 bg-current/70" />
      <span className="text-xs">◆</span>
      <span className="h-px flex-1 bg-current/70" />
    </div>
  );
}