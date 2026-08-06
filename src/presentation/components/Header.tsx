import { Link } from 'react-router-dom'

const links = [
  { href: '/#cabanas', label: 'Cabañas' },
  { href: '/#experiencia', label: 'Experiencia' },
  { to: '/galeria', label: 'Galería' },
  { href: '/#reserva', label: 'Reserva' },
] as const

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-sand/10 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-sand md:text-2xl">
          El <span className="text-leaf">Samán</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-sand/70 md:flex">
          {links.map((link) =>
            'to' in link ? (
              <Link key={link.label} to={link.to} className="transition hover:text-leaf">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="transition hover:text-leaf">
                {link.label}
              </a>
            ),
          )}
        </nav>

        <a
          href="/#reserva"
          className="rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Reservar
        </a>
      </div>
    </header>
  )
}
