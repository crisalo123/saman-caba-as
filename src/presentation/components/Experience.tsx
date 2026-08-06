import { ParallaxMedia } from '@/presentation/components/ParallaxMedia'

const items = [
  {
    title: 'Naturaleza real',
    text: 'Aire limpio, sombra de árboles y el ritmo pausado que buscas.',
  },
  {
    title: 'Espacios pensados',
    text: 'Camas, salón y zonas comunes para compartir sin apuros.',
  },
  {
    title: 'Reserva directa',
    text: 'Escríbenos por WhatsApp o usa el chat: te respondemos rápido.',
  },
]

export function Experience() {
  return (
    <section id="experiencia" className="relative overflow-hidden px-4 py-20 md:px-6 md:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-leaf/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-leaf">Experiencia</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-sand md:text-5xl">
            Menos ruido.<br />Más presente.
          </h2>
          <ul className="mt-8 space-y-5">
            {items.map((item) => (
              <li key={item.title} className="border-l-2 border-leaf/40 pl-4">
                <h3 className="font-display text-xl text-sand">{item.title}</h3>
                <p className="mt-1 text-sm text-sand/65">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand/10 shadow-[0_16px_50px_rgba(20,50,79,0.1)]">
          <ParallaxMedia
            src="/images/galeria/img_682f45d2b93383.05526858.jpg"
            alt="Ambiente en Cabañas el Samán"
            className="absolute inset-0 h-full w-full"
            scaleFrom={1.06}
            scaleTo={1.2}
            yFrom={10}
            yTo={-14}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sand/70 to-transparent" />
          <p className="absolute bottom-5 left-5 right-5 font-display text-2xl text-white">
            El descanso que se siente.
          </p>
        </div>
      </div>
    </section>
  )
}
