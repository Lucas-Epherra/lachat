import LeafSprig from "./LeafSprig";

// Decoración orgánica del hero.
// Mantiene los ornamentos en tonos crema/dorado para no competir con el título.

export default function OrganicDecor() {
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