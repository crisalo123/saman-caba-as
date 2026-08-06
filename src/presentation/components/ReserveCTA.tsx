import { TermsTrigger } from '@/presentation/components/TermsTrigger'

type ReserveCTAProps = {
  onReserve: () => void
}

export function ReserveCTA({ onReserve }: ReserveCTAProps) {
  return (
    <section id="reserva" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-leaf/20 bg-gradient-to-br from-white via-mist to-[#d5ddd0] px-6 py-12 shadow-[0_16px_50px_rgba(63,107,74,0.1)] md:px-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-leaf">Reserva</p>
        <h2 className="font-display mt-3 max-w-2xl text-4xl font-bold text-sand md:text-5xl">
          ¿Listo para desconectar?
        </h2>
        <p className="mt-4 max-w-xl text-sand/70">
          Cuéntanos fechas y cuántas personas van. Te confirmamos disponibilidad
          y valor por WhatsApp.
        </p>
        <button
          type="button"
          onClick={onReserve}
          className="mt-8 rounded-full bg-leaf px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(63,107,74,0.25)] transition hover:brightness-110"
        >
          Escribir por WhatsApp
        </button>
        <p className="mt-4 text-xs text-sand/45">
          Al reservar aceptas nuestros{' '}
          <TermsTrigger className="underline transition hover:text-leaf" />
          .
        </p>
      </div>
    </section>
  )
}
