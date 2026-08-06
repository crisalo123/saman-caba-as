/** Cambia este número por el de reservas del Samán cuando lo tengas. */
export const WHATSAPP_NUMBER = '573213622399'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
