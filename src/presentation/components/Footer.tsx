import { TermsTrigger } from '@/presentation/components/TermsTrigger'

export function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-white/60 px-4 py-10 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold text-sand">
            Cabañas el <span className="text-leaf">Samán</span>
          </p>
          <p className="mt-1 text-sm text-sand/50">Descanso en la naturaleza</p>
        </div>
        <div className="flex flex-col gap-2 text-xs text-sand/45 md:items-end">
          <TermsTrigger />
          <p>
            Imágenes de referencia ·{' '}
            <a
              href="https://www.el-saman.com.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-leaf"
            >
              el-saman.com.co
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
