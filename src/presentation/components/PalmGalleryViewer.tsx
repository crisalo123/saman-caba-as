import { useCallback, useEffect, useState } from 'react'
import { galleryImages } from '@/infrastructure/data/cabins'

type Direction = 'next' | 'prev'

export function PalmGalleryViewer() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<Direction>('next')
  const [animKey, setAnimKey] = useState(0)

  const total = galleryImages.length
  const current = galleryImages[index]
  const prevImg = galleryImages[(index - 1 + total) % total]

  const go = useCallback(
    (dir: Direction) => {
      setDirection(dir)
      setAnimKey((k) => k + 1)
      setIndex((i) =>
        dir === 'next' ? (i + 1) % total : (i - 1 + total) % total,
      )
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go('next')
      if (e.key === 'ArrowLeft') go('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div className="relative">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-sand/10 bg-mist shadow-[0_20px_60px_rgba(20,50,79,0.12)] md:aspect-[16/9] md:rounded-[2rem]">
        <img
          src={prevImg}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 blur-[2px]"
          aria-hidden
        />

        <div
          key={animKey}
          className={`absolute inset-0 ${
            direction === 'next' ? 'palm-wipe-next' : 'palm-wipe-prev'
          }`}
        >
          <img
            src={current}
            alt={`Galería El Samán ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14324f]/65 via-transparent to-transparent" />
        </div>

        <div className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rotate-12 rounded-[40%] border border-leaf/30 bg-leaf/10 blur-sm md:h-56 md:w-56" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 md:bottom-6 md:left-6 md:right-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
              Vista {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <p className="font-display mt-1 text-2xl font-bold text-white md:text-3xl">
              Bajo las palmas
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go('prev')}
              className="rounded-full border border-white/40 bg-white/25 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/40"
              aria-label="Imagen anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go('next')}
              className="rounded-full bg-leaf px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              aria-label="Imagen siguiente"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {galleryImages.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setDirection(i > index ? 'next' : 'prev')
              setAnimKey((k) => k + 1)
              setIndex(i)
            }}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition md:h-20 md:w-28 ${
              i === index
                ? 'border-leaf shadow-[0_8px_24px_rgba(63,107,74,0.25)]'
                : 'border-sand/10 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-sand/40">
        Usa ← → del teclado · o desliza con los botones
      </p>
    </div>
  )
}
