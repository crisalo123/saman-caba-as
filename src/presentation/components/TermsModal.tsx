import { useEffect, useRef } from 'react'
import { termsSections } from '@/infrastructure/data/terms'
import { gsap, prefersReducedMotion, useGSAP } from '@/presentation/lib/gsap'

export type TermsModalProps = {
  open: boolean
  onClose: () => void
}

/** Panel con los términos (sin navegar a otra URL). */
export function TermsModal({ open, onClose }: TermsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!open || !overlayRef.current || !panelRef.current) return

      if (prefersReducedMotion()) {
        gsap.set(overlayRef.current, { autoAlpha: 1 })
        gsap.set(panelRef.current, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: 'power2.out' },
      )
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 56, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
      )
    },
    { dependencies: [open] },
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-stretch justify-center bg-sand/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        className="flex h-[100dvh] w-full max-w-lg flex-col overflow-hidden rounded-none border-0 bg-white shadow-[0_24px_80px_rgba(28,42,34,0.28)] sm:h-auto sm:max-h-[min(85dvh,720px)] sm:rounded-[1.5rem] sm:border sm:border-sand/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-sand/10 bg-mist/80 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-4 sm:px-5 sm:pt-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-leaf">
              Cabañas el Samán
            </p>
            <h2
              id="terms-title"
              className="font-display mt-1 text-xl font-bold text-sand sm:text-2xl"
            >
              Términos y condiciones
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full px-2.5 py-1.5 text-sand/50 transition hover:bg-white hover:text-sand"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* min-h-0 + flex-1: permite scroll real en móvil */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 text-sm text-sand/80 sm:px-5 [-webkit-overflow-scrolling:touch]">
          <div className="space-y-6 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4rem))] sm:pb-2">
            {termsSections.map((section, i) => (
              <div
                key={section.title ?? `s-${i}`}
                className={
                  section.emphasis
                    ? 'rounded-xl border border-leaf/25 bg-mist px-4 py-3'
                    : ''
                }
              >
                {section.title ? (
                  <h3 className="font-display mb-3 text-lg font-bold text-sand">
                    {section.title}
                  </h3>
                ) : null}
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-2.5 leading-relaxed ${
                        section.emphasis ? 'font-semibold text-sand' : ''
                      }`}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
