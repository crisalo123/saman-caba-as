import { Link } from 'react-router-dom'
import { galleryImages } from '@/infrastructure/data/cabins'
import { ParallaxMedia } from '@/presentation/components/ParallaxMedia'

export function GalleryTeaser() {
  const preview = galleryImages.slice(0, 4)

  return (
    <section id="galeria" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-leaf">Galería</p>
            <h2 className="font-display mt-3 text-4xl font-bold text-sand md:text-5xl">
              Bajo las palmas
            </h2>
            <p className="mt-3 max-w-md text-sand/65">
              Entra a la galería completa con un efecto de paso entre imágenes
              pensado para enganchar.
            </p>
          </div>
          <Link
            to="/galeria"
            className="inline-flex w-fit items-center rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white shadow-[0_8px_28px_rgba(63,107,74,0.25)] transition hover:brightness-110"
          >
            Abrir galería →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {preview.map((src, i) => (
            <Link
              key={src}
              to="/galeria"
              className={`relative overflow-hidden rounded-2xl border border-sand/10 shadow-sm ${
                i === 0 ? 'aspect-square md:col-span-2 md:row-span-2 md:aspect-auto md:h-full' : 'aspect-[4/3]'
              }`}
            >
              <ParallaxMedia
                src={src}
                alt="Vista previa galería"
                className="absolute inset-0 h-full w-full"
                scaleFrom={1.05}
                scaleTo={i === 0 ? 1.2 : 1.15}
                yFrom={8}
                yTo={-12}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
