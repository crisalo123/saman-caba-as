import { cabins } from '@/infrastructure/data/cabins'
import { CabinCard } from '@/presentation/components/CabinCard'

type CabinGridProps = {
  onReserve: (cabinName: string) => void
}

export function CabinGrid({ onReserve }: CabinGridProps) {
  return (
    <section id="cabanas" className="relative px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-leaf">Nuestras cabañas</p>
        <h2 className="font-display mt-3 max-w-xl text-4xl font-bold tracking-tight text-sand md:text-5xl">
          Elige tu refugio
        </h2>
        <p className="mt-4 max-w-2xl text-sand/65">
          Pareja, Medium, Medium Plus y Maxi — con desayuno incluido.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {cabins.map((cabin) => (
            <CabinCard key={cabin.id} cabin={cabin} onReserve={onReserve} />
          ))}
        </div>
      </div>
    </section>
  )
}
