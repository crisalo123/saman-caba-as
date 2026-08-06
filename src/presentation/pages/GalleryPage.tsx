import { Link } from 'react-router-dom'
import { ChatBox } from '@/presentation/components/ChatBox'
import { PalmDecor } from '@/presentation/components/PalmDecor'
import { PalmGalleryViewer } from '@/presentation/components/PalmGalleryViewer'

export function GalleryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-sand">
      <PalmDecor />

      <header className="relative z-20 border-b border-sand/10 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="font-display text-xl font-bold tracking-tight md:text-2xl">
            El <span className="text-leaf">Samán</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/#cabanas" className="text-sand/70 transition hover:text-leaf">
              Cabañas
            </Link>
            <Link
              to="/"
              className="rounded-full border border-sand/15 px-4 py-2 font-semibold transition hover:border-leaf hover:text-leaf"
            >
              ← Inicio
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-leaf">
          Galería · Palmas &amp; descanso
        </p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
          Donde el verde<br />
          <span className="text-leaf">abraza</span> el descanso
        </h1>
        <p className="mt-4 max-w-xl text-sand/65">
          Un paseo visual por Cabañas el Samán. Cada foto entra con un corte
          tipo hoja — distinto a una galería plana.
        </p>

        <div className="mt-10 md:mt-14">
          <PalmGalleryViewer />
        </div>
      </main>

      <ChatBox />
    </div>
  )
}
