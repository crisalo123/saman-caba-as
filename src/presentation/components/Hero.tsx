import { useRef, useState } from 'react'
import { AssembleText } from '@/presentation/components/AssembleText'
import { MosaicImage } from '@/presentation/components/MosaicImage'
import { useScrollExpand } from '@/presentation/hooks/useScrollExpand'
import { gsap, prefersReducedMotion, useGSAP } from '@/presentation/lib/gsap'

type HeroProps = {
  onReserve: () => void
}

export function Hero({ onReserve }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const strokeRef = useRef<SVGPathElement>(null)
  const [mosaicDone, setMosaicDone] = useState(false)

  useScrollExpand({
    triggerRef: sectionRef,
    mediaRef,
    scaleFrom: 1.06,
    scaleTo: 1.2,
    yFrom: 0,
    yTo: -12,
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2,
  })

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      if (veilRef.current) {
        gsap.fromTo(
          veilRef.current,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, duration: 1.4, delay: 1.05, ease: 'power2.out' },
        )
      }

      if (strokeRef.current) {
        const len = strokeRef.current.getTotalLength()
        gsap.set(strokeRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        })
        gsap.to(strokeRef.current, {
          strokeDashoffset: 0,
          duration: 1.1,
          delay: 2.05,
          ease: 'power2.inOut',
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden"
    >
      <MosaicImage
        src="/images/galeria/1a.jpg"
        alt="Cabañas el Samán en la naturaleza"
        cols={8}
        rows={5}
        mediaRef={mediaRef}
        onComplete={() => setMosaicDone(true)}
      />

      <div className="hero-fade absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-20 pt-28 md:px-6 md:pb-28">
        <div className="relative max-w-3xl">
          {/* Neblina de tinta: se difumina, no es caja */}
          <div ref={veilRef} className="hero-ink-veil" aria-hidden />

          <AssembleText
            as="p"
            mode="words"
            delay={1.2}
            stagger={0.05}
            className="hero-type mb-4 font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#f7f4ec]"
            text="Descanso · Naturaleza · Reserva fácil"
          />

          <h1 className="hero-type font-display relative max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-tight text-[#f7f4ec] text-balance md:text-7xl">
            <AssembleText
              as="span"
              mode="chars"
              delay={1.4}
              stagger={0.032}
              className="inline"
              text="Cabañas el "
            />
            <span className="relative inline-block">
              <AssembleText
                as="span"
                mode="chars"
                delay={1.75}
                stagger={0.05}
                className="hero-saman-glow inline"
                text="Samán"
              />
              <svg
                className="pointer-events-none absolute -bottom-1 left-0 w-full overflow-visible md:-bottom-2"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden
              >
                <path
                  ref={strokeRef}
                  d="M4 8 C40 2, 80 14, 120 6 S180 2, 196 8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-sun"
                />
              </svg>
            </span>
          </h1>

          <AssembleText
            as="p"
            mode="words"
            delay={2.0}
            stagger={0.038}
            className="hero-type mt-6 max-w-xl text-base font-semibold tracking-[0.04em] text-[#f7f4ec] md:text-lg"
            text="Escápate del ruido. Cabañas con camas, salón y el ambiente perfecto para recargar en familia o en pareja."
          />
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition duration-700 ${
            mosaicDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={onReserve}
            className="rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white shadow-[0_8px_28px_rgba(63,107,74,0.35)] transition hover:brightness-110"
          >
            Reservar por WhatsApp
          </button>
          <a
            href="#cabanas"
            className="rounded-full border border-white/45 bg-white/15 px-6 py-3 text-sm font-semibold text-[#f7f4ec] backdrop-blur-md transition hover:border-white/70 hover:bg-white/25"
          >
            Ver cabañas
          </a>
        </div>

        <p className="mt-6 text-xs font-medium text-[#f0ebe0]/55">
          Pronto: video hero en esta sección
        </p>
      </div>
    </section>
  )
}
