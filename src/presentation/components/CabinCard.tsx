import type { Cabin } from '@/domain/entities/Cabin'
import { ParallaxMedia } from '@/presentation/components/ParallaxMedia'

type CabinCardProps = {
  cabin: Cabin
  onReserve: (cabinName: string) => void
}

function formatPrice(value?: number) {
  if (!value) return null
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function CabinCard({ cabin, onReserve }: CabinCardProps) {
  const price = formatPrice(cabin.priceFrom)

  return (
    <article className="group overflow-hidden rounded-3xl border border-sand/10 bg-white shadow-[0_12px_40px_rgba(20,50,79,0.08)] transition hover:-translate-y-1 hover:border-leaf/30">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ParallaxMedia
          src={cabin.images[0]}
          alt={cabin.name}
          className="absolute inset-0 h-full w-full"
          scaleFrom={1.04}
          scaleTo={1.16}
          yFrom={6}
          yTo={-10}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sand/50 via-transparent to-transparent" />
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${
            cabin.available
              ? 'bg-leaf text-white'
              : 'bg-white/90 text-sand'
          }`}
        >
          {cabin.available ? 'Disponible' : 'Consultar'}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="font-display text-2xl font-bold text-sand">{cabin.name}</h3>
          <p className="mt-1 text-sm text-sand/65">{cabin.blurb}</p>
        </div>

        <dl className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-mist px-2 py-3">
            <dt className="text-[10px] uppercase tracking-wider text-sand/45">Camas</dt>
            <dd className="mt-1 text-lg font-bold text-leaf">{cabin.beds}</dd>
          </div>
          <div className="rounded-2xl bg-mist px-2 py-3">
            <dt className="text-[10px] uppercase tracking-wider text-sand/45">Personas</dt>
            <dd className="mt-1 text-lg font-bold text-leaf">{cabin.capacity}</dd>
          </div>
          <div className="rounded-2xl bg-mist px-2 py-3">
            <dt className="text-[10px] uppercase tracking-wider text-sand/45">Salón</dt>
            <dd className="mt-1 text-lg font-bold text-leaf">
              {cabin.hasLivingRoom ? 'Sí' : 'No'}
            </dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-2">
          {cabin.amenities.map((item) => (
            <li
              key={item}
              className="rounded-full border border-sand/10 bg-mist px-2.5 py-1 text-xs text-sand/70"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            {price ? (
              <>
                <p className="text-[10px] uppercase tracking-wider text-sand/45">Desde</p>
                <p className="font-semibold text-sand">{price}</p>
              </>
            ) : (
              <p className="text-sm text-sand/55">Cotización al reservar</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onReserve(cabin.name)}
            className="rounded-full bg-leaf px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            Reservar
          </button>
        </div>
      </div>
    </article>
  )
}
