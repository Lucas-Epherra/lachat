// Datos centrales de contacto.
// Si cambia WhatsApp, email o Instagram, se modifica solo este archivo.

export const contact = {
  whatsappNumber: "542983406416",
  email: "rominalachat@gmail.com",
  instagram: "https://www.instagram.com/estudiojuridicolachat/",
};

export const defaultWhatsappMessage =
  "Hola, quisiera consultar por asesoramiento en contratos, locaciones, arrendamientos o intimaciones.";

export const buildWhatsAppUrl = (message = defaultWhatsappMessage) => {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${contact.whatsappNumber}?text=${encodedMessage}`;
};

export const whatsappUrl = buildWhatsAppUrl();

export const emailUrl = `mailto:${contact.email}?subject=Consulta legal - Estudio Lachat`;