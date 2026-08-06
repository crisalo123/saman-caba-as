import { useCallback } from 'react'
import { buildWhatsAppUrl } from '@/shared/constants/contact'

export type ReservationDraft = {
  dateLabel: string
  people: number
  cabinName: string
}

export function useWhatsApp() {
  const openChat = useCallback((message: string) => {
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }, [])

  const reserveCabin = useCallback(
    (cabinName: string) => {
      openChat(
        `Hola, vi la web de Cabañas el Samán y quiero reservar la ${cabinName}. ¿Me cuentan disponibilidad y valor?`,
      )
    },
    [openChat],
  )

  const sendReservation = useCallback(
    (draft: ReservationDraft) => {
      openChat(
        [
          'Hola, quiero reservar en Cabañas el Samán 🌴',
          '',
          `📅 Fecha: ${draft.dateLabel}`,
          `👥 Personas: ${draft.people}`,
          `🏡 Cabaña: ${draft.cabinName}`,
          '',
          'Envío esta info para que me contacten y confirmen disponibilidad. ¡Gracias!',
        ].join('\n'),
      )
    },
    [openChat],
  )

  return { openChat, reserveCabin, sendReservation }
}
