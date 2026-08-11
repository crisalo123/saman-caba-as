/** WhatsApp del cliente (300 3244239). */
export const WHATSAPP_NUMBER = '573003244239'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
