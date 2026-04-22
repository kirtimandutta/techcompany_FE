const WHATSAPP_NUMBER = "919287501722";

export function createWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function openWhatsAppWithMessage(message) {
  const whatsappUrl = createWhatsAppUrl(message);
  return window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

export function openDefaultWhatsAppChat() {
  const defaultMessage = "Hello, I am interested in your services.";
  return openWhatsAppWithMessage(defaultMessage);
}
