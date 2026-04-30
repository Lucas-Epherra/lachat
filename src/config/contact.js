// Datos centrales de contacto.
// La idea es que si cambia WhatsApp, email o Instagram,
// se modifique solo este archivo y no toda la landing.

export const contact = {
  whatsappNumber: "542983406416",
  email: "rominalachat@gmail.com",
  instagram: "https://www.instagram.com/lachatyasoc/",
};

// Mensaje prearmado para abrir WhatsApp con contexto.
export const whatsappText = encodeURIComponent(
  "Hola, quisiera consultar por asesoramiento en contratos, locaciones, arrendamientos o intimaciones."
);

export const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${whatsappText}`;

export const emailUrl = `mailto:${contact.email}?subject=Consulta legal - Estudio Lachat`;