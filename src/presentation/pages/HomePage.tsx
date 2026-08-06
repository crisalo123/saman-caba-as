import { useCallback } from 'react'
import { CabinGrid } from '@/presentation/components/CabinGrid'
import { ChatBox } from '@/presentation/components/ChatBox'
import { Experience } from '@/presentation/components/Experience'
import { Footer } from '@/presentation/components/Footer'
import { GalleryTeaser } from '@/presentation/components/GalleryTeaser'
import { Header } from '@/presentation/components/Header'
import { Hero } from '@/presentation/components/Hero'
import { ReserveCTA } from '@/presentation/components/ReserveCTA'
import { useWhatsApp } from '@/presentation/hooks/useWhatsApp'

export function HomePage() {
  const { openChat, reserveCabin } = useWhatsApp()

  const handleGeneralReserve = useCallback(() => {
    openChat(
      'Hola, quiero reservar en Cabañas el Samán. ¿Me cuentan disponibilidad y valores?',
    )
  }, [openChat])

  return (
    <div className="min-h-screen">
      <Header />
      <Hero onReserve={handleGeneralReserve} />
      <CabinGrid onReserve={reserveCabin} />
      <Experience />
      <GalleryTeaser />
      <ReserveCTA onReserve={handleGeneralReserve} />
      <Footer />
      <ChatBox />
    </div>
  )
}
