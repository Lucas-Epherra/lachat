// Logo textual del estudio.
// El prop "light" adapta los colores cuando el logo se usa sobre fondo oscuro.

export default function Logo({ light = false }) {
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